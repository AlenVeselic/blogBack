import express from "express";
import { getRepository } from "typeorm";
import { User } from "../models";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/", async (req,res) =>{
    const usernameEmail = req.body.usernameEmail;
    console.log(usernameEmail);
    const userRepository = getRepository(User);
    const userByName = userRepository.findOne({username: usernameEmail});
    if(!userByName){
        const userByEmail = userRepository.findOne({email: usernameEmail});
        if(!userByEmail){
            res.send({message: "Doesn't exist"})
        }else{
            const password = req.body.pass;
            const user = await userByEmail || new User();
            console.log("Validation by email")
            res.send({message: await checkPassword(user, password)});
        }
    }else{
        const password = req.body.pass;
        const user = await userByName;
        console.log("Validation by username")
        if(user != undefined){
            res.send({message: await checkPassword(user, password)});
        }else{
            res.send({message: "Doesn't exist"})
        }
    }
    


})

async function checkPassword(user: User, reqPassword: string){
    console.log("Reached password check");
    console.log("Password: " + reqPassword);
    const validation = await bcrypt.compare(reqPassword, user.pass);
    console.log("Password validated as: "+ validation.toString())
    if(validation){
        return "Welcome "+ user.username;
    }else{
        return "Incorrect password"
    }
}

export default router;