import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./actionTypeQueries";

export const postActionType = async (req: any,res: any) => {
    try{
      const {actionType} : Record<string, any> = req.body;
      const newActionType : QueryResult<any> = await pool.query(queries.addActionType, [actionType]);
  
      res.json(newActionType.rows[0]);
    }catch(err: any){
      res.status(500).json(err);
    }
}
export const getActionTypes = async (req: any,res: any) => {
    try{
      pool.query(queries.getActionTypes, (error, results) => {
          if (error) throw error;

          res.status(200).json(results.rows);
      })
    }catch(err: any){
      return res.status(400).json(err);
  }
}
export const getActionTypeById = async (req: any,res: any) => {
  try{
      const id = parseInt(req.params.id);

      pool.query(queries.getActionTypeById, [id], (error, results) => {
          if (error) throw error;

          if (results.rows.length){
              res.status(200).json(results.rows[0]);
          }else{
              res.status(400).json({message: "Action type does not exist. (Non existent id)"})
          }  
      })
  }catch(err: any){
      return res.status(400).json(err);
  }
}
export const deleteActionType = async (req: any,res: any) => {
  try{
      const id = parseInt(req.params.id);
      const loglevel: QueryResult<any> = await pool.query(queries.getActionTypeById, [id]);

      if(!loglevel.rows.length){
          res.status(400).json({message: "Action type does not exist. (Non existent id)"})
      }
      else {
          pool.query(queries.deleteActionTypeById, [id], (error, results) => {
          if (error) throw error;

          res.status(200).json({message: "Successfully deleted."});
          })
      }
  }catch(err: any){
      return res.status(400).json(err);
  }
}
export const updateActionType = async (req: any,res: any) => {
  try{
      const id = parseInt(req.params.id);
      const {actionType} = req.body;
      const existingActionType: QueryResult<any> = await pool.query(queries.getActionTypeById, [id]);
      
      if(!existingActionType.rows.length){
          res.status(400).json({message: "Action type does not exist. (Non existent id)"})
      }
      else {
          const newActionType: QueryResult<any>  = await pool.query(queries.updateActionType, [actionType, id]);
          res.status(200).json(newActionType.rows[0]);
      }
  }catch(err: any){
      return res.status(400).json(err);
  }
}