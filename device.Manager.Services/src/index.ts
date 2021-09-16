import * as dotenv from "dotenv";
import {InitConnection} from "./config/dataBase";
import server from "./config/server";
import {createDummyUser} from "./service/userServices";
import {UserDto} from "./model/uiModel/userDto";
import {createDummyDevice} from "./service/deviceService";
import {DeviceDto} from "./model/uiModel/DeviceDto";
dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

/**
 * Server Activation
 */
InitConnection().then(() => {
    console.log('✔ db connection start');
    createDummyUser(new UserDto('admin','admin',''));
    createDummyDevice(new DeviceDto("dummy device","dummy type",new Date(),new Date(), true,"613ae42839f8c76b2fe01d38"))
    server.listen(PORT).on('error', (err: any) => {
        console.log('✘ Application failed to start');
        console.error('✘', err.message);
        process.exit(0);
    }).on('listening', () => {
        console.log('✔ Application Started');
        console.log(`Listening on port  http://localhost:${PORT}`);
    });
}).catch((err: any) => {
    console.log('✘ db connection failed',err.message)
    process.exit(1);
})