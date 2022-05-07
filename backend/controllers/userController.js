const express = require('express');
const router = express.Router()
const userService = require("../services/users_service")

router.post("/",signup)
router.get("/:id",findUser)
router.post("/session", login)


async function signup(req,res){
    try{
        
        const result = await userService.signUp(req)
        return res.status(201).send(result);
    }
    catch(err) {
        console.log(err)
        return res.status(500).send('internal error :)')
    }
}
async function login(req,res){
    const token = await userService.login(req.body)

    res.send(token)
}
async function findUser(req,res){
    const myUser = await userService.getUser(req.params.id)
    res.send(myUser)
}

module.exports = router