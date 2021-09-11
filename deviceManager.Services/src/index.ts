import {InitConnection} from "./config/dataBase";
import server from "./config/server";
import {createDeviceManagerRandomTemperatureRequest} from "./service/deviceManagerService";
if (!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);
const INTERVAL_MS:number= parseInt(process.env.INTERVAL_MS as string, 1000);
/**
 * Server Activation
 */
InitConnection().then(() => {
    console.log('✔ db connection start');
    server.listen(PORT).on('error', (err: any) => {
        console.log('✘ Application failed to start');
        console.error('✘', err.message);
        process.exit(0);
    }).on('listening', () => {
        console.log('✔ Application Started');
        console.log(`Listening on port  http://localhost:${PORT}`);
        setInterval(() => createDeviceManagerRandomTemperatureRequest(), INTERVAL_MS);
    });
}).catch((err: any) => {
    console.log('✘ db connection failed',err.message)
    process.exit(1);
})
