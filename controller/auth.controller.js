import fs from 'fs';
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../constants.js';
import { v4 as uuidv4 } from 'uuid';

export const registerUser = async (req,res) => {
    const {password,...user} = req.body;
    const db= fs.readFileSync('./db.json','utf-8');
    const parsedDb = JSON.parse(db);
    try{
        const hashedPassword = await bcrypt.hash(password,SALT_ROUNDS);
        const userToSave = {
            ...user,
            password:hashedPassword,
            id:uuidv4()
        };
        parsedDb.users.push(userToSave);
        fs.writeFileSync('./db.json', JSON.stringify(parsedDb));
        res.status(201).send({...user, id:userToSave.id});
    }
    catch(e){
        res.status(500).send("Sum went wrong")
    }
}

export const loginUser = async (req,res) => {
    const {email,password} = req.body;
    const db= fs.readFileSync('./db.json','utf-8');
    const parsedDb = JSON.parse(db);
    const user= parsedDb.users.find(user => user.email===email);
    const match = await bcrypt.compare(password,user.password);
    
    if(match){
        res.status(200).send("success");
    }
    else{
        res.status(401).send("failed");
    }
}
