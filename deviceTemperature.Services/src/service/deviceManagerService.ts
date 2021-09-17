import * as  DeviceManagerRepository from "../repository/deviceManagerRepository";
import {DeviceManagerDto} from "../model/uiModel/DeviceManagerDto";
import {SendMessage} from "./publisherService";
import {getDevice, isDeviceExist} from "./serviceManager";
import {QueueModel} from "../model/queueModel/queueModel";


export const findAll = async () => {
    return await  DeviceManagerRepository.findAll()
};

export const findById = async (id: string) => {
    return await  DeviceManagerRepository.findById(id);
};

export const create = async (item: DeviceManagerDto) => {
    return  await  DeviceManagerRepository.create(item);
};

export const createDeviceManagerRandomTemperatureRequest=async()=> {
    try {

        const deviceId = process.env.DEVICE_ID as string
        var deviceObject=await  getDevice();

        console.log(deviceObject);
        if (deviceObject !==null && deviceObject!==undefined ) {
            var request: DeviceManagerDto = new DeviceManagerDto(
                deviceId,
                Math.floor(Math.random() * (35. - 18 + 1)) + 18
            );
            var result= await DeviceManagerRepository.create(request);
            if (result != null && result.id !== null && result.id !== undefined) {
                var socketMessage={...result ,deviceName:deviceObject.deviceName}
               await SendMessage(new QueueModel
                (
                    socketMessage,
                    process.env.SOCKET_EVENT_NAME as string,
                    process.env.RABBIT_MQ_DEVICE_MANAGER_QUEUE as string
                ));;
                console.log(new Date());
                console.log('new request added');
            }
        }
        else
        {
            console.log('device not exist please check');
            //process.exit(1);
        }
    } catch (err: any) {
        console.log('interval error ' + err.message);

    }
};

