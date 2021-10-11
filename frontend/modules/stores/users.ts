import { createStore } from "redux";
import { APIRequest } from "../fetch/APIRequest";

const state = {};

let userStore = (state = {}, action) => {
    switch (action.type) {
        case 'set_users':
            state = action.d;
            return state;
        case 'set_user':
            state[action.id] = action.d
            return state;
        default:
            return state;
    }
}

let users = createStore(userStore, state)

export default users;

export const fetchUser = (id: string) => {
    return new Promise((res, rej) => {
        let store = users.getState();
        if (store[id]) return res(store[id]);

        APIRequest(`/users/${id}`).then(user => {
            users.dispatch({ type: "set_user", d: user })
            res(user);
        })
        .catch(err => rej(err))
    })
}