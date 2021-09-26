import { Schema, model } from 'mongoose';

export default model('messages', new Schema({
    author: Object,
    created_at: Date,
    edited_at: String,
    pinned: Boolean,
    channel_id: String,
    reply_to: String,
    mentions: Array,
    mention_roles: Array,
    id: String,
    content: String,
}))