import { Router } from "express";
import * as controller from "./transactionController";

const transactionRoutes : Router = Router();

transactionRoutes.post("/", controller.postTransaction);
transactionRoutes.get("/", controller.getTransactions);
transactionRoutes.get("/:id", controller.getTransactionById);
transactionRoutes.delete("/:id", controller.deleteTransaction);
transactionRoutes.put("/:id", controller.updateTransaction);

export default transactionRoutes;

/*
    POST
{
    "hash": string,
    "details": string,
    "actionTypeID": int
}
    GET
{
    "transaction_id": int,
    "hash": string,
    "details": string,
    "actiontype_id": int,
    "actiontype": string
}
*/