import jwt from 'jsonwebtoken'
import {SECRET} from '../constants.js'
 
 export const authMiddleware = (req,res,next) => {
    console.log(req.headers)
    const token = req.headers['x-access-token'];
    try{
        jwt.verify(token,SECRET);
        next();
    } catch(error){
        console.log(error);
        res.status(403).send("Unauthorized");
    }
}