import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./personQueries";

export const postPerson = async (req: any, res: any) => {
    try{ 
        const {walletAddress, name, surname, birthday, livingAddress, pesel} = req.body;

        const peselInDatabase: QueryResult<any> = await pool.query(queries.checkPeselExists, [pesel]); 
            
        const walletAddressInDatabase: QueryResult<any> = await pool.query(queries.checkWalletAddressExists, [walletAddress]); 

        if (peselInDatabase.rows.length){
            return res.status(400).json({message: "Pesel already exists."});
        }
        else if (walletAddressInDatabase.rows.length){
            return res.status(400).json({message: "Wallet address already exists."});
        }
        else {
            let newPerson: QueryResult<any> = await pool.query(queries.addPerson, [walletAddress, name, surname, birthday, livingAddress, pesel]);

            return res.status(201).json(newPerson.rows[0]);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getPeople = async (req: any,res: any) => {
    try{
        pool.query(queries.getPeople, (error, results) => {
            if (error) throw error;

            res.status(200).json(results.rows);
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getPersonById = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);

        pool.query(queries.getPersonById, [id], async (error, results) => {
            if (error) throw error;

            res.status(200).json(results.rows[0]);
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const deletePerson = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        const user: QueryResult<any> = await pool.query(queries.getPersonById, [id]);

        if(!user.rows.length){
            res.status(400).json({message: "Person does not exist. (Non existent id)"});
        }
        else {
            pool.query(queries.deletePerson, [id], (error, results) => {
            if (error) throw error;

            res.status(200).json({message: "Successfully deleted."});
            })
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const updatePerson = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        let {walletAddress, name, surname, birthday, livingAddress, pesel} = req.body;
        const person: QueryResult<any> = await pool.query(queries.getPersonById, [id]);

        let walletAddressInDatabase: QueryResult<any> | null = null;           
        let peselInDatabase: QueryResult<any> | null = null;
            
        if(name == null)
            name = person.rows[0]["name"];

        if(surname == null)
            surname = person.rows[0]["surname"];

        if(walletAddress == null)
            walletAddress = person.rows[0]["wallet_address"];
        else
            walletAddressInDatabase = await pool.query(queries.checkWalletAddressExists, [walletAddress]); 

        if(pesel == null)
            pesel = person.rows[0]["pesel"];
        else
            peselInDatabase = await pool.query(queries.checkPeselExists, [pesel]); 

        if(birthday == null)
            birthday = person.rows[0]["birthday"];

        if(livingAddress == null)
            livingAddress = person.rows[0]["living_address"];
    
        if(!person.rows.length){
            res.status(400).json({message: "Person does not exist. (Non existent id)"})
        }
        else if (peselInDatabase != null && peselInDatabase.rows.length && id != peselInDatabase.rows[0]["person_id"]){
            return res.status(400).json({message: "Pesel already exists."});
        }
        else if (walletAddressInDatabase != null && walletAddressInDatabase.rows.length && id != walletAddressInDatabase.rows[0]["person_id"]){
            return res.status(400).json({message: "Wallet address already exists."});
        }
        else {
            const newPerson: QueryResult<any>  = await pool.query(queries.updateUser, [walletAddress, name, surname, birthday, livingAddress, pesel, id]);
            res.status(200).json(newPerson.rows[0]);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}