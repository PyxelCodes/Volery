import { APIRequest } from "../modules/fetch/APIRequest"
import messages from "../modules/stores/messages"
import logger from "./logger";


export const fetchMessagesFor = async (id: string): Promise<any[]> => {

    return new Promise(res => {
        let state = messages.getState();
        if (state?.[id]) {
            logger('MessageManager', 'fetched messages for', id, 'from MessageStore')
            return res(state[id]); // if messages are stored
         } 

        APIRequest(`/channels/${id}/messages`)
            .then(msgs => {
                messages.dispatch({ type: 'set_c_messages', messages: msgs, cid: id })
                logger('MessageManager', 'fetched messages for', id)
                res(msgs)
            })
    })

}