import { createStore } from "redux";

let channelStore = (state = [], action) => {
    switch (action.type) {
        case 'set_channels':
            state[action.payload.id] = action.payload.channels;
            break;
        case 'add_channel':
            state[action.payload.id].push(action.payload.channel)
            break;
        default:
            return state;
            break;
    }
}

let channels = createStore(channelStore)

export default channels;