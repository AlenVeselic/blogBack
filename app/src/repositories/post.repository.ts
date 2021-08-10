import { getRepository } from "typeorm";
import { Post, User } from "../models";

export interface IPostPayload {
    title: string;
    content: string;
    userId: number;
}

export const getPosts = async (): Promise<Array<Post>> => {
    const postRepository = getRepository(Post);
    return postRepository.find();
};

export const createPost = async (payload: IPostPayload): Promise<Post> => {
    const postRepository = getRepository(Post);
    const post = new Post();
    post.title = payload.title;
    post.content = payload.content;
    
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({id: payload.userId});
    if(user != undefined){
        post.user = user;
        return postRepository.save({
            ...post
        });
    }else{
        return new Post();
    }
};

export const getPost = async (id: number): Promise<Post | null> => {
    const postRepository = getRepository(Post);
    const post = await postRepository.findOne({ id: id});
    if(!post) return null;
    return post;
};

export const getUserPosts = async(id: number): Promise<Array<Post>> => {
    const postRepository = getRepository(Post);
    const userRepository = getRepository(User);
    const getUser = await userRepository.findOne({id: id});
    if(getUser != undefined){
        return await postRepository.find({user: getUser})
    }else{
        return [];
    }

}