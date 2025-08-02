import { CommentApiRepository } from "@/entities/comment";
import { UserApiRepository } from "@/entities/user";
import { apiClient } from "@/shared/api";
import { CommentService } from "./comment.service";

export const createCommentService = () => {
  const commentRepository = new CommentApiRepository(apiClient);
  const userRepository = new UserApiRepository(apiClient);
  return CommentService(commentRepository, userRepository);
};
