import {ValidationError} from "./validationError";

export interface IBaseDto {
    response?: any,
    Errors?: ValidationError[],
    token?: string,
    responseOn: Date
}

export class BaseDto implements IBaseDto{
    response?:any;
    Errors?:ValidationError[];
    token?:string;
    responseOn:Date=new Date()
}

