import express from "express";
import { getRepository } from "typeorm";
import { User } from "../models";
import bcrypt from "bcryptjs";
import { TokenData, createToken } from "../tokens/token";

const router = express.Router();


router.post("/", async (req,res) =>{
    const usernameEmail = req.body.usernameEmail;
    const userRepository = getRepository(User);
    const userByName = userRepository.findOne({username: usernameEmail});
    
    if(await userByName === undefined){
        const userByEmail = userRepository.findOne({email: usernameEmail});
        if(await userByEmail === undefined){
            res.send({message: "Doesn't exist"})
        }else{
            const password = req.body.pass;
            const user = await userByEmail;
            //Validation by email
            if(user != undefined){
                const validated = await checkPassword(user, password);
                if(validated){
                    user.pass = "";
                    const tokenData = await createToken(user);
                    res.send({message: "Success", user: user, token: await createCookie(tokenData)})
                }else{
                    res.send({message: "Incorrect password"})
                }
            }else{
                res.send({message: "Doesn't exist"})
            }
        }
    }else{
        const password = req.body.pass;
        const user = await userByName;
        //Validation by username
        if(user != undefined){
            const validated = await checkPassword(user, password);
            if(validated){
                user.pass = "";
                const tokenData = await createToken(user);
                res.send({message: "Success", user: user, token: await createCookie(tokenData)})
            }else{
                res.send({message: "Incorrect password"})
            }
        }else{
            res.send({message: "Doesn't exist"})
        }
    }
    


})

async function checkPassword(user: User, reqPassword: string): Promise<boolean>{
    const validation = await bcrypt.compare(reqPassword, user.pass);
    if(validation){
        return true;
    }else{
        return false
    }
}

async function createCookie(tokenData: TokenData){
    return {id:tokenData.token, maxAge:tokenData.expiresIn};
}

export default router;