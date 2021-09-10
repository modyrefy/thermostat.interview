import {DeviceModel, IDeviceModel} from "../model/deviceModel";

export  const findAll=async ()=>{
    return await  DeviceModel.find();
};

export  const findById=async (id: string)=>{
    return await  DeviceModel.findById(id);
};

export  const create=async (item: IDeviceModel)=>{
    return await  DeviceModel.create(item);
};
