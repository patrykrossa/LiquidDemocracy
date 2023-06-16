import { Router } from "express";
import * as controller from "./actionTypeController";

const actionTypeRoutes : Router = Router();

actionTypeRoutes.post("/", controller.postActionType);
actionTypeRoutes.get("/", controller.getActionTypes);
actionTypeRoutes.get("/:id", controller.getActionTypeById);
actionTypeRoutes.delete("/:id", controller.deleteActionType);
actionTypeRoutes.put("/:id", controller.updateActionType);

export default actionTypeRoutes;

/*
    POST
{
    "actionType": string
}
    GET
{
    "actiontype_id": int,
    "actiontype": string
}

*/