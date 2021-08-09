import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { User } from "../models";
import {
    getUsers,
    createUser,
    deleteUser,
    IUserPayload,
    getUser,
} from "../repositories/user";

@Route("users")
@Tags("User")
export default class UserController{
    @Get("/")
    public async getUsers(): Promise<Array<User>>{
        return getUsers();
    }

    @Post("/")
    public async createUser(@Body() body: IUserPayload): Promise<User | object> {
        const creation = await createUser(body);
        if(creation != false){
            return creation;
        }else{
            return ({message: "User already exists"});
        }
        
    }

    @Post("/delete")
    public async deleteUser(@Body() id:string): Promise<boolean>{
        return deleteUser(Number(id));
    }

    @Get("/:id")
    public async getUser(@Path() id: string): Promise<User | null> {
        return getUser(Number(id));
    }
}