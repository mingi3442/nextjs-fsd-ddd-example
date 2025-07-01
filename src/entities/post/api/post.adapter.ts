import { ApiClient } from "@/shared/api/api";
import { Pagination } from "@/shared/types";
import { PostDto } from "../dto/post.dto";

export const PostAdapter = (apiClient: ApiClient) => ({
  list: async (limit: number, skip: number): Promise<Pagination<PostDto>> => {
    try {
      const response = await apiClient.get<Pagination<PostDto>>(
        `/posts?limit=${limit}&skip=${skip}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching post list:`, error);
      throw error;
    }
  },
  search: async (searchQuery: string): Promise<Pagination<PostDto>> => {
    try {
      const response = await apiClient.get<Pagination<PostDto>>(
        `/posts/search?q=${searchQuery}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error searching for '${searchQuery}':`, error);
      throw error;
    }
  },

  getById: async (id: string): Promise<PostDto> => {
    try {
      const response = await apiClient.get<PostDto>(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching post with ID ${id}:`, error);
      throw error;
    }
  },

  create: async (
    title: string,
    body: string,
    userId: string
  ): Promise<PostDto> => {
    try {
      const response = await apiClient.post<PostDto>(`/posts/add`, {
        title,
        body,
        userId,
      });
      return response.data;
    } catch (error) {
      console.error(`Error creating post:`, error);
      throw error;
    }
  },

  update: async (id: string, title: string, body: string): Promise<PostDto> => {
    try {
      const response = await apiClient.put<PostDto>(`/posts/${id}`, {
        title,
        body,
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating post with ID ${id}:`, error);
      throw error;
    }
  },

  remove: async (id: string): Promise<boolean> => {
    try {
      const response = await apiClient.delete<{ success: boolean }>(
        `/posts/${id}`
      );
      return response.ok;
    } catch (error) {
      console.error(`Error deleting post with ID ${id}:`, error);
      return false;
    }
  },

  likePost: async (id: string, userId: string): Promise<boolean> => {
    try {
      const response = await apiClient.patch<{ success: boolean }>(
        `/posts/${id}/like`,
        { userId }
      );
      return response.ok;
    } catch (error) {
      console.error(`Error liking post with ID ${id}:`, error);
      return false;
    }
  },

  unlikePost: async (id: string, userId: string): Promise<boolean> => {
    try {
      const response = await apiClient.patch<{ success: boolean }>(
        `/posts/${id}/unlike`,
        { userId }
      );
      return response.ok;
    } catch (error) {
      console.error(`Error unliking post with ID ${id}:`, error);
      return false;
    }
  },
});
