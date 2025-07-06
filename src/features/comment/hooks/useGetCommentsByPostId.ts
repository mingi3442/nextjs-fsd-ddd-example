import { COMMENT_QUERY_KEY } from "@/entities/comment/infrastructure/api";
import { CommentDto } from "@/entities/comment/infrastructure/dto";
import { BaseError } from "@/shared/libs/errors";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CommentUseCase } from "../usecase/comment.usecase";

export const createUseGetCommentsByPostId = (
  commentUseCase: CommentUseCase
) => {
  return (postId: string): UseQueryResult<CommentDto[], Error> => {
    const useGetCommentsByPostId = useQuery<CommentDto[], Error>({
      queryKey: COMMENT_QUERY_KEY.byPostId(postId),
      queryFn: async () => {
        try {
          return await commentUseCase.getAllComments(postId);
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
    return useGetCommentsByPostId;
  };
};
