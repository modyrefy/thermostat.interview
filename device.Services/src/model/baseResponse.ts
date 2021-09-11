import exp from "constants";
import {ValidationError} from "./validationError";

export interface IBaseResopnse{
    response?:any,
    Errors?:ValidationError[]
    responseOn:Date
}

export class BaseResopnse implements IBaseResopnse{
    response?:any;
    Errors?:ValidationError[];
    responseOn:Date=new Date()
}

