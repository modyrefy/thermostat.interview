import * as dotenv from "dotenv";
import {InitConnection} from "./config/dataBase";
import {createDeviceManagerRandomTemperatureRequest} from "./service/deviceManagerService";
dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}

const INTERVAL_MS:number= parseInt(process.env.INTERVAL_MS as string);

InitConnection().then(() => {
    console.log('✔ db connection start');
    setInterval(() => createDeviceManagerRandomTemperatureRequest(), INTERVAL_MS);
}).catch((err: any) => {
    console.log('✘ db connection failed',err.message)
    process.exit(1);
})
