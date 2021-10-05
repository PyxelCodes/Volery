import Channels from "../../../schemas/Channels";
import communities from "../../../schemas/communities";
import user from "../../../schemas/user";
import { SnowflakeUtil } from "../../../utils/SnowflakeUtil";

export default {
    methods: ['POST'],
    ratelimits: { post: '5' },
    async post (req: any, res: any) {
        let { name } = req.body;

        let id = SnowflakeUtil.generate();

        let mainChannelID = SnowflakeUtil.generate();
        let textChannelsCategoryId = SnowflakeUtil.generate();

        let c: any = {
            name,
            id,
            owner_id: req.user.id,
            icon: null,
            roles: [
                {
                    id,
                    name: 'everyone',
                    color: null,
                    hoist: false,
                    mentionable: false,
                    permissions: 0,
                }
            ],
            channels: [textChannelsCategoryId, mainChannelID],
            members: [
                {
                    nick: null,
                    roles: [],
                    joined_at: Date.now(),
                    id: req.user.id,
                }
            ]
        }

        let mainChannel: any = {
            id: mainChannelID,
            type: 2,
            name: 'main',
            parent_id: textChannelsCategoryId,
            position: 0,
            nsfw: false,
            messages: [],
        }

        let textChannelsCategory: any = {
            type: 4,
            name: 'Text Channels',
            parent_id: null,
            position: 0,
            id: textChannelsCategoryId
        }

        let mc = await Channels.create(mainChannel);
        let tcc = await Channels.create(textChannelsCategory);
        let community = await communities.create(c);

        await user.updateOne({ id: req.user.id }, { $push: { communities: id } })

        process.wsInstance.getWss().clients.forEach((client: any) => {
            if (client.readyState !== 1) return;
            if (!client.authed) return;
            if(client.user.id !== req.user.id) return;

            //@ts-ignore
            community.channels = [mc, tcc]
            client.send(JSON.stringify({
                op: 0,
                t: 'COMMUNITY_CREATE',
                d: community
            }))
        })

        return res.json(community);
    }
} 