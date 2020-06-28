import * as mongoose from 'mongoose';

import Log from "./register";

const logSchema = new mongoose.Schema({
    username: { type: String, required: true },
    log: { type: String, required: true }
}, {
    timestamps: true
});

const logModel = mongoose.model<Log & mongoose.Document>('log', logSchema);

export default logModel;
