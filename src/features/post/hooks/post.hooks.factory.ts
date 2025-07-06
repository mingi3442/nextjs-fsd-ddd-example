import { PostUseCase } from "@/features/post/usecase/post.usecase";
import { createUseGetPostById } from "./useGetPostById";
import { createUseGetPosts } from "./useGetPosts";

export const createPostHooks = (postUseCase: PostUseCase) => {
  return {
    useGetPosts: createUseGetPosts(postUseCase),
    useGetPostById: createUseGetPostById(postUseCase),
  };
};
