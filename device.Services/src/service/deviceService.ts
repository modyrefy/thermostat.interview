import * as  DeviceRepository from "../repository/deviceRepository";
import {DeviceDto} from "../model/uiModel/DeviceDto";
import {SendMessage} from "./publisherService";
import {QueueModel} from "../model/queueModel/queueModel";

export const filterByDate=async (fromDate?:Date,toDate?:Date  )=>{
    return await DeviceRepository.filterByDate(fromDate,toDate);
};
export const populate = async (transctionsCount:number) => {
    return await  DeviceRepository.populate(transctionsCount)
}

export const findAll = async () => {
    return await  DeviceRepository.findAll()
};

export const findById = async (id: string) => {
    return await  DeviceRepository.findById(id);
};

export const createRow = async (item: DeviceDto) => {
    var result = await  DeviceRepository.createRow(item);
    if(result !=null  && result.id !==null && result.id !==undefined) {
        SendMessage(new QueueModel
        (
            result,
            process.env.RABBIT_MQ_TYPE as string,
            process.env.RABBIT_MQ_DEVICE_QUEUE as string
        ));
    }
    return result;
};

export const updateRow = async (item: DeviceDto) => {
    var result = await  DeviceRepository.updateRow(item);
    if(result !=null  && result.id !==null && result.id !==undefined)
    {
        SendMessage(new QueueModel
        (
            result,
            process.env.RABBIT_MQ_TYPE as string,
            process.env.RABBIT_MQ_DEVICE_QUEUE as string
        ));
    }
    return result;
};

export const deleteRow = async (item: DeviceDto) => {
    var result = await  DeviceRepository.deleteRow(item);
    if(result !=null  && result.id !==null && result.id !==undefined)
    {
        SendMessage(new QueueModel
        (
            result,
            process.env.RABBIT_MQ_TYPE as string,
            process.env.RABBIT_MQ_DEVICE_QUEUE as string
        ));
    }
    return result;
};


