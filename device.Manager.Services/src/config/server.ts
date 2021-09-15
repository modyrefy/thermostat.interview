import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import {errorHandler} from "../middleware/error";
import {notFoundHandler} from "../middleware/not-found";
import {deviceRouter} from "../router/deviceRouter";
import {userRouter} from "../router/userRouter";

const server = express();
try {
    /**
     *  App Configuration
     */
    server.use(helmet());
    server.use(cors({
        origin: '*'
    }));
    server.use(express.json());
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(bodyParser.json());
// routers
    server.use("/api/device", deviceRouter);
    server.use("/api/user", userRouter);

// handle errors
    server.use(errorHandler);
    server.use(notFoundHandler);
}
catch (error:any)
{
    console.log('server-errpr ' +error.message);

}


export default server;