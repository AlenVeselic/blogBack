import jwt from "jsonwebtoken";
import { User, } from "../models";





export interface TokenData{
    token: string;
    expiresIn: number;
}

export interface DataStoredInToken{
    _id: number;
}

export const createToken= async (user: User): Promise<TokenData> => {
    const expiresIn = 60*60;
    
    const secrets = process.env.JWT_SECRET || "untetheredSecrecy";
    
    const dataStoredInToken: DataStoredInToken = {
        _id: user.id,
    };
    return{
        expiresIn,
        token: jwt.sign(dataStoredInToken, secrets, { expiresIn })
    };
}