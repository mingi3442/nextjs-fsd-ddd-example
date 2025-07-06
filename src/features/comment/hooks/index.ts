import { commentUseCase } from "../services";
import { createCommentHooks } from "./comment.hooks.factory";

export const { useGetCommentsByPostId } = createCommentHooks(commentUseCase);
