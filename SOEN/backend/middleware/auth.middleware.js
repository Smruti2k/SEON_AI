import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";


export const authUser = async (req , res , next) =>{
    try{
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if(!token)
        {
            return res.status(401).send({error : 'Unauthorized User'});
        }

        //this is for logging out code

        //here what we are doing is when the user logs out we storet hat token value in redis and if that same user tries to login again then if we find that token in blacklist var then we throw error to login again and remove the token from cookie as well 

        const isBlackListed = await redisClient.get(token);

        if(isBlackListed)
        {
            res.cookie('token', ' ');

            return res.status(401).send({error :'Please authenticate again'})
        }



        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err)
    {
        console.log(err);
        
        res.status(401).send({err:"Please Authenticate"});
    }
}