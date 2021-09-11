import {BaseModel} from "./baseModel";
import {Document, model, Model, Schema} from "mongoose";
import {AutoMap} from "@nartc/automapper";

export interface IDeviceModel extends BaseModel,Document {
    deviceName: string;
    deviceType: string;
}

export const DeviceModelSchema: Schema = new Schema({
    deviceName: { type: String, required: true },
    deviceType: { type: String, required: true },
    createdOn: { type: Date, required: true, default: Date.now },
    modifiedOn: { type: Date, required: true, default: Date.now },
    isActive: { type: Boolean, required: true, default: true },
});
export const DeviceModel: Model<IDeviceModel> = model('Device', DeviceModelSchema);