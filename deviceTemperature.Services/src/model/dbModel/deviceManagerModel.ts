import {Document, model, Model, Schema} from "mongoose";
import {BaseModel} from "./baseModel";

export interface IDeviceManagerModel extends BaseModel,Document {
    deviceId: string;
    temperature: number;
}

export const DeviceManagerModelSchema: Schema = new Schema({
    deviceId: { type: String, required: true },
    temperature: { type: Number , required: true },
    createdOn: { type: Date, required: true, default: Date.now },
    modifiedOn: { type: Date, required: true, default: Date.now },
    isActive: { type: Boolean, required: true, default: true },
});
export const DeviceManagerModel: Model<IDeviceManagerModel> = model('DeviceManager', DeviceManagerModelSchema);