import { Schema, model } from 'mongoose';

export default model('channels', new Schema({
    id: String,
    name: String,
    messages: Array,
}))