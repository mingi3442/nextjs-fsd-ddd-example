import {
  CommentDto,
  CommentFactory,
  CommentMapper,
  CommentRepository,
} from "@/entities/comment";
import { UserRepository } from "@/entities/user";
import { BaseError } from "@/shared/libs/errors";
import { CommentUseCase } from "../usecase/comment.usecase";

export const CommentService = (
  commentRepository: CommentRepository,
  userRepository: UserRepository
): CommentUseCase => ({
  getAllComments: async (postId: string): Promise<CommentDto[]> => {
    try {
      const domainComments = await commentRepository.getByPostId(postId);
      return domainComments.map((comment) => CommentMapper.toDto(comment));
    } catch (error) {
      console.error(`Error fetching comments for post ID ${postId}:`, error);
      if (error instanceof BaseError) {
        throw error;
      }
      throw new Error(`Failed to fetch comments for post ID ${postId}`);
    }
  },

  getCommentById: async (id: string): Promise<CommentDto> => {
    try {
      const comment = await commentRepository.getById(id);
      return CommentMapper.toDto(comment);
    } catch (error) {
      console.error(`Error fetching comment with ID ${id}:`, error);
      if (error instanceof BaseError) {
        throw error;
      }
      throw BaseError.notFound("Comment", id);
    }
  },

  addComment: async (
    body: string,
    postId: string,
    userId: string
  ): Promise<CommentDto> => {
    try {
      const user = await userRepository.getUserProfile();

      const newComment = CommentFactory.createNew(body, postId, {
        id: userId,
        username: user.username,
        profileImage: user.profileImage || "",
      });

      const savedComment = await commentRepository.create(newComment);

      if (!savedComment) throw BaseError.createFailed("Comment");

      return CommentMapper.toDto(savedComment);
    } catch (error) {
      console.error(`Error creating comment:`, error);
      if (error instanceof BaseError) {
        throw error;
      }
      throw BaseError.createFailed("Comment");
    }
  },

  updateComment: async (
    id: string,
    body: string,
    userId: string
  ): Promise<CommentDto> => {
    try {
      const existingComment = await commentRepository.getById(id);
      if (!existingComment) {
        throw BaseError.notFound("Comment", id);
      }

      if (existingComment.user.id !== userId) {
        throw BaseError.unauthorized("Comment", id, "edit");
      }

      existingComment.updateBody(body);

      const updatedComment = await commentRepository.update(existingComment);
      if (!updatedComment) {
        throw BaseError.updateFailed("Comment", id);
      }

      return CommentMapper.toDto(updatedComment);
    } catch (error) {
      console.error(`Error updating comment with ID ${id}:`, error);
      if (error instanceof BaseError) {
        throw error;
      }
      throw BaseError.updateFailed("Comment", id);
    }
  },

  deleteComment: async (id: string, userId: string): Promise<boolean> => {
    try {
      const existingComment = await commentRepository.getById(id);
      if (!existingComment) {
        throw BaseError.notFound("Comment", id);
      }

      if (existingComment.user.id !== userId) {
        throw BaseError.unauthorized("Comment", id, "delete");
      }

      const result = await commentRepository.delete(id);
      if (!result) {
        throw BaseError.deleteFailed("Comment", id);
      }

      return result;
    } catch (error) {
      console.error(`Error deleting comment with ID ${id}:`, error);
      if (error instanceof BaseError) {
        throw error;
      }
      throw BaseError.deleteFailed("Comment", id);
    }
  },

  likeComment: async (id: string, userId: string): Promise<boolean> => {
    try {
      return await commentRepository.like(id, userId);
    } catch (error) {
      console.error(`Error liking comment with ID ${id}:`, error);
      if (error instanceof BaseError) {
        throw error;
      }
      throw BaseError.updateFailed("Comment", id);
    }
  },

  unlikeComment: async (id: string, userId: string): Promise<boolean> => {
    try {
      return await commentRepository.unlike(id, userId);
    } catch (error) {
      console.error(`Error unliking comment with ID ${id}:`, error);
      if (error instanceof BaseError) {
        throw error;
      }
      throw BaseError.updateFailed("Comment", id);
    }
  },
});
