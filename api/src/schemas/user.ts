import { model, Schema } from 'mongoose';

export default model('user', new Schema({
    id: String,
    friends: Array,
    bio: String,
    status: String,
    displayName: String,
    badges: Array,
    created: Number,
    avatar: String,
    communities: Array,
    userSettings: {
        type: Object,
        default: {}
    }
}))