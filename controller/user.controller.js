import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const getUsers = (req,res) =>{
    const db = fs.readFileSync("./db.json","utf-8");
    const {users} = JSON.parse(db)
    const mappedUsers = users.map(user =>{
      delete user?.password;
      return user;
    });
    res.send(users);
}
export const getUserById = (req,res) =>{
    console.log(req);
    const id = req.params.id;
    const db = fs.readFileSync("./db.json","utf-8");
    const {users} = JSON.parse(db)
    const user = users?.find(user => user.id===id);
    if(user){
      delete user.password;
      res.send(user)
    } 
    else{
      res.status(404).send("User not found!");
    }
    console.log(user);
    res.send(user);
}

export const createUser = (req,res) =>{
    console.log(req.body);
    const db = fs.readFileSync("./db.json","utf-8");
    const user = req.body;
    user.id=uuidv4();
    const parsedDb = JSON.parse(db);
    if(parsedDb.users)
      parsedDb.users.push(user);
    else{
      parsedDb.users = [user]
    }
    try{
      fs.writeFileSync('./db.json', JSON.stringify(parsedDb));
      res.status(201).send(user);
    }
    catch(e){
      res.status(500).send("Sum went wrong")
    }
    console.log(parsedDb.users);
}
export const updateUser = (req,res) =>{
    const user = req.body;
    const id = req.params.id;
    const db = fs.readFileSync("./db.json","utf-8");
    const parsedDb = JSON.parse(db);
    const index = parsedDb.users.findIndex(user => user.id === id);
    parsedDb.users[index]={...user, password: parsedDb.users[index].password};
    try{
      fs.writeFileSync('./db.json', JSON.stringify(parsedDb));
      res.status(200).send(user);
    }
    catch(e){
      res.status(500).send("Sum went wrong")
    }
}

export const patchUser = (req,res) => {
    const user = req.body;
    const id = req.params.id;
    const db = fs.readFileSync("./db.json","utf-8");
    const parsedDb = JSON.parse(db);
  
    const index = parsedDb.users.findIndex(user => user.id === id);
    for(const [key,value] of Object.entries(user)){
      parsedDb.users[index][key]=value;
    }
    try{
      fs.writeFileSync('./db.json', JSON.stringify(parsedDb,null,'\t'));
      res.status(200).send(parsedDb.users[index]);
    }
    catch(e){
      res.status(500).send("Sum went wrong")
    }
}

export const deleteUser = (req,res) => {
    const id = req.params.id;
    console.log(id);
    const db = fs.readFileSync("./db.json","utf-8");
    const parsedDb = JSON.parse(db);
    const index = parsedDb.users.findIndex(user => user.id === id);
    if(index !== -1){
      try{
        parsedDb.users.splice(index,1);
        fs.writeFileSync('./db.json', JSON.stringify(parsedDb,null,'\t'));
        res.status(204).send();
      }
      catch(e){
      res.status(500).send("Sum went wrong")
      }
    }
    else{
      res.status(404).send('User not found!');
    }
}