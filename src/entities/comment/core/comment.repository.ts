import { Comment } from "@/entities/comment/core/comment.domain";

export interface CommentRepository {
  getByPostId(postId: string): Promise<Comment[]>;
  getById(id: string): Promise<Comment>;
  create(comment: Comment): Promise<Comment>;
  update(comment: Comment): Promise<Comment>;
  save(comment: Comment): Promise<Comment>;
  delete(id: string): Promise<boolean>;
  like(id: string, userId: string): Promise<boolean>;
  unlike(id: string, userId: string): Promise<boolean>;
}
