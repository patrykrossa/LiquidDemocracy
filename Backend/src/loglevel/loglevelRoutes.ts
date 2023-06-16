import { Router } from "express";
import * as controller from "./loglevelController";

const loglevelRoutes : Router = Router();

loglevelRoutes.post("/", controller.postLoglevel);
loglevelRoutes.get("/", controller.getLoglevels);
loglevelRoutes.get("/:id", controller.getLoglevelById);
loglevelRoutes.delete("/:id", controller.deleteLoglevel);
loglevelRoutes.put("/:id", controller.updateLoglevel);

export default loglevelRoutes;

/*
    POST
{
    "loglevel": string
}
    GET
{
    "loglevel_id": int,
    "loglevel": string
}
*/