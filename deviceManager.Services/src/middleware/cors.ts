import { Request, Response, NextFunction } from "express";

export const corsHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (request.method === "OPTIONS") {
        request.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return response.status(200).json({});
    }
    next();
};
