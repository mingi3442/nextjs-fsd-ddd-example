export const POST_QUERY_KEYS = {
  all: ["posts"] as const,
  list: (params: { limit?: number; skip?: number }) =>
    ["posts", "list", params] as const,
  search: (query: string) => ["posts", "search", query] as const,
  detail: (id: string) => ["post", id] as const,
};
