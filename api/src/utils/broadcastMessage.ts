import communities from "../schemas/communities";


export const broadcastMessage = async (msg: any) => {
    let incoming = Date.now();
    let clients: any[] = Array.from(process.wsInstance.getWss().clients)

    // find the community_id for the message

    let community = await (communities.findOne({ channels: msg.channel_id }).select('id -_id'));



    clients.forEach((client, i) => {
        if (client.readyState !== 1) return;
        if (!client.authed) return;
        if (!client.user.communities.includes(community.id)) return;

        msg.community_id = community.id;

        client.send(JSON.stringify({
            op: 0,
            d: msg,
            t: 'MESSAGE_CREATE',
        }))
    })
}