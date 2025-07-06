import { postUsecase } from "../services";
import { createPostHooks } from "./post.hooks.factory";

export const { useGetPostById, useGetPosts } = createPostHooks(postUsecase);
