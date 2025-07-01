import { CommentApiRepository } from "@/entities/comment/repository";
import { PostApiRepository } from "@/entities/post/repository";
import { UserApiRepository } from "@/entities/user/repository";
import { PostService } from "@/features/post/services/post.service";
import { apiClient } from "@/shared/api/api";

const createPostService = () => {
  const postRepository = new PostApiRepository(apiClient);
  const userRepository = new UserApiRepository(apiClient);
  const commentRepository = new CommentApiRepository(apiClient);
  return PostService(postRepository, commentRepository, userRepository);
};

export const postService = createPostService();
