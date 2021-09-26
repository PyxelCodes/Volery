import { APIRequest } from "../modules/fetch/APIRequest"


export const fetchMessagesFor = async (id) => {
    return new Promise(res => {
        APIRequest(`/channels/${id}/messages`)
            .then(msgs => {
                res(msgs)
            })
    })

}