import { Schema, model, Document } from "mongoose";

const BlackListSchema = new Schema(
    {
        _id: { type: String, required: true },
        reason: { type: String, required: true }
    },
    { versionKey: false, timestamps: true }
);

export const G_BlackList = model<IBlackList>("global_blacklist", BlackListSchema);

export interface IBlackList extends Document {
    reason: string;
}
