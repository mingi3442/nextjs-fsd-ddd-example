import { CommentMapper, CommentRepository } from "@/entities/comment";
import {
  PostDto,
  PostFactory,
  PostMapper,
  PostRepository,
} from "@/entities/post";
import { UserRepository } from "@/entities/user";
import { BaseError } from "@/shared/libs/errors";
import { PostDetailResult, PostListResult } from "../types";
import { PostUseCase } from "../usecase/post.usecase";

export const PostService = (
  postRepository: PostRepository,
  commentRepository: CommentRepository,
  userRepository: UserRepository
): PostUseCase => ({
  getAllPosts: async (
    limit?: number,
    skip?: number
  ): Promise<PostListResult> => {
    try {
      const posts = await postRepository.getAll(
        limit as number,
        skip as number
      );
      return {
        data: PostMapper.toDtoList(posts),
        pagination: {
          limit: limit || 10,
          skip: skip || 0,
          total: posts.length,
        },
      };
    } catch (error) {
      console.error("Error fetching post list:", error);
      if (error instanceof BaseError) {
        throw error;
      }
      throw new BaseError(`Failed to fetch post list`, "FetchError");
    }
  },

  searchPosts: async (
    limit?: number,
    skip?: number,
    searchQuery?: string
  ): Promise<PostListResult> => {
    try {
      const posts = await postRepository.search(searchQuery as string);
      return {
        data: PostMapper.toDtoList(posts),
        pagination: {
          limit: limit || 10,
          skip: skip || 0,
          total: posts.length,
        },
      };
    } catch (error) {
      console.error(`Error searching posts with query ${searchQuery}:`, error);
      if (error instanceof BaseError) {
        throw error;
      }
      throw new BaseError(
        `Failed to search posts with query "${searchQuery}"`,
        "SearchError"
      );
    }
  },

  getPostById: async (id: string): Promise<PostDetailResult> => {
    try {
      const post = await postRepository.getById(id);

      if (!post) {
        throw BaseError.notFound("Post", id);
      }
      const comments = await commentRepository.getByPostId(id);

      return {
        ...PostMapper.toDto(post),
        comments: CommentMapper.toDtoList(comments),
      };
    } catch (error) {
      console.error(`Error fetching post with ID ${id}:`, error);
      if (error instanceof BaseError) {
        throw error;
      }
      throw BaseError.notFound("Post", id);
    }
  },

  addPost: async (
    title: string,
    body: string,
    userId: string,
    image?: string
  ): Promise<PostDto> => {
    try {
      const user = await userRepository.getUserProfile();
      if (!user) {
        throw BaseError.notFound("User", userId);
      }

      const newPost = PostFactory.createNew(
        title,
        body,
        {
          id: userId,
          username: user.username,
          profileImage: user.profileImage || "",
        },
        image
      );
      const createdPost = await postRepository.create(newPost);

      if (!createdPost) {
        throw BaseError.createFailed("Post");
      }

      return PostMapper.toDto(createdPost);
    } catch (error) {
      console.error(`Error creating new post with title "${title}":`, error);
      if (error instanceof BaseError) {
        throw error;
      }
      throw BaseError.createFailed("Post");
    }
  },

  updatePost: async (
    id: string,
    title: string,
    body: string
  ): Promise<PostDto> => {
    try {
      const existingPost = await postRepository.getById(id);
      if (!existingPost) {
        throw BaseError.notFound("Post", id);
      }

      existingPost.updateTitle(title);
      existingPost.updateBody(body);

      const updatedPost = await postRepository.update(existingPost);
      if (!updatedPost) {
        throw BaseError.updateFailed("Post", id);
      }

      return PostMapper.toDto(updatedPost);
    } catch (error) {
      console.error(`Error updating post with ID ${id}:`, error);
      if (error instanceof BaseError) {
        throw error;
      }
      throw BaseError.updateFailed("Post", id);
    }
  },

  deletePost: async (id: string): Promise<boolean> => {
    try {
      const existingPost = await postRepository.getById(id);
      if (!existingPost) {
        throw BaseError.notFound("Post", id);
      }

      return await postRepository.delete(id);
    } catch (error) {
      console.error(`Error deleting post with ID ${id}:`, error);
      if (error instanceof BaseError) {
        throw error;
      }
      throw BaseError.deleteFailed("Post", id);
    }
  },

  likePost: async (id: string, userId: string): Promise<boolean> => {
    try {
      const existingPost = await postRepository.getById(id);
      if (!existingPost) {
        throw BaseError.notFound("Post", id);
      }

      const user = await userRepository.getUserProfile();
      if (!user) {
        throw BaseError.notFound("User", userId);
      }

      return await postRepository.like(id, userId);
    } catch (error) {
      console.error(
        `Error liking post with ID ${id} by user ${userId}:`,
        error
      );
      if (error instanceof BaseError) {
        throw error;
      }
      throw BaseError.updateFailed("Post", id);
    }
  },

  unlikePost: async (id: string, userId: string): Promise<boolean> => {
    try {
      const existingPost = await postRepository.getById(id);
      if (!existingPost) {
        throw BaseError.notFound("Post", id);
      }

      const user = await userRepository.getUserProfile();
      if (!user) {
        throw BaseError.notFound("User", userId);
      }

      return await postRepository.unlike(id, userId);
    } catch (error) {
      console.error(
        `Error unliking post with ID ${id} by user ${userId}:`,
        error
      );
      if (error instanceof BaseError) {
        throw error;
      }
      throw BaseError.updateFailed("Post", id);
    }
  },
});
