import { Router } from 'express';
import user from '../schemas/user';
import { VoleryUser } from '..'
import Communities from '../schemas/communities';
import Channels from '../schemas/Channels';
const router = Router();

//@ts-ignore
router.ws('/', async (ws: any, req) => {
    if (!req.user) return ws.close()

    let { avatar, displayName, id, username } = req.user as VoleryUser;

    let dbuser: any = await user.findOne({ id });


    ws.user = dbuser;

    let friends = await user.find({ id: { $in: dbuser.friends.map((x: any) => x.id) } })

    let communities: any[] = await Communities.find({ id: { $in: dbuser.communities } })

    for (let x in communities) {
        let channels: any[] = await Channels.find({ id: { $in: communities[x].channels } })
        communities[x].channels = channels;
    }

    let helloSocket = {
        op: 10, // HELLO
        t: Date.now(),
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


    ws.on('message', async (data: string) => {
        let msg = JSON.parse(data as string);
        let module = await import('./ops/' + msg.op)
        module.default(ws);
    })


})

export default router;