import { getRepository } from "typeorm";
import {  User, userprofile } from "../models";

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

export const createUser = async (payload: IUserPayload): Promise<User> => {
    const userRepository = getRepository(User);
    const user = new User();

    const profileRepository = getRepository(userprofile)
    const profile = new userprofile()

    const savedProfile = profileRepository.save(
        profile,
    )

    const profileId = (await savedProfile).id


    return userRepository.save({
        ...user,
        ...payload, profileId,
    });
};

export const deleteUser = async(id: number): Promise<Boolean> => {
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

