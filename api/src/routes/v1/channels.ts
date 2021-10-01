import { Router } from 'express';
import Channels from '../../schemas/Channels';
import Messages from '../../schemas/Messages';
import User from '../../schemas/user';
import { broadcastMessage } from '../../utils/broadcastMessage';
import { SnowflakeUtil } from '../../utils/SnowflakeUtil';
const router = Router();

router.get('/:channel_id/messages', async (req, res) => {
    let { channel_id } = req.params;
    if (!req.user) return res.sendStatus(401);

    Messages.find({ channel_id }).sort({ _id: -1 }).limit(50).then(msgs => {
        res.json(msgs.reverse())
    })

})

router.post('/:id/messages', async (req, res) => {

    let { id } = req.params;
    let { content, nonce } = req.body;

    if (!content) return res.sendStatus(400);
    if (!nonce) return res.sendStatus(400);

    if (!req.user) return res.sendStatus(401);
    //@ts-ignore
    let user: any = await User.findOne({ id: req.user.id });

    if (!user) return res.sendStatus(401);

    let channel: any = await Channels.findOne({ id });

    if (!channel) return res.sendStatus(404)
    if(content.length > 500) return res.sendStatus(400);

    let msg: any = {
        author: {
            displayName: user.displayName,
            username: (req as any).user.username,
            avatar: user.avatar,
        },
        created_at: Date.now(),
        edited_at: null,
        pinned: false,
        channel_id: channel.id,
        reply_to: null,
        mentions: [],
        mention_roles: [],
        id: SnowflakeUtil.generate(),
        content
    };

    channel.messages.push(msg.id);

    await Messages.create(msg);

    await Channels.updateOne({ id }, { messages: channel.messages })

    msg.nonce = nonce;

    res.json(msg)

    broadcastMessage(msg)
})

export default router;