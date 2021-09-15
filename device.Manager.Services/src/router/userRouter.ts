import express, {Request, Response} from "express";
import {IUserModel} from "../model/dbModel/userModel";
import * as UserServices from "../service/userServices";
import {BaseDto} from "../model/uiModel/baseDto";
import {ValidationError} from "../model/uiModel/validationError";
export const userRouter = express.Router();


userRouter.post("/authenticate", async (req: Request, res: Response) => {
    var  result  = new BaseDto();
    try {
        const item:IUserModel = req.body;
        result.response = await UserServices.authenticateUser(item);
        if(result.response ===null || result.response ===undefined)
        {
            var errorList : ValidationError[]=[];
            errorList.push(new ValidationError('user Name or Password not Valid'));
            result.Errors=errorList;
            res.status(401).send(result);
        }
        res.status(200).send(result);
    } catch (e: any) {
        var errorList : ValidationError[]=[];
        errorList.push(new ValidationError(e.message));
        result.Errors=errorList;
        res.status(500).send(result);
    }
});

userRouter.post("/register", async (req: Request, res: Response) => {
    var  result  = new BaseDto();
    try {
        const item:IUserModel = req.body;
        result.response = await UserServices.createRow(item);
        res.status(200).send(result);
    } catch (e: any) {
        var errorList : ValidationError[]=[];
        errorList.push(new ValidationError(e.message));
        result.Errors=errorList;
        res.status(500).send(result);
    }
});

