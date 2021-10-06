import { createStore } from "redux";

const state = {};

let messageStore = (state = {}, action) => {
    switch (action.type) {
        case 'set_c_messages':
           state[action.cid] = action.messages;
           return state;
        case 'add_message':
            if (state[action.cid]) state[action.cid].push(action.msg)
            else state[action.cid] = [action.msg]
            return state;
        default:
            return state;
    }
}

let messages = createStore(messageStore, state)

export default messages;