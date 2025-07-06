import { POST_QUERY_KEYS } from "@/entities/post/infrastructure/api";
import { postService } from "@/features/post/services";
import { BaseError } from "@/shared/libs/errors";
import { useQuery } from "@tanstack/react-query";
import { GetPostsOptions } from "../types";
import { PostDetailResult, PostListResult } from "../types/result.types";

export const useGetPosts = (options: GetPostsOptions = {}) => {
  const { limit = 10, skip = 0, query } = options;

  const isSearchQuery = !!query && query.length >= 2;

  return useQuery<PostListResult, Error>({
    queryKey:
      isSearchQuery && query
        ? POST_QUERY_KEYS.search(query)
        : POST_QUERY_KEYS.list({ limit, skip }),
    queryFn: async () => {
      try {
        if (isSearchQuery && query) {
          return await postService.searchPosts(limit, skip, query);
        }
        return await postService.getAllPosts(limit, skip);
      } catch (error) {
        if (error instanceof BaseError) {
          throw error;
        }
        throw new BaseError(
          `Failed to fetch posts${query ? ` with query "${query}"` : ""}`,
          "FETCH_FAILED"
        );
      }
    },
    enabled: isSearchQuery ? !!query : true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const useGetPostById = (id: string, enabled = true) => {
  return useQuery<PostDetailResult, Error>({
    queryKey: POST_QUERY_KEYS.detail(id),
    queryFn: async () => {
      try {
        return await postService.getPostById(id);
      } catch (error) {
        if (error instanceof BaseError) {
          throw error;
        }
        throw new BaseError(
          `Failed to fetch post with ID ${id}`,
          "FETCH_FAILED"
        );
      }
    },
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
};
