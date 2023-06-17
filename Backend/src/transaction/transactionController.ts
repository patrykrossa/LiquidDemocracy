import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./transactionQueries";

export const postTransaction = async (req: any, res: any) => {
    try{ 
        const {hash, details, actionTypeID} = req.body;
        
        const actionTypeInDatabase: QueryResult<any> = await pool.query(queries.checkActionTypeExists, [actionTypeID]); 

        if (actionTypeInDatabase.rows.length == 0){
            return res.status(400).json({message: "Action type does not exist."});
        }
        else {
            const newTransaction: QueryResult<any> = await pool.query(queries.addTransaction, [hash, details, actionTypeID]);
            return res.status(201).json(newTransaction.rows[0]);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getTransactions = async (req: any,res: any) => {
    try{
        pool.query(queries.getTransactions, (error, results) => {
            if (error) throw error;
            
            res.status(200).json(results.rows);
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getTransactionById = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);

        pool.query(queries.getTransactionById, [id], async (error, results) => {
            if (error) throw error;

            if (results.rows.length){
                res.status(200).json(results.rows[0]);
            }
            else{
                res.status(400).json({message: "Transaction does not exist. (Non existent id)"})
            }  
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const deleteTransaction = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        const log: QueryResult<any> = await pool.query(queries.getTransactionById, [id]);

        if(!log.rows.length){
            res.status(400).json({message: "Transaction does not exist. (Non existent id)"})
        }
        else {
            pool.query(queries.deleteTransaction, [id], (error, results) => {
            if (error) throw error;

            res.status(200).json({message: "Successfully deleted."});
            })
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const updateTransaction = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        let {hash, details, actionTypeID} = req.body;
        const transaction: QueryResult<any> = await pool.query(queries.getTransactionById, [id]);

        let actionTypeInDatabase: QueryResult<any> | null = null;   

        if(hash == null)
            hash = transaction.rows[0]["hash"];

        if(actionTypeID == null)
            actionTypeID = transaction.rows[0]["actiontype_id"];
        else
            actionTypeInDatabase = await pool.query(queries.checkActionTypeExists, [actionTypeID]);

        if(details == null)
            details = transaction.rows[0]["details"];
    
        if(!transaction.rows.length){
            res.status(400).json({message: "Transaction does not exist. (Non existent id)"});
        }
        else if (actionTypeID != transaction.rows[0]["actiontype_id"] && actionTypeInDatabase == null ){
            return res.status(400).json({message: "Action type does not exist."});
        }
        else {
            const newTransaction: QueryResult<any>  = await pool.query(queries.updateTransaction, [hash, details, actionTypeID, id]);
            res.status(200).json(newTransaction.rows[0]);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}