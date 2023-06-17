import { Router } from "express";
import * as controller from "./logController";

const logRoutes : Router = Router();

logRoutes.post("/", controller.postLog);
logRoutes.get("/", controller.getLogs);
logRoutes.get("/:id", controller.getLogById);
logRoutes.delete("/:id", controller.deleteLog);
logRoutes.put("/:id", controller.updateLog);

export default logRoutes;

/*
    POST
{
    "description": string,
    "loglevelID": int,
    "date": timestamp (yyyy-mm-dd hh:mm:ss)
}
    GET
{
    "log_id": int,
    "description": string,
    "loglevel_id": int,
    "date": timestamp,
    "loglevel": string
}
*/