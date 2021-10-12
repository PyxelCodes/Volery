import { APIRequest } from "../modules/fetch/APIRequest"
import messages from "../modules/stores/messages"
import logger from "./logger";


export const fetchMessagesFor = async (id: string, options?: { before: string }): Promise<any[]> => {

    return new Promise(res => {
        let state = messages.getState();
        if (state?.[id]) {
            if (options?.before) {
                let i = state?.[id].findIndex(x => x.id == options.before)
                if (i > -1 && i != 0) {
                    logger('MessageManager', 'fetched messages for', id, 'from MessageStore', `before: ${options.before}`)
                    console.log(state[id].slice(0, i))
                    return res(state[id].slice(0, i)); // if messages are stored
                }
            } else {
                logger('MessageManager', 'fetched messages for', id, 'from MessageStore')
                return res(state[id]); // if messages are stored
            }
        }

        APIRequest(`/channels/${id}/messages`, { query: { before: options?.before } })
            .then(msgs => {
                messages.dispatch({ type: 'set_c_messages', messages: msgs, cid: id })
                logger('MessageManager', 'fetched messages for', id)
                res(msgs)
            })
    })

}