export const COMMENT_QUERY_KEY = {
  all: () => ["comments"] as const,
  byPostId: (postId: string) => ["comments", "post", postId] as const,
  byId: (id: string) => ["comments", "single", id] as const,
};
