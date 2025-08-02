import { ErrorMessages, HttpMocks, HttpStatus } from "@/shared/libs/__tests__";
import { PostEntity } from "../../types";

export const PostApiMocks = {
  getPost: (post: PostEntity) => HttpMocks.get(post),

  getPosts: (posts: PostEntity[]) => HttpMocks.get(posts),

  createPost: (post: PostEntity) => HttpMocks.post(post, HttpStatus.CREATED),
  updatePost: (post: PostEntity) => HttpMocks.put(post),

  deletePost: () => HttpMocks.delete(),
  getPostsByUser: (posts: PostEntity[]) => HttpMocks.get(posts),

  getPopularPosts: (posts: PostEntity[]) => HttpMocks.get(posts),
  searchPosts: (posts: PostEntity[]) => HttpMocks.get(posts),

  likePost: (post: PostEntity) =>
    HttpMocks.put({ ...post, likes: post.likes + 1 }),

  unlikePost: (post: PostEntity) =>
    HttpMocks.put({ ...post, likes: Math.max(0, post.likes - 1) }),

  errors: {
    notFound: () =>
      HttpMocks.error(ErrorMessages.NOT_FOUND, HttpStatus.NOT_FOUND),

    unauthorized: () =>
      HttpMocks.error(ErrorMessages.UNAUTHORIZED, HttpStatus.UNAUTHORIZED),

    forbidden: () =>
      HttpMocks.error(ErrorMessages.FORBIDDEN, HttpStatus.FORBIDDEN),

    badRequest: () =>
      HttpMocks.error(ErrorMessages.BAD_REQUEST, HttpStatus.BAD_REQUEST),

    validation: () =>
      HttpMocks.error("Invalid post data", HttpStatus.UNPROCESSABLE_ENTITY),

    serverError: () =>
      HttpMocks.error(
        ErrorMessages.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      ),

    networkError: () => HttpMocks.networkError(),

    timeout: () => HttpMocks.timeoutError(),
  },
};
