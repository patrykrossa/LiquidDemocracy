import { Router } from "express";
import * as controller from "./personController";

const personRoutes: Router = Router();

personRoutes.post("/", controller.postPerson);
personRoutes.get("/", controller.getPeople);
personRoutes.get("/:id", controller.getPersonById);
personRoutes.delete("/:id", controller.deletePerson);
personRoutes.put("/:id", controller.updatePerson);

export default personRoutes;