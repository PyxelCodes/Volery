import { User } from "../../types/user";


export const APIRequest = (endpoint, options?: { noVersion: boolean }) => {
    return new Promise<User>(res => {
        let host = window.config.host;
        let secure = window.config.secure;
        let protocol = secure ? 'https' : 'http'
        let apiversion = '1'
        let vString = options?.noVersion ? '' : `/v${apiversion}`

        fetch(`${protocol}://${host}${vString}${endpoint}`)
            .then(data => {
                let remaining = data.headers.get('X-RateLimit-Remaining');
                window.apireq.remaining = parseInt(remaining);
                res(data.json());
            })
            .catch(err => {
                throw err;
            })
    })
}