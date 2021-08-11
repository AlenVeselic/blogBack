import { Get, Route, Tags, Post as PostMethod, Body, Path } from "tsoa";
import { Post } from "../models";

import {
    createPost,
    getPosts,
    IPostPayload,
    getPost,
    getUserPosts
} from "../repositories/post.repository";

@Route("posts")
@Tags("Post")
export default class PostController {
    @Get("/")
    public async getPosts(): Promise<Array<Post>> {
        return getPosts();
    }

    @PostMethod("/")
    public async createPost(@Body() body: IPostPayload): Promise<Post> {
        return createPost(body);
    }

    @Get("/:id")
    public async getPost(@Path() id: string): Promise<Post | null> {
        return getPost(Number(id));
    }

    @Get("/from/:id")
    public async getUserPosts(@Path() id: string): Promise<Array<Post>>{
        return getUserPosts(Number(id));
    }
}