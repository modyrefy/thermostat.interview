import {Document} from "mongoose";

export interface BaseModel extends Document {
    createdOn: Date;
    modifiedOn: Date;
    isActive: boolean;
}