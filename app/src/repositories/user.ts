import { getRepository } from "typeorm";
import {  JobTitle, User, userprofile } from "../models";
import { IUserprofilePayload } from "./userProfile.repository";
import bcrypt from "bcryptjs";

export interface IUserPayload {
    username: string;
    email: string;
    pass: string;
    name: string;
    surname: string;
}

export const getUsers = async(): Promise<Array<User>> => {
    const userRepository = getRepository(User);
    return userRepository.find();
};

export const createUser = async (payload: IUserPayload): Promise<User | false> => {
    
    const userRepository = getRepository(User);
    const usernameExists = userRepository.findOne({username: payload.username})
    const emailExists = userRepository.findOne({email: payload.email});
    if(usernameExists === undefined && emailExists === undefined){
        const user = new User();

        const profileRepository = getRepository(userprofile)
        const profile = new userprofile()

        const jobTitleRepository = getRepository(JobTitle);
        const jobTitle = await jobTitleRepository.findOne({ id: 9 });

        const freshProfileValues: IUserprofilePayload = {
            profilePic: " ",
            webPage: " ",
            phoneNumber: " ",
            age: " ",
            gender: 0,
            bio: " ",
        }
        if(jobTitle != undefined){
            profile.jobTitle = jobTitle;
        }
        const savedProfile = profileRepository.save({
            ...profile,
            ...freshProfileValues,
        });


        user.profile = await savedProfile;

        payload.pass = await bcrypt.hash(payload.pass, 10);

        return userRepository.save({
            ...user,
            ...payload,
        });
    }else{
        return false;
    }
};

export const deleteUser = async(id: number): Promise<boolean> => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ id: id});
    if(!user){
        return false;
    }
    userRepository.delete({id: id});
    return true;
    

}

export const getUser = async(id: number): Promise<User | null> => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ id: id});
    if(!user) return null;
    return user;
};

