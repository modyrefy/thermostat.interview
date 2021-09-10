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

export interface IBaseResopnse1<T>{
    response?:T,
    responseOn:Date
}

export class BaseResopnse1<T> implements IBaseResopnse1<T>{
    response?:T;
    responseOn:Date=new Date()
}