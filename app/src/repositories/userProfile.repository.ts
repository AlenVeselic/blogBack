import { getRepository } from "typeorm";
import { userprofile } from "../models";

export interface IUserprofilePayload {
    profilePic: string;
    webPage: string;
    phoneNumber: string;
    age: string;
    gender: number;
    bio: string;
}

export const getProfiles = async (): Promise<Array<userprofile>> => {
    const profileRepository = getRepository(userprofile);
    return profileRepository.find();
};

export const createProfile = async ( payload: IUserprofilePayload ): Promise<userprofile> => {
    const profileRepository = getRepository(userprofile);
    const profile = new userprofile();
    return profileRepository.save({
        ...profile,
        ...payload,
    });
};

export const deleteProfile = async(id: number): Promise<boolean> => {
    const profileRepository = getRepository(userprofile);
    const profile = await profileRepository.findOne({ id: id});
    if(!profile){
        return false;
    }
    profileRepository.delete({id: id});
    return true;
    

}

export const getProfile = async (id: number): Promise<userprofile | null> => {
    const profileRepository = getRepository(userprofile);
    const profile = await profileRepository.findOne({ id: id});
    if(!profile) return null;
    return profile;
};