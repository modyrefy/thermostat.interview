import {AutoMap} from "@nartc/automapper";

export class DeviceTemperatureDto {
    @AutoMap()
    deviceId: string;
    @AutoMap()
    deviceName?:string;
    @AutoMap()
    temperature: number;
    @AutoMap()
    createdOn?:Date;
    @AutoMap()
    modifiedOn?:Date;
    @AutoMap()
    isActive?:boolean;
    @AutoMap()
    id?:string;
    constructor(_deviceId:string,_temperature :number,_deviceName?:string,_createdOn?:Date,_modifiedOn?:Date,_isActive?:boolean,_id?:string) {
        this.deviceId = _deviceId;
        this.temperature=_temperature;
        this.createdOn=_createdOn;
        this.modifiedOn=_modifiedOn;
        this.isActive=_isActive;
        this.deviceName=_deviceName;
        this.id=_id;
    }
}
