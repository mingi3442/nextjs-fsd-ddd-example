import { CommentApiRepository } from "@/entities/comment/infrastructure/repository";
import { PostApiRepository } from "@/entities/post/infrastructure/repository";
import { UserApiRepository } from "@/entities/user/infrastructure/repository";
import { PostService } from "@/features/post/services/post.service";
import { apiClient } from "@/shared/api/api";

const createPostService = () => {
  const postRepository = new PostApiRepository(apiClient);
  const userRepository = new UserApiRepository(apiClient);
  const commentRepository = new CommentApiRepository(apiClient);
  return PostService(postRepository, commentRepository, userRepository);
};

export const postService = createPostService();
