import {Document, Model, Schema} from "mongoose";
import * as mongoose from "mongoose";
   export const  getAll=async(model:string,schema:Schema)=> {
       const modelObject = mongoose.model(model, schema);
       try {
           return  await modelObject.find()
       } catch (errors) {
           throw errors;
       }
   };
export const  getById=async(model:string,schema:Schema,id:string)=> {
    const modelObject = mongoose.model(model, schema);
    try {
        return await modelObject.findById(id)
    } catch (errors) {
        throw errors;
    }
};

export const  create=async(model:string,schema:Schema,entity:object)=> {
    const modelObject = mongoose.model(model, schema);
    try {
        return await modelObject.create(entity)
    } catch (errors) {
        throw errors;
    }
};