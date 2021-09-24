import { Schema, model } from 'mongoose';

export default model('authUser', new Schema({
    id: String,
    displayName: String,
    username: String,
    createdAt: String,
    avatar: String,
    accessToken: String,
}))