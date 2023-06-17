import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./logQueries";

export const postLog = async (req: any, res: any) => {
    try{ 
        const {description, loglevelID, date} = req.body;
        
        const loglevelInDatabase: QueryResult<any> = await pool.query(queries.checkLoglevelExists, [loglevelID]); 

        if (loglevelInDatabase.rows.length == 0){
            return res.status(400).json({message: "Loglevel does not exist."});
        }
        else {
            const newLog: QueryResult<any> = await pool.query(queries.addLog, [description,loglevelID, date]);
            return res.status(201).json(newLog.rows[0]);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getLogs = async (req: any,res: any) => {
    try{
        pool.query(queries.getLogs, (error, results) => {
            if (error) throw error;
            
            res.status(200).json(results.rows);
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getLogById = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);

        pool.query(queries.getLogById, [id], async (error, results) => {
            if (error) throw error;

            if (results.rows.length){
                res.status(200).json(results.rows[0]);
            }
            else{
                res.status(400).json({message: "Log does not exist. (Non existent id)"})
            }  
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const deleteLog = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        const log: QueryResult<any> = await pool.query(queries.getLogById, [id]);

        if(!log.rows.length){
            res.status(400).json({message: "Log does not exist. (Non existent id)"})
        }
        else {
            pool.query(queries.deleteLog, [id], (error, results) => {
            if (error) throw error;

            res.status(200).json({message: "Successfully deleted."});
            })
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const updateLog = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        let {description, loglevelID, date} = req.body;
        const log: QueryResult<any> = await pool.query(queries.getLogById, [id]);

        let loglevelInDatabase: QueryResult<any> | null = null;   

        if(description == null)
            description = log.rows[0]["description"];

        if(loglevelID == null)
            loglevelID = log.rows[0]["loglevel_id"];
        else
            loglevelInDatabase = await pool.query(queries.checkLoglevelExists, [loglevelID]);

        if(date == null)
            date = log.rows[0]["date"];
    
        if(!log.rows.length){
            res.status(400).json({message: "Log does not exist. (Non existent id)"});
        }
        else if (loglevelID != log.rows[0]["loglevel_id"] && loglevelInDatabase == null ){
            return res.status(400).json({message: "Loglevel does not exist."});
        }
        else {
            const newLog: QueryResult<any>  = await pool.query(queries.updateLog, [description, loglevelID, date, id]);
            res.status(200).json(newLog.rows[0]);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}