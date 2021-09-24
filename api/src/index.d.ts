declare namespace Express {
    export interface Request {
        user: VoleryUser;
    }
}

export interface VoleryUser {
    id: string,
    displayName: string,
    username: string,
    avatar: string,
    accessToken: string,
}