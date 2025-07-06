import { COMMENT_QUERY_KEY } from "@/entities/comment/infrastructure/api";
import { CommentDto } from "@/entities/comment/infrastructure/dto";
import { commentService } from "@/features/comment/services";
import { BaseError } from "@/shared/libs/errors";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetCommentsByPostId = (
  postId: string
): UseQueryResult<CommentDto[], Error> => {
  return useQuery<CommentDto[], Error>({
    queryKey: COMMENT_QUERY_KEY.byPostId(postId),
    queryFn: async () => {
      try {
        return await commentService.getAllComments(postId);
      } catch (error) {
        if (error instanceof BaseError) {
          throw error;
        }
        throw new BaseError(
          `Failed to fetch comments for post ${postId}`,
          "FETCH_FAILED"
        );
      }
    },
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    enabled: Boolean(postId),
    retry: 2,
  });
};
