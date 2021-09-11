import {AutoMap} from "@nartc/automapper";

export class DeviceDto {
    @AutoMap()
    deviceName: string;
    @AutoMap()
    deviceType: string;
    @AutoMap()
    createdOn?:Date;
    @AutoMap()
    modifiedOn?:Date;
    @AutoMap()
    isActive?:boolean;
    @AutoMap()
    id?:string;

    constructor(_deviceName:string,_deviceType :string,_createdOn?:Date,_modifiedOn?:Date,_isActive?:boolean,_id?:string) {
        this.deviceName = _deviceName;
        this.deviceType=_deviceType;
        this.createdOn=_createdOn;
        this.modifiedOn=_modifiedOn;
        this.isActive=_isActive;
        this.id=_id;
    }
}
