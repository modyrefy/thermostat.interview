import {AutoMap} from "@nartc/automapper";

export class TemperatureStatisticsDto {
    @AutoMap()
    id: string;
    @AutoMap()
    deviceName?:string;
    @AutoMap()
    transactionCount?: number;
    @AutoMap()
    description?:string;
    constructor(_id:string,_deviceName?:string,transactionCount?:number,_description?:string) {
        this.id = _id;
        this.deviceName=_deviceName;
        this.transactionCount=transactionCount;
        this.description=_description;
    }
}
