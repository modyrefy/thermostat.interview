import {DeviceModel} from "../model/dbModel/deviceModel";
import {DeviceDto} from "../model/uiModel/DeviceDto";
import {DeviceManagerModel} from "../model/dbModel/deviceManagerModel";
import {DeviceTemperatureDto} from "../model/uiModel/DeviceTemperatureDto";
import {TemperatureStatisticsDto} from "../model/uiModel/temperatureStatisticsDto";

export const filterByDate=async (fromDate?:Date,toDate?:Date  )=> {
    var response:TemperatureStatisticsDto []=[];
    var deviceIdList :string[]= [];
    fromDate?.setHours(0,0,0);
    toDate?.setHours(23,59,59);
    const filter={createdOn: {
            $gte: fromDate,
            $lt: toDate
        }};
    var result=await  DeviceManagerModel.aggregate(
        [
            { $match: filter },
            {$group:{
                    _id: '$deviceId',
                    count: { $sum: 1 }
                }},
            { $sort:{ count : -1}}
        ]
    );
    console.log(result);
    if(result !=null && result.length !=0)
    {
        result.map((d, k) => {
            deviceIdList.push(d._id.toString());
        })
        var devices=await DeviceModel.find({ _id: { $in: deviceIdList } })
        const maxItem:any = result.slice(0, 1)[0];
        var maxDeviceObject=devices.find(obj =>{
            return obj._id==maxItem._id
        });
        response.push(new TemperatureStatisticsDto(maxItem._id,maxDeviceObject?.deviceName,maxItem.count,'Device with max transactions'));
        if(result.length>1) {
            const minItem: any = result.pop();
            var minDeviceObject = devices.find(obj => {
                return obj._id == minItem._id
            });
            response.push(new TemperatureStatisticsDto(minItem._id, minDeviceObject?.deviceName, minItem.count, 'DDevice with min transactions'));
        }
    }
    return response;

};
export const populate = async (transctionsCount:number) => {
    //.populate('devices')
    var response: DeviceTemperatureDto[] = [];
    var deviceIdList :string[]= [];
    //{"deviceId":'613c93ac3f4ac0ef4de2a1fc'}
    var result=  await DeviceManagerModel.find().sort({createdOn:-1}).limit(transctionsCount);
    if(result!=null && result.length!=0)
    {
        result.map((d, k) => {
            deviceIdList.push(d.deviceId.toString());
        })
        var devices=await DeviceModel.find({ _id: { $in: deviceIdList } })
        for (var i of result) {
            var deviceObject=devices.find(obj =>{
                return obj._id==i.deviceId
            });
            response.push(new DeviceTemperatureDto(i.deviceId, i.temperature,deviceObject?.deviceName, i.createdOn, i.modifiedOn, i.isActive, i._id));
        }
        return response;
    }
};
export const findAll = async () => {
    var response: DeviceDto[] = [];
    var result = await DeviceModel.find({isActive:true}).sort({createdOn:-1});
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
}
;

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




