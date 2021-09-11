import {ValidationError} from "./validationError";

export interface IBaseDto{
    response?:any,
    Errors?:ValidationError[]
    responseOn:Date
}

export class BaseDto implements IBaseDto{
    response?:any;
    Errors?:ValidationError[];
    responseOn:Date=new Date()
}

