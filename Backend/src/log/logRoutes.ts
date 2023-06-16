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
    
*/