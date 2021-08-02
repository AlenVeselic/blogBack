import { getRepository } from "typeorm";
import { JobTitle } from "../models";

export interface IJobTitlePayload{
    name: string;
}

export const getJobTitles = async (): Promise<Array<JobTitle>> => {
    const jobTitleRepository = getRepository(JobTitle);
    return jobTitleRepository.find();
};

export const createJobTitle = async( payload: IJobTitlePayload ): Promise<JobTitle> => {
    const jobTitleRepository = getRepository(JobTitle);
    const jobTitle = new JobTitle();
    return jobTitleRepository.save({
        ...jobTitle,
        ...payload,
    });
};

export const getJobTitle = async (id: number): Promise<JobTitle | null> => {
    const jobTitleRepository = getRepository(JobTitle);
    const jobTitle = await jobTitleRepository.findOne({ id: id});
    if(!jobTitle) return null;
    return jobTitle;
}