import { PostUseCase } from "../usecase/post.usecase";
import { createUseGetPostById } from "./useGetPostById";
import { createUseGetPosts } from "./useGetPosts";

export const createPostHooks = (postUseCase: PostUseCase) => ({
  useGetPosts: createUseGetPosts(postUseCase),
  useGetPostById: createUseGetPostById(postUseCase),
});
