import {Document, model, Model, Schema} from "mongoose";
import {BaseModel} from "./baseModel";

export interface IUserModel extends BaseModel,Document {
    userName: string;
    password: string;
}

export const UserModelSchema: Schema = new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    createdOn: { type: Date, required: true, default: Date.now },
    isActive: { type: Boolean, required: true, default: true },
});
export const UserModel: Model<IUserModel> = model('User', UserModelSchema);