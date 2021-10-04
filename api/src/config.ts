import dotenv from 'dotenv';
import { join } from 'path';
dotenv.config({ path: join(__dirname, '../.env') })

export default {
    mongo: {
        uri: process.env.URI,
    },
    port: process.env.port,
    github: {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: process.env.callbackURL,

    },
    encryptionKey: process.env.encryptionKey
}