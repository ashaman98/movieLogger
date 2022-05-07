const jwt = require("jsonwebtoken")
const {jwtSecret} = require("../config")
const {getUser} = require("../services/users_service")
const { Unauthorized, NotFound } = require("./errorHandler")
 
async function verifyToken(req,res,next){
    try{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
    
        if(!token){
            throw new Unauthorized("Token not found")
        }
        const {exp, id} = jwt.verify(token,jwtSecret)

        if(exp && (exp*1000 < Date.now())){
            throw new Unauthorized("token expired")
        }
        
        const user = await getUser(id);
        
        if(!(user)){
            throw new NotFound("User does not exist")
        }
        req.user = user;

    }catch(err){
        console.log(err)
        res.status(401).send("invalid token")
    }

    next()
}

module.exports = verifyToken