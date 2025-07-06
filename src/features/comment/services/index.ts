import { CommentApiRepository } from "@/entities/comment/infrastructure/repository";
import { UserApiRepository } from "@/entities/user/infrastructure/repository";
import { apiClient } from "@/shared/api/api";
import { CommentService } from "./comment.service";

const createCommentService = () => {
  const commentRepository = new CommentApiRepository(apiClient);
  const userRepository = new UserApiRepository(apiClient);
  return CommentService(commentRepository, userRepository);
};

export const commentService = createCommentService();
