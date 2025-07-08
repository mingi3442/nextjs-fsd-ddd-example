import { CommentApiRepository } from "@/entities/comment";
import { PostApiRepository } from "@/entities/post";
import { UserApiRepository } from "@/entities/user";
import { apiClient } from "@/shared/api";
import { PostService } from "./post.service";

export const createPostService = () => {
  const postRepository = new PostApiRepository(apiClient);
  const userRepository = new UserApiRepository(apiClient);
  const commentRepository = new CommentApiRepository(apiClient);
  return PostService(postRepository, commentRepository, userRepository);
};
