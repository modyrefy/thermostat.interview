
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import {errorHandler} from "../middleware/error";
import {notFoundHandler} from "../middleware/not-found";

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


// handle errors
    server.use(errorHandler);
    server.use(notFoundHandler);
} catch (error: any) {
    console.log('server-errpr ' + error.message);

}


export default server;
/*end */