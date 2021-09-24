import { Schema, model } from 'mongoose';

export default model('communities', new Schema({
    id: String,
    name: String,
    icon: String,
    owner_id: String,
    roles: Array,
    max_members: Number,
    channels: Array
}))