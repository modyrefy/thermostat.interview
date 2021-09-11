import {DeviceModel} from "../model/DbModel/deviceModel";
import {DeviceDto} from "../model/UiModel/DeviceDto";


export const findAll = async () => {
    var response: DeviceDto[] = [];
    var result = await DeviceModel.find();
    if (result != null && result.length != 0) {
        for (var i of result) {
           response.push(new DeviceDto(i.deviceName, i.deviceType, i.createdOn, i.modifiedOn, i.isActive, i._id));
        }
        return response;
    }
};

export const findById = async (id: string) => {
    var result =  await DeviceModel.findById(id);
    console.log('find-by-id',JSON.stringify(result))
    if (result != null) {
      return new DeviceDto(result.deviceName,
          result.deviceType,
          result.createdOn,
          result.modifiedOn,
          result.isActive,
          result._id);
    }
    return null;
};

export const create = async (item: DeviceDto) => {
    if (item != null) {
        var request = new DeviceModel();
        request.deviceType = item.deviceType;
        request.deviceName = item.deviceName
        var response = await DeviceModel.create(item);
        if (response != null) {
            item.id = response._id;
            return item;
        }
        return null;
    }

};
