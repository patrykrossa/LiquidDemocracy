import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./loglevelQueries";

export const postLoglevel = async (req: any,res: any) => {
    try{
      const {loglevel} : Record<string, any> = req.body;
      const newLoglevel : QueryResult<any> = await pool.query(queries.addLoglevel, [loglevel]);
  
      res.json(newLoglevel.rows[0]);
    }catch(err: any){
      res.status(500).json(err);
    }
}
export const getLoglevels = async (req: any,res: any) => {
    try{
      pool.query(queries.getLoglevels, (error, results) => {
          if (error) throw error;

          res.status(200).json(results.rows);
      })
    }catch(err: any){
      return res.status(400).json(err);
  }
}
export const getLoglevelById = async (req: any,res: any) => {
  try{
      const id = parseInt(req.params.id);

      pool.query(queries.getLoglevelById, [id], (error, results) => {
          if (error) throw error;

          if (results.rows.length){
              res.status(200).json(results.rows[0]);
          }else{
              res.status(400).json({message: "Log level does not exist. (Non existent id)"})
          }  
      })
  }catch(err: any){
      return res.status(400).json(err);
  }
}
export const deleteLoglevel = async (req: any,res: any) => {
  try{
      const id = parseInt(req.params.id);
      const loglevel: QueryResult<any> = await pool.query(queries.getLoglevelById, [id]);

      if(!loglevel.rows.length){
          res.status(400).json({message: "Log level does not exist. (Non existent id)"})
      }
      else {
          pool.query(queries.deleteLoglevelById, [id], (error, results) => {
          if (error) throw error;

          res.status(200).json({message: "Successfully deleted."});
          })
      }
  }catch(err: any){
      return res.status(400).json(err);
  }
}
export const updateLoglevel = async (req: any,res: any) => {
  try{
      const id = parseInt(req.params.id);
      const {loglevel} = req.body;
      const existingLoglevel: QueryResult<any> = await pool.query(queries.getLoglevelById, [id]);
      
      if(!existingLoglevel.rows.length){
          res.status(400).json({message: "Log level does not exist. (Non existent id)"})
      }
      else {
          const newLoglevel: QueryResult<any>  = await pool.query(queries.updateLoglevel, [loglevel, id]);
          res.status(200).json(newLoglevel.rows[0]);
      }
  }catch(err: any){
      return res.status(400).json(err);
  }
}