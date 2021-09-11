import * as  DeviceManagerRepository from "../repository/deviceManagerRepository";
import {DeviceManagerDto} from "../model/UiModel/DeviceManagerDto";
import {SendMessage} from "./publisherService";

export const findAll = async () => {
    return await  DeviceManagerRepository.findAll()
};

export const findById = async (id: string) => {
    return await  DeviceManagerRepository.findById(id);
};

export const create = async (item: DeviceManagerDto) => {
    var result = await  DeviceManagerRepository.create(item);
    if(result !=null  && result.id !==null && result.id !==undefined)
    {
        SendMessage(`device-id ${result.id}`, process.env.RABBIT_MQ_DEVICE_QUEUE as string);
    }
    return result;
};

export const createDeviceManagerRandomTemperatureRequest=async()=>{
try {
    var request: DeviceManagerDto = new DeviceManagerDto(
        process.env.DEVICE_ID as string,
        Math.floor(Math.random() * (35. - 18 + 1)) + 18
    );
    var result = await DeviceManagerRepository.create(request);
    if (result != null && result.id !== null && result.id !== undefined) {
        await SendMessage(`device-id ${result.id}`, process.env.RABBIT_MQ_DEVICE_MANAGER_QUEUE as string);
        console.log('new request added');
    }
}
catch (err:any)
{
    console.log('interval error ' +err.message);
}
};

export const createDeviceManagerRandomTemperatureRequest1=()=>{
    try {
        var request: DeviceManagerDto = new DeviceManagerDto(
            process.env.DEVICE_ID as string,
            Math.floor(Math.random() * (35. - 18 + 1)) + 18
        );
         DeviceManagerRepository.create(request).then(result=>{
             if (result != null && result.id !== null && result.id !== undefined) {
                  SendMessage(`device-id ${result.id}`, process.env.RABBIT_MQ_DEVICE_MANAGER_QUEUE as string);
                 console.log('new request added');
             }
         }).catch((err:any)=> {
             console.log('interval err' +err.message);
        });
    }
    catch (err:any)
    {
        console.log('interval error ' +err.message);
    }
};

/*
export const createDeviceManagerRandomTemperatureRequest1 = async () => {
    await new Promise(resolve => setInterval(() => resolve(test()), 1000));
};
*/