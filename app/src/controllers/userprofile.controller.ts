import { Get, Route, Tags, Post, Body, Path } from "@tsoa/runtime";
import { userprofile } from "../models";
import {
    getProfiles,
    IUserprofilePayload,
    createProfile,
    getProfile,
}from "../repositories/userProfile.repository";

@Route("profiles")
@Tags("userprofile")
export default class userprofileController {
    @Get("/")
    public async getProfiles(): Promise<Array<userprofile>> {
        return getProfiles();
    }

    @Post("/")
    public async createProfile(@Body() body: IUserprofilePayload): Promise<userprofile> {
        return createProfile(body);
    }

    @Get("/:id")
    public async getProfile(@Path() id: string): Promise<userprofile | null> {
        return getProfile(Number(id));
    }
}