import * as  DeviceRepository from "../repository/deviceRepository";
import {DeviceDto} from "../model/UiModel/DeviceDto";
import {SendMessage} from "../queue/publisher";

export const findAll = async () => {
    return await  DeviceRepository.findAll()
};

export const findById = async (id: string) => {
    return await  DeviceRepository.findById(id);
};

export const create = async (item: DeviceDto) => {
    var result = await  DeviceRepository.create(item);
    if(result !=null  && result.id !==null && result.id !==undefined)
    {
        SendMessage(`device-id ${result.id}`, process.env.RABBIT_MQ_DEVICE_QUEUE as string);
    }
    return result;
};