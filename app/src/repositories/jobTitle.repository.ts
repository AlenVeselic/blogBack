import { getRepository } from "typeorm";
import { JobTitle } from "../models";

export interface IJobTitlePayload{
    name: string;
}

export const getJobTitles = async (): Promise<Array<JobTitle>> => {
    //Temporary code to fill Job Title table up with hardcoded initial values
    /*const defaultTitles: string[] = ["Student", "IT", "HR", "Marketing",
                        "Design", "Tester", "Developer"];

    for (var title of defaultTitles) {
        const jobTitleRepository = getRepository(JobTitle);
        console.log(await jobTitleRepository.findOne({ name: title}));
        if(!(await jobTitleRepository.findOne({ name: title}))){
            const newJobTitle = new JobTitle();
            newJobTitle.name = title;
            const jobSaveResult = await jobTitleRepository.save(newJobTitle);
            console.log(jobSaveResult);
        }
        
    }
    Initial job title insertion, i don't know where to put this just yet
    */
    
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