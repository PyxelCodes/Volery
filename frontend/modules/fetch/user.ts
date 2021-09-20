import { APIRequest } from "./APIRequest"


export let getUser = () => {
    return new Promise<any>((res, rej) => {
        let req = APIRequest('/users/me')
    })
}