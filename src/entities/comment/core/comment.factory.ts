import { CommentDto } from "../infrastructure/dto";
import { UserReference } from "../types";
import { Comment } from "./comment.domain";

export class CommentFactory {
  static createNew(body: string, postId: string, user: UserReference): Comment {
    return new Comment(
      "",
      body,
      {
        id: user.id,
        username: user.username,
        profileImage: user.profileImage || "",
      },
      postId,
      0,
      new Date().getTime(),
      new Date().getTime()
    );
  }

  static createFromDto(dto: CommentDto): Comment {
    return new Comment(
      dto.id,
      dto.body,
      dto.user,
      dto.postId,
      dto.likes || 0,
      dto.createdAt || new Date().getTime(),
      dto.updatedAt || new Date().getTime()
    );
  }
}
