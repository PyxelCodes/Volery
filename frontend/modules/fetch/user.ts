import { User } from "../../types/user"
import { APIRequest } from "./APIRequest"


export let getUser = () => {
    return new Promise<User>((res, rej) => {
        let req = APIRequest('/users/me').then(x => {
            res(x)
        })
    })
}