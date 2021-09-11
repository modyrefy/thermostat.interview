import {DeviceManagerModel} from "../model/DbModel/deviceManagerModel";
import {DeviceManagerDto} from "../model/UiModel/DeviceManagerDto";


export const findAll = async () => {
    var response: DeviceManagerDto[] = [];
    var result = await DeviceManagerModel.find();
    if (result != null && result.length != 0) {
        for (var i of result) {
            response.push(new DeviceManagerDto(i.deviceId, i.temperature, i.createdOn, i.modifiedOn, i.isActive, i._id));
        }
        return response;
    }
};

export const findById = async (id: string) => {
    var result =  await DeviceManagerModel.findById(id);
    if (result != null) {
        return new DeviceManagerDto(result.deviceId,
            result.temperature,
            result.createdOn,
            result.modifiedOn,
            result.isActive,
            result._id);
    }
    return null;
};

export const create = async (item: DeviceManagerDto) => {
    if (item != null) {
        var request = new DeviceManagerModel();
        request.deviceId = item.deviceId;
        request.temperature = item.temperature
        var response = await DeviceManagerModel.create(item);
        if (response != null) {
            item.id = response._id;
            return item;
        }
        return null;
    }

};
