import { Router } from "express";
import * as controller from "./personController";

const personRoutes: Router = Router();

personRoutes.post("/", controller.postPerson);
personRoutes.get("/", controller.getPeople);
personRoutes.get("/:id", controller.getPersonById);
personRoutes.delete("/:id", controller.deletePerson);
personRoutes.put("/:id", controller.updatePerson);

export default personRoutes;

/*
POST
{
    "walletAddress": string, 
    "name": string,
    "surname": string,
    "birthday": date,
    "livingAddress": string,
    "pesel": string
}

GET
{
    "person_id": int,
    "walletAddress": string, 
    "name": string,
    "surname": string,
    "birthday": date,
    "livingAddress": string,
    "pesel": string
}
*/