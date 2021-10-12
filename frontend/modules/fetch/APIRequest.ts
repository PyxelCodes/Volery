import axios from "axios";
import { User } from "../../types/user";

interface APIRequestOptions {
    noVersion?: boolean
    body?: any
    method?: string
    headers?: any
    query?: any
}

export const APIRequest = (endpoint, options?: APIRequestOptions) => {
    return new Promise<any>((res, rej) => {
        let host = window.config.host;
        let secure = window.config.secure;
        let protocol = secure ? 'https' : 'http'
        let apiversion = '1'
        let vString = options?.noVersion ? '' : `/v${apiversion}`

        let fetchOptions: any = {
            ...options,
            headers: { 'Content-Type': 'application/json', ...options?.headers },
            mode: 'cors'
        };

        axios({
            method: fetchOptions.method || 'GET',
            url: `${protocol}://${host}${vString}${endpoint}`,
            data: fetchOptions.body,
            withCredentials: true,
            ...fetchOptions,
            params: { before: options?.query?.before }
        })
            .then(({ data }) => {
                res(data)
            })
            .catch(err => {
                rej(err)
            })

        // fetch(`${protocol}://${host}${vString}${endpoint}`, fetchOptions)
        //     .then(data => {
        //         let remaining = data.headers.get('X-RateLimit-Remaining');
        //         window.apireq.remaining = parseInt(remaining);
        //         res(data.json());
        //     })
        //     .catch(err => {
        //         throw err;
        //     })
    })
}