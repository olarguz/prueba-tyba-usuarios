import * as mongoose from 'mongoose';

import User from './user';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    pass: { type: String, required: true },
    token: { type: String, required: true, default: 'NONE' },
    logged: { type: Boolean, require: true, default: false },
    active: { type: Boolean, required: true, default: true }
}, {
    timestamps: true
});

const userModel = mongoose.model<User & mongoose.Document>('user', userSchema);

export default userModel;
