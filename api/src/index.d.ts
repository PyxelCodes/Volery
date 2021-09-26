import { Instance } from 'express-ws'

declare namespace Express {
    export interface Request {
        user: VoleryUser;
    }
}

declare global {
    namespace NodeJS {
        interface Process {
            wsInstance: Instance
        }
    }
}
export interface VoleryUser {
    id: string,
    displayName: string,
    username: string,
    avatar: string,
    accessToken: string,
}