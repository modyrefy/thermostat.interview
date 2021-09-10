/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
const mongoose = require('mongoose');
import cors from "cors";
import helmet from "helmet";
import {errorHandler} from "./middleware/error";
import {notFoundHandler} from "./middleware/not-found";
import { deviceRouter } from "./router/deviceRouter";

dotenv.config();
/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useMongoClient: true
    }
).then(()=>{
    console.log("mongo-connected")
}).catch((err:any)=>{
    console.log(err);
});
mongoose.Promise = global.Promise;

// routers
app.use("/api/device", deviceRouter);


app.use(errorHandler);
app.use(notFoundHandler);
/*
conn
*/
/**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(`Listening on port  http://localhost:${PORT}`);
});
