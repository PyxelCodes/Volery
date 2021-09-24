import { Router } from 'express';
import user from '../schemas/user';
import { VoleryUser } from '..'
import Communities from '../schemas/communities';
const router = Router();

//@ts-ignore
router.ws('/', async (ws, req) => {
    //if (!req.user) return ws.close()
    let { avatar, displayName, id, username } = req.user as VoleryUser;

    let dbuser: any = await user.findOne({ id });

    let friends = await user.find({ id: { $in: dbuser.friends.map((x: any) => x.id) } })

    let communities = await Communities.find({ id: { $in: dbuser.communities } })

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

    ws.send(JSON.stringify(helloSocket), err => console.log(err))


    ws.on('message', async data => {
        let msg = JSON.parse(data as string);
        let module = await import('./ops/' + msg.op)
        console.log(module)
    })


})

export default router;