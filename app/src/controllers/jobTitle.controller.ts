import { Get, Route, Tags, Post, Body, Path } from "@tsoa/runtime";
import { JobTitle } from "../models";
import {
    getJobTitles,
    IJobTitlePayload,
    createJobTitle,
    getJobTitle,
} from "../repositories/jobTitle.repository";

@Route("jobtitles")
@Tags("JobTitle")
export default class JobTitleController {
    @Get("/")
    public async getJobTitles(): Promise<Array<JobTitle>> {
        return getJobTitles();
    }

    @Post("/")
    public async createJobTitle(@Body() body: IJobTitlePayload): Promise<JobTitle> {
        return createJobTitle(body);
    }

    @Get("/:id")
    public async getJobTitle(@Path() id:string): Promise<JobTitle | null> {
        return getJobTitle(Number(id));
    }
}