export interface GetPostsOptions {
  limit?: number;
  skip?: number;
  query?: string;
}

export interface AddPostParams {
  title: string;
  body: string;
  userId: number;
  image?: string;
}

export interface UpdatePostParams {
  id: string;
  title?: string;
  body?: string;
  image?: string;
}

export interface DeletePostParams {
  id: string;
}

export interface PostReactionParams {
  id: string;
  type: "like" | "dislike";
}
