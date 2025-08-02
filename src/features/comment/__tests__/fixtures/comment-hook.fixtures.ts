import { CommentDto } from "@/entities/comment";

export const mockCommentsData: CommentDto[] = [
  {
    id: "comment-1",
    postId: "post-1",
    user: {
      id: "user-1",
      username: "testuser",
      profileImage: "https://example.com/avatar.jpg",
    },
    body: "Test comment",
    likes: 5,
    createdAt: 1640995200000,
    updatedAt: 1640995200000,
  },
  {
    id: "comment-2",
    postId: "post-1",
    user: {
      id: "user-2",
      username: "commenter",
      profileImage: "https://example.com/commenter.jpg",
    },
    body: "Another test comment",
    likes: 2,
    createdAt: 1640995300000,
    updatedAt: 1640995300000,
  },
];

export const mockSingleComment: CommentDto = {
  id: "comment-1",
  postId: "post-1",
  user: {
    id: "user-1",
    username: "testuser",
    profileImage: "https://example.com/avatar.jpg",
  },
  body: "Single test comment",
  likes: 3,
  createdAt: 1640995200000,
  updatedAt: 1640995200000,
};
