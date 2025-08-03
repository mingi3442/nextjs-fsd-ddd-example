import { Comment } from "../core";
import { CommentDto } from "../infrastructure/dto";
import { CommentEntity } from "../types";

export class CommentMapper {
  static toDto(comment: Comment | CommentEntity): CommentDto {
    return {
      id: comment.id,
      body: comment.body,
      postId: comment.postId,
      user: comment.user,
      likes: comment.likes,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }

  static toDomain(dto: CommentDto | CommentEntity): Comment {
    return new Comment(
      dto.id,
      dto.body,
      dto.user,
      dto.postId.toString(),
      dto.likes || 0,
      dto.createdAt || new Date().getTime(),
      dto.updatedAt || new Date().getTime()
    );
  }

  static fromEntity(entity: CommentEntity): Comment {
    return new Comment(
      entity.id,
      entity.body,
      entity.user,
      entity.postId.toString(),
      entity.likes || 0,
      entity.createdAt || new Date().getTime(),
      entity.updatedAt || new Date().getTime()
    );
  }

  static toDomainList(dtos: CommentDto[]): Comment[] {
    return dtos.map((dto) => this.toDomain(dto));
  }

  static fromEntityList(entities: CommentEntity[]): Comment[] {
    return entities.map((entity) => this.fromEntity(entity));
  }

  static toDtoList(comments: Comment[] | CommentEntity[]): CommentDto[] {
    return comments.map((comment) => this.toDto(comment));
  }
}
