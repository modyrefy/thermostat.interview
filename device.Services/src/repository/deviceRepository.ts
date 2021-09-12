import {DeviceModel} from "../model/dbModel/deviceModel";
import {DeviceDto} from "../model/uiModel/DeviceDto";


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

export const createRow = async (item: DeviceDto) => {
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

export const updateRow = async (item: DeviceDto) => {
    if (item != null) {
        var request=await DeviceModel.findById(item.id);
        if(request!=null)
        {
            request.deviceType = item.deviceType;
            request.deviceName = item.deviceName
            var response = await DeviceModel.findByIdAndUpdate(item.id,item);
            if (response != null) {
                item.id = response._id;
                return item;
            }
            return null;
        }
    }
};

export const deleteRow = async (item: DeviceDto) => {
    if (item != null) {
        var request=await DeviceModel.findById(item.id);
        if(request!=null)
        {
            request.isActive =false;
            var response = await DeviceModel.findByIdAndUpdate(item.id,request);
            if (response != null) {
                item.id = response._id;
                return item;
            }
            return null;
        }
    }
};
