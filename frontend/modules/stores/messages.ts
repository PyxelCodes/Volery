import { createStore } from "redux";

const state = {};

let messageStore = (state = {}, action) => {
    console.log(action)
    switch (action.type) {
        case 'set_c_messages':
           state[action.cid] = action.messages;
           return state;
        case 'add_message':
            if (state[action.cid]) state[action.cid].push(action.msg)
            else state[action.cid] = [action.msg]
            return state;
        case 'set_message':
            let index1 = state[action.msg.channel_id].findIndex(x => x.nonce == action.msg.nonce);
            state[action.msg.channel_id][index1] = action.msg
            return state;
        default:
            return state;
    }
}

let messages = createStore(messageStore, state)

export default messages;