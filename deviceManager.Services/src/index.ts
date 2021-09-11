import {InitConnection} from "./config/dataBase";
import server from "./config/server";
import {createDeviceManagerRandomTemperatureRequest,createDeviceManagerRandomTemperatureRequest1} from "./service/deviceManagerService";
if (!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

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

    });
}).catch((err: any) => {
    console.log('✘ db connection failed',err.message)
    process.exit(1);
})
setInterval(() => createDeviceManagerRandomTemperatureRequest1(), 1000);