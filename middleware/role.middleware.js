import { PERMISSIONS } from "../constants.js";


const checkRole = (req,res,next) => {
    const {user} = req;
    const endpoint = req.method + req.url;
    console.log(endpoint);
    if(PERMISSIONS[user.role].includes(endpoint))
        next();
    else {
        res.status(403).send('Not allowed');
    }
    
}
export default checkRole;