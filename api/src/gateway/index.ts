import { Router } from 'express';
import user from '../schemas/user';
import { VoleryUser } from '..'
import Communities from '../schemas/communities';
import Channels from '../schemas/Channels';
import authUser from '../schemas/authUser';
import { authenticate } from './authenticate';
const router = Router();

//@ts-ignore
router.ws('/', async (ws: any, req) => {

    ws.authed = false;

    ws.send(JSON.stringify(
        {
            op: 0,
            t: 'HELLO',
            d: {
                heartbeat_interval: 41500,
            }
        }
    ))

    setTimeout(() => {
        if (!ws.authed) {
            ws.send(JSON.stringify({
                op: 9,
                t: 'IDENTIFY_TIMEOUT'
            }))
            return ws.close();
        }
    }, 20000) // you get 20sec to IDENTIFY

    ws.on('message', (e: any) => authenticate(e, ws))



    ws.on('message', async (data: string) => {
        if (!ws.authed) return;
        let msg = JSON.parse(data as string);
        let module = await import('./ops/' + msg.op)
        module.default(ws);
    })


})

export default router;