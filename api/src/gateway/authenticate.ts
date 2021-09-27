import authUser from "../schemas/authUser";
import Channels from "../schemas/Channels";
import Communities from "../schemas/communities";
import user from "../schemas/user";


export const authenticate = async (e: any, ws: any) => {
    let msg;
    try {
        msg = JSON.parse(e)
    } catch (error) {
        ws.send(JSON.stringify(
            {
                op: 9,
                t: 'INVALID_JSON'
            }
        ))
        return ws.close();
    }

    if (msg.op == 2) {
        let token = msg.d?.token;

        if (!token) {
            ws.send(JSON.stringify({
                op: 9,
                t: 'NO_TOKEN'
            }))
            return ws.close();
        }

        let userf = await (authUser.findOne({ accessToken: token }).select('id -_id'));

        if (!userf) {
            ws.send(JSON.stringify({
                op: 9,
                t: 'INVALID_TOKEN'
            }))
            return ws.close();
        }

        ws.user = await user.findOne({ id: userf.id });
        ws.authed = true;

        let { avatar, displayName, id, username } = ws.user;

        let friends = await user.find({ id: { $in: ws.user.friends.map((x: any) => x.id) } })

        let communities: any[] = await Communities.find({ id: { $in: ws.user.communities } })

        for (let x in communities) {
            let channels: any[] = await Channels.find({ id: { $in: communities[x].channels } })
            communities[x].channels = channels;
        }

        let helloSocket = {
            op: 10, // READY
            t: 'READY',
            d: {
                authedAs: id,
                heartbeat_interval: 41500,
                user: {
                    avatar,
                    displayName,
                    id,
                    username
                },
                communities: communities,
                friends,
            }
        }

        ws.send(JSON.stringify(helloSocket), (err: Error) => console.log(err))
    }
    ws.off('message', authenticate);
}