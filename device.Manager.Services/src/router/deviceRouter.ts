import express, {Request, Response} from "express";
import {IDeviceModel} from "../model/dbModel/deviceModel";
import * as DeviceService from "../service/deviceService";
import {BaseDto} from "../model/uiModel/baseDto";
import {ValidationError} from "../model/uiModel/validationError";

export const deviceRouter = express.Router();
//get

deviceRouter.get("/filter/date",async (req: Request, res: Response) => {

    var fromDate :Date =new Date(req.query.fromDate as string);
  var toDate :Date =new Date (req.query.toDate as string);
    var  result  = new BaseDto();
    try {
        result.response=await DeviceService.filterByDate(fromDate as Date,toDate as Date);
        res.status(200).send(result);
    } catch (e: any) {
        var errorList : ValidationError[]=[];
        errorList.push(new ValidationError(e.message));
        result.Errors=errorList;
        res.status(500).send(result);
    }
});
deviceRouter.get("/transaction/:count", async (req: Request, res: Response) => {
    var  result  = new BaseDto();
    try {
        const transctionsCount: number =parseInt( req.params.count) ;
        result.response=await DeviceService.populate(transctionsCount);
        res.status(200).send(result);
    } catch (e: any) {
        var errorList : ValidationError[]=[];
        errorList.push(new ValidationError(e.message));
        result.Errors=errorList;
        res.status(500).send(result);
    }
});

deviceRouter.get("/", async (req: Request, res: Response) => {
     var  result  = new BaseDto();
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
    var  result  = new BaseDto();
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

deviceRouter.post("/insert", async (req: Request, res: Response) => {
    var  result  = new BaseDto();
    try {
        const item:IDeviceModel = req.body;
        result.response = await DeviceService.createRow(item);
        res.status(200).send(result);

    } catch (e: any) {
        var errorList : ValidationError[]=[];
        errorList.push(new ValidationError(e.message));
        result.Errors=errorList;
        res.status(500).send(result);
    }
});

deviceRouter.post("/update", async (req: Request, res: Response) => {
    var  result  = new BaseDto();
    try {
        const item:IDeviceModel = req.body;
        result.response = await DeviceService.updateRow(item);
        res.status(200).send(result);

    } catch (e: any) {
        var errorList : ValidationError[]=[];
        errorList.push(new ValidationError(e.message));
        result.Errors=errorList;
        res.status(500).send(result);
    }
});


deviceRouter.post("/delete", async (req: Request, res: Response) => {
    var  result  = new BaseDto();
    try {
        const item:IDeviceModel = req.body;
        result.response = await DeviceService.deleteRow(item);
        res.status(200).send(result);

    } catch (e: any) {
        var errorList : ValidationError[]=[];
        errorList.push(new ValidationError(e.message));
        result.Errors=errorList;
        res.status(500).send(result);
    }
});