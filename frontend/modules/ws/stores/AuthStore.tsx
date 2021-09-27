import { createStore } from 'redux';

let auth = (state = [], action) => {
    switch (action.type) {
        case 'SET':
            return state = action.payload;
    
        default:
            return state;
    }
}

const store = createStore(auth, null);

export default store;