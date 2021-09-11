import express, {Request, Response} from "express";
import {IDeviceModel} from "../model/deviceModel";
import * as DeviceService from "../service/deviceService";
import {BaseResopnse} from "../model/baseResponse";
import {ValidationError} from "../model/validationError";
import {create} from "../service/deviceService";

export const deviceRouter = express.Router();
//get
deviceRouter.get("/", async (req: Request, res: Response) => {
     var  result  = new BaseResopnse();
    try {
        result.response=await DeviceService.findAll();
        res.status(200).send(result);
    } catch (e: any) {
        var errorList : ValidationError[]=[];
        errorList.push(new ValidationError(e.message));
        result.Errors=errorList;
        res.status(500).send(result);
    }
});

deviceRouter.get("/:id", async (req: Request, res: Response) => {
    var  result  = new BaseResopnse();
    try {
        const id: string = req.params.id;
        result.response = await DeviceService.findById(id);
        res.status(200).send(result);

    } catch (e: any) {
        var errorList : ValidationError[]=[];
        errorList.push(new ValidationError(e.message));
        result.Errors=errorList;
        res.status(500).send(result);
    }
});

deviceRouter.post("/", async (req: Request, res: Response) => {
    var  result  = new BaseResopnse();
    try {
        const item:IDeviceModel = req.body;
        result.response = await DeviceService.create(item);
        res.status(200).send(result);

    } catch (e: any) {
        var errorList : ValidationError[]=[];
        errorList.push(new ValidationError(e.message));
        result.Errors=errorList;
        res.status(500).send(result);
    }
});