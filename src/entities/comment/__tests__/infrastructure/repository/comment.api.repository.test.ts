import { ApiClient } from "@/shared/api/api";
import { Pagination } from "@/shared/types";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Comment } from "../../../core/comment.domain";
import { CommentDto } from "../../../infrastructure/dto";
import { CommentApiRepository } from "../../../infrastructure/repository/comment.api.repository";
import { UserReference } from "../../../types";
import { CommentFixtures } from "../../fixtures/comment.fixtures";

/**
 * Comment API Repository Tests
 * Verify all Comment API repository functionality using Given-When-Then pattern
 */
describe("Comment API Repository", () => {
  let commentApiRepository: CommentApiRepository;
  let mockApiClient: ApiClient;
  let validCommentDto: Required<CommentDto>;
  let validUserReference: UserReference;

  beforeEach(() => {
    // Given: Set up mock API client and repository
    mockApiClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      patch: vi.fn(),
    } as unknown as ApiClient;

    commentApiRepository = new CommentApiRepository(mockApiClient);

    // Set up valid test data
    const commentData = CommentFixtures.valid.basic;
    validUserReference = {
      id: commentData.user.id,
      username: commentData.user.username,
      profileImage: commentData.user.profileImage,
    };

    validCommentDto = {
      id: commentData.id,
      body: commentData.body,
      postId: commentData.postId,
      user: validUserReference,
      likes: commentData.likes,
      createdAt: commentData.createdAt,
      updatedAt: commentData.updatedAt,
    };
  });

  describe("getByPostId", () => {
    it("should return array of Comment domain objects when API call succeeds", async () => {
      // Given: Mock API client returns paginated comment data
      const mockPaginationResponse: Pagination<CommentDto> = {
        data: [
          {
            id: validCommentDto.id,
            body: validCommentDto.body,
            user: validUserReference,
            likes: validCommentDto.likes,
            createdAt: validCommentDto.createdAt,
            updatedAt: validCommentDto.updatedAt,
            postId: "",
          },
        ],
        pagination: {
          total: 1,
          skip: 0,
          limit: 10,
        },
      };
      const mockResponse = {
        data: mockPaginationResponse,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get comments by post ID
      const result = await commentApiRepository.getByPostId("post-123");

      // Then: Should return array of Comment domain objects
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Comment);
      expect(result[0].id).toBe(validCommentDto.id);
      expect(result[0].body).toBe(validCommentDto.body);
      expect(result[0].user).toEqual(validUserReference);
      expect(result[0].postId).toBe("post-123");
      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/posts/post-123/comments"
      );
    });

    it("should call correct API endpoint with post ID", async () => {
      // Given: Mock API client returns valid response
      const mockPaginationResponse: Pagination<CommentDto> = {
        data: [],
        pagination: {
          total: 0,
          skip: 0,
          limit: 10,
        },
      };
      const mockResponse = {
        data: mockPaginationResponse,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get comments for specific post
      await commentApiRepository.getByPostId("post-456");

      // Then: Should call correct endpoint
      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/posts/post-456/comments"
      );
      expect(mockApiClient.get).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when API returns no data", async () => {
      // Given: Mock API client returns null or empty data
      const mockPaginationResponse: Pagination<CommentDto> = {
        data: [],
        pagination: {
          total: 0,
          skip: 0,
          limit: 10,
        },
      };
      const mockResponse = {
        data: mockPaginationResponse,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get comments by post ID
      const result = await commentApiRepository.getByPostId("post-123");

      // Then: Should return empty array
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("should return empty array when API returns empty data array", async () => {
      // Given: Mock API client returns empty data array
      const mockPaginationResponse: Pagination<CommentDto> = {
        data: [],
        pagination: {
          total: 0,
          skip: 0,
          limit: 10,
        },
      };
      const mockResponse = {
        data: mockPaginationResponse,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get comments by post ID
      const result = await commentApiRepository.getByPostId("post-123");

      // Then: Should return empty array
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("should return empty array when API call fails", async () => {
      // Given: Mock API client throws error
      const apiError = new Error("API Error");
      vi.mocked(mockApiClient.get).mockRejectedValue(apiError);

      // When: Get comments by post ID
      const result = await commentApiRepository.getByPostId("post-123");

      // Then: Should return empty array and log error
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("should handle multiple comments in response", async () => {
      // Given: Mock API client returns multiple comments
      const multipleComments = CommentFixtures.multiple.map((fixture) => ({
        id: fixture.id,
        body: fixture.body,
        user: fixture.user,
        postId: fixture.postId,
        likes: fixture.likes,
        createdAt: fixture.createdAt,
        updatedAt: fixture.updatedAt,
      }));
      const mockPaginationResponse: Pagination<CommentDto> = {
        data: multipleComments,
        pagination: {
          total: multipleComments.length,
          skip: 0,
          limit: 10,
        },
      };
      const mockResponse = {
        data: mockPaginationResponse,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get comments by post ID
      const result = await commentApiRepository.getByPostId("post-123");

      // Then: Should return all comments as domain objects
      expect(result).toHaveLength(multipleComments.length);
      result.forEach((comment, index) => {
        expect(comment).toBeInstanceOf(Comment);
        expect(comment.id).toBe(multipleComments[index].id);
        expect(comment.body).toBe(multipleComments[index].body);
        expect(comment.postId).toBe("post-123");
      });
    });

    it("should handle comments with missing optional fields", async () => {
      // Given: Mock API client returns comments with missing optional fields
      const incompleteComment = {
        id: "comment-incomplete",
        body: "Incomplete comment",
        user: validUserReference,
        postId: "post-123",
        likes: 0,
      };
      const mockPaginationResponse: Pagination<CommentDto> = {
        data: [incompleteComment],
        pagination: {
          total: 1,
          skip: 0,
          limit: 10,
        },
      };
      const mockResponse = {
        data: mockPaginationResponse,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get comments by post ID
      const result = await commentApiRepository.getByPostId("post-123");

      // Then: Should handle missing fields with defaults
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Comment);
      expect(result[0].id).toBe("comment-incomplete");
      expect(result[0].body).toBe("Incomplete comment");
      expect(result[0].likes).toBe(0); // Default value
      expect(result[0].createdAt).toBeGreaterThan(0); // Should use current time
      expect(result[0].updatedAt).toBeGreaterThan(0); // Should use current time
    });
  });

  describe("getById", () => {
    it("should return Comment domain object when API call succeeds", async () => {
      // Given: Mock API client returns valid comment data
      const mockResponse = {
        data: {
          id: validCommentDto.id,
          body: validCommentDto.body,
          postId: validCommentDto.postId,
          user: validUserReference,
          likes: validCommentDto.likes,
          createdAt: validCommentDto.createdAt,
          updatedAt: validCommentDto.updatedAt,
        },
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get comment by ID
      const result = await commentApiRepository.getById("comment-123");

      // Then: Should return Comment domain object
      expect(result).toBeInstanceOf(Comment);
      expect(result.id).toBe(validCommentDto.id);
      expect(result.body).toBe(validCommentDto.body);
      expect(result.user).toEqual(validUserReference);
      expect(mockApiClient.get).toHaveBeenCalledWith("/comments/comment-123");
    });

    it("should call correct API endpoint with comment ID", async () => {
      // Given: Mock API client returns valid response
      const mockResponse = {
        data: {
          id: "comment-456",
          body: "Test comment",
          postId: "post-123",
          user: validUserReference,
          likes: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get comment by specific ID
      await commentApiRepository.getById("comment-456");

      // Then: Should call correct endpoint
      expect(mockApiClient.get).toHaveBeenCalledWith("/comments/comment-456");
      expect(mockApiClient.get).toHaveBeenCalledTimes(1);
    });

    it("should throw error when comment is not found", async () => {
      // Given: Mock API client returns null data
      const mockResponse = {
        data: null,
        status: 404,
        statusText: "Not Found",
        ok: false,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When & Then: Should throw error for not found comment
      await expect(
        commentApiRepository.getById("non-existent")
      ).rejects.toThrow("Comment with ID non-existent not found");
    });

    it("should throw error when API call fails", async () => {
      // Given: Mock API client throws error
      const apiError = new Error("API Error");
      vi.mocked(mockApiClient.get).mockRejectedValue(apiError);

      // When & Then: Should throw error (adapter catches and returns null, repository throws not found)
      await expect(commentApiRepository.getById("comment-123")).rejects.toThrow(
        "Comment with ID comment-123 not found"
      );
    });
  });

  describe("create", () => {
    it("should return Comment domain object when creation succeeds", async () => {
      // Given: Mock API client returns created comment data
      const mockResponse = {
        data: validCommentDto,
        status: 201,
        statusText: "Created",
        ok: true,
      };
      vi.mocked(mockApiClient.post).mockResolvedValue(mockResponse);

      const newComment = new Comment(
        "",
        "New comment body",
        validUserReference,
        "post-123",
        0,
        Date.now(),
        Date.now()
      );

      // When: Create comment
      const result = await commentApiRepository.create(newComment);

      // Then: Should return Comment domain object
      expect(result).toBeInstanceOf(Comment);
      expect(result.id).toBe(validCommentDto.id);
      expect(mockApiClient.post).toHaveBeenCalledWith("/comments/add", {
        body: "New comment body",
        postId: "post-123",
        userId: validUserReference.id,
      });
    });

    it("should throw error when creation fails", async () => {
      // Given: Mock API client returns null data
      const mockResponse = {
        data: null,
        status: 400,
        statusText: "Bad Request",
        ok: false,
      };
      vi.mocked(mockApiClient.post).mockResolvedValue(mockResponse);

      const newComment = new Comment(
        "",
        "Failed comment",
        validUserReference,
        "post-123",
        0,
        Date.now(),
        Date.now()
      );

      // When & Then: Should throw error
      await expect(commentApiRepository.create(newComment)).rejects.toThrow(
        "Failed to create comment"
      );
    });

    it("should throw error when API call fails", async () => {
      // Given: Mock API client throws error
      const apiError = new Error("Create API Error");
      vi.mocked(mockApiClient.post).mockRejectedValue(apiError);

      const newComment = new Comment(
        "",
        "Error comment",
        validUserReference,
        "post-123",
        0,
        Date.now(),
        Date.now()
      );

      // When & Then: Should throw error
      await expect(commentApiRepository.create(newComment)).rejects.toThrow(
        "Failed to create comment"
      );
    });
  });

  describe("update", () => {
    it("should return updated Comment domain object when update succeeds", async () => {
      // Given: Mock API client returns updated comment data
      const updatedCommentDto = {
        ...validCommentDto,
        body: "Updated comment body",
        updatedAt: Date.now(),
      };
      const mockResponse = {
        data: updatedCommentDto,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.put).mockResolvedValue(mockResponse);

      const existingComment = new Comment(
        validCommentDto.id,
        "Updated comment body",
        validUserReference,
        validCommentDto.postId,
        validCommentDto.likes,
        validCommentDto.createdAt,
        Date.now()
      );

      // When: Update comment
      const result = await commentApiRepository.update(existingComment);

      // Then: Should return updated Comment domain object
      expect(result).toBeInstanceOf(Comment);
      expect(result.body).toBe("Updated comment body");
      expect(mockApiClient.put).toHaveBeenCalledWith(
        `/comments/${validCommentDto.id}`,
        {
          body: "Updated comment body",
        }
      );
    });

    it("should throw error when update fails", async () => {
      // Given: Mock API client returns null data
      const mockResponse = {
        data: null,
        status: 400,
        statusText: "Bad Request",
        ok: false,
      };
      vi.mocked(mockApiClient.put).mockResolvedValue(mockResponse);

      const existingComment = new Comment(
        validCommentDto.id,
        "Failed update",
        validUserReference,
        validCommentDto.postId,
        validCommentDto.likes,
        validCommentDto.createdAt,
        Date.now()
      );

      // When & Then: Should throw error
      await expect(
        commentApiRepository.update(existingComment)
      ).rejects.toThrow("Failed to update comment");
    });

    it("should throw error when API call fails", async () => {
      // Given: Mock API client throws error
      const apiError = new Error("Update API Error");
      vi.mocked(mockApiClient.put).mockRejectedValue(apiError);

      const existingComment = new Comment(
        validCommentDto.id,
        "Error update",
        validUserReference,
        validCommentDto.postId,
        validCommentDto.likes,
        validCommentDto.createdAt,
        Date.now()
      );

      // When & Then: Should throw error
      await expect(
        commentApiRepository.update(existingComment)
      ).rejects.toThrow("Failed to update comment");
    });
  });

  describe("save", () => {
    it("should create new comment when comment has no ID", async () => {
      // Given: Mock API client returns created comment data
      const createdCommentDto = {
        ...validCommentDto,
        id: "new-comment-id",
      };
      const mockResponse = {
        data: createdCommentDto,
        status: 201,
        statusText: "Created",
        ok: true,
      };
      vi.mocked(mockApiClient.post).mockResolvedValue(mockResponse);

      const newComment = new Comment(
        "",
        "New comment",
        validUserReference,
        "post-123",
        0,
        Date.now(),
        Date.now()
      );

      // When: Save comment
      const result = await commentApiRepository.save(newComment);

      // Then: Should create new comment
      expect(result).toBeInstanceOf(Comment);
      expect(result.id).toBe("new-comment-id");
      expect(mockApiClient.post).toHaveBeenCalledWith("/comments/add", {
        body: "New comment",
        postId: "post-123",
        userId: validUserReference.id,
      });
    });

    it("should update existing comment when comment has ID", async () => {
      // Given: Mock API client returns updated comment data
      const updatedCommentDto = {
        ...validCommentDto,
        body: "Updated via save",
      };
      const mockResponse = {
        data: updatedCommentDto,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.put).mockResolvedValue(mockResponse);

      const existingComment = new Comment(
        validCommentDto.id,
        "Updated via save",
        validUserReference,
        validCommentDto.postId,
        validCommentDto.likes,
        validCommentDto.createdAt,
        Date.now()
      );

      // When: Save comment
      const result = await commentApiRepository.save(existingComment);

      // Then: Should update existing comment
      expect(result).toBeInstanceOf(Comment);
      expect(result.body).toBe("Updated via save");
      expect(mockApiClient.put).toHaveBeenCalledWith(
        `/comments/${validCommentDto.id}`,
        {
          body: "Updated via save",
        }
      );
    });

    it("should throw error when save operation fails", async () => {
      // Given: Mock API client returns null for create
      const mockResponse = {
        data: null,
        status: 400,
        statusText: "Bad Request",
        ok: false,
      };
      vi.mocked(mockApiClient.post).mockResolvedValue(mockResponse);

      const newComment = new Comment(
        "",
        "Failed save",
        validUserReference,
        "post-123",
        0,
        Date.now(),
        Date.now()
      );

      // When & Then: Should throw error
      await expect(commentApiRepository.save(newComment)).rejects.toThrow(
        "Failed to create comment"
      );
    });
  });

  describe("delete", () => {
    it("should return true when deletion succeeds", async () => {
      // Given: Mock API client returns successful response
      const mockResponse = {
        data: { success: true },
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.delete).mockResolvedValue(mockResponse);

      // When: Delete comment
      const result = await commentApiRepository.delete("comment-123");

      // Then: Should return true
      expect(result).toBe(true);
      expect(mockApiClient.delete).toHaveBeenCalledWith(
        "/comments/comment-123"
      );
    });

    it("should return false when deletion fails", async () => {
      // Given: Mock API client throws error
      const apiError = new Error("Delete API Error");
      vi.mocked(mockApiClient.delete).mockRejectedValue(apiError);

      // When: Delete comment
      const result = await commentApiRepository.delete("comment-123");

      // Then: Should return false
      expect(result).toBe(false);
    });

    it("should return false when API returns unsuccessful response", async () => {
      // Given: Mock API client returns unsuccessful response
      const mockResponse = {
        data: { success: false },
        status: 400,
        statusText: "Bad Request",
        ok: false,
      };
      vi.mocked(mockApiClient.delete).mockResolvedValue(mockResponse);

      // When: Delete comment
      const result = await commentApiRepository.delete("comment-123");

      // Then: Should return false
      expect(result).toBe(false);
    });
  });

  describe("like", () => {
    it("should return true when like succeeds", async () => {
      // Given: Mock API client returns successful response
      const mockResponse = {
        data: { success: true },
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.patch).mockResolvedValue(mockResponse);

      // When: Like comment
      const result = await commentApiRepository.like("comment-123", "user-456");

      // Then: Should return true
      expect(result).toBe(true);
      expect(mockApiClient.patch).toHaveBeenCalledWith(
        "/comments/comment-123/like",
        {
          userId: "user-456",
        }
      );
    });

    it("should return false when like fails", async () => {
      // Given: Mock API client throws error
      const apiError = new Error("Like API Error");
      vi.mocked(mockApiClient.patch).mockRejectedValue(apiError);

      // When: Like comment
      const result = await commentApiRepository.like("comment-123", "user-456");

      // Then: Should return false
      expect(result).toBe(false);
    });

    it("should return false when API returns unsuccessful response", async () => {
      // Given: Mock API client returns unsuccessful response
      const mockResponse = {
        data: { success: false },
        status: 400,
        statusText: "Bad Request",
        ok: false,
      };
      vi.mocked(mockApiClient.patch).mockResolvedValue(mockResponse);

      // When: Like comment
      const result = await commentApiRepository.like("comment-123", "user-456");

      // Then: Should return false
      expect(result).toBe(false);
    });
  });

  describe("unlike", () => {
    it("should return true when unlike succeeds", async () => {
      // Given: Mock API client returns successful response
      const mockResponse = {
        data: { success: true },
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.patch).mockResolvedValue(mockResponse);

      // When: Unlike comment
      const result = await commentApiRepository.unlike(
        "comment-123",
        "user-456"
      );

      // Then: Should return true
      expect(result).toBe(true);
      expect(mockApiClient.patch).toHaveBeenCalledWith(
        "/comments/comment-123/unlike",
        {
          userId: "user-456",
        }
      );
    });

    it("should return false when unlike fails", async () => {
      // Given: Mock API client throws error
      const apiError = new Error("Unlike API Error");
      vi.mocked(mockApiClient.patch).mockRejectedValue(apiError);

      // When: Unlike comment
      const result = await commentApiRepository.unlike(
        "comment-123",
        "user-456"
      );

      // Then: Should return false
      expect(result).toBe(false);
    });

    it("should return false when API returns unsuccessful response", async () => {
      // Given: Mock API client returns unsuccessful response
      const mockResponse = {
        data: { success: false },
        status: 400,
        statusText: "Bad Request",
        ok: false,
      };
      vi.mocked(mockApiClient.patch).mockResolvedValue(mockResponse);

      // When: Unlike comment
      const result = await commentApiRepository.unlike(
        "comment-123",
        "user-456"
      );

      // Then: Should return false
      expect(result).toBe(false);
    });
  });

  describe("Error Handling and Logging", () => {
    it("should log errors when API calls fail", async () => {
      // Given: Mock console.error and API client throws error
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const apiError = new Error("API Error");
      vi.mocked(mockApiClient.get).mockRejectedValue(apiError);

      // When: Try to get comments by post ID
      await commentApiRepository.getByPostId("post-123");

      // Then: Should log the error
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching comments for post ID post-123:",
        apiError
      );

      // Cleanup
      consoleSpy.mockRestore();
    });

    it("should log errors when create fails", async () => {
      // Given: Mock console.error and API client throws error
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const apiError = new Error("Create API Error");
      vi.mocked(mockApiClient.post).mockRejectedValue(apiError);

      const newComment = new Comment(
        "",
        "Error comment",
        validUserReference,
        "post-123",
        0,
        Date.now(),
        Date.now()
      );

      // When: Try to create comment
      try {
        await commentApiRepository.create(newComment);
      } catch {
        // Expected to throw
      }

      // Then: Should log the error
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error creating comment:",
        apiError
      );

      // Cleanup
      consoleSpy.mockRestore();
    });
  });

  describe("Integration with Fixtures", () => {
    it("should correctly handle all valid fixture comment data", async () => {
      // Given: All valid fixture data
      const fixtures = [
        CommentFixtures.valid.basic,
        CommentFixtures.valid.withoutUserImage,
        CommentFixtures.valid.popularComment,
        CommentFixtures.valid.maxLengthComment,
        CommentFixtures.valid.minLengthComment,
      ];

      for (const fixture of fixtures) {
        // Given: Mock API client returns fixture data
        const commentData = {
          id: fixture.id,
          body: fixture.body,
          postId: fixture.postId,
          user: fixture.user,
          likes: fixture.likes,
          createdAt: fixture.createdAt,
          updatedAt: fixture.updatedAt,
        };
        const mockResponse = {
          data: commentData,
          status: 200,
          statusText: "OK",
          ok: true,
        };
        vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

        // When: Get comment by ID
        const result = await commentApiRepository.getById(fixture.id);

        // Then: Should return correct Comment domain object
        expect(result).toBeInstanceOf(Comment);
        expect(result.id).toBe(fixture.id);
        expect(result.body).toBe(fixture.body);
        expect(result.user).toEqual(fixture.user);
        expect(result.postId).toBe(fixture.postId);
        expect(result.likes).toBe(fixture.likes);
      }
    });

    it("should correctly handle edge case fixture data", async () => {
      // Given: Edge case fixture data
      const edgeFixtures = [
        CommentFixtures.edge.zeroLikes,
        CommentFixtures.edge.maxLikes,
        CommentFixtures.edge.specialChars,
        CommentFixtures.edge.withEmojis,
        CommentFixtures.edge.sameTimestamps,
      ];

      for (const fixture of edgeFixtures) {
        // Given: Mock API client returns edge case data
        const commentData = {
          id: fixture.id,
          body: fixture.body,
          postId: fixture.postId,
          user: fixture.user,
          likes: fixture.likes,
          createdAt: fixture.createdAt,
          updatedAt: fixture.updatedAt,
        };
        const mockResponse = {
          data: commentData,
          status: 200,
          statusText: "OK",
          ok: true,
        };
        vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

        // When: Get comment by ID
        const result = await commentApiRepository.getById(fixture.id);

        // Then: Should handle edge cases correctly
        expect(result).toBeInstanceOf(Comment);
        expect(result.id).toBe(fixture.id);
        expect(result.body).toBe(fixture.body);
        expect(result.likes).toBe(fixture.likes);
        expect(result.createdAt).toBe(fixture.createdAt);
        expect(result.updatedAt).toBe(fixture.updatedAt);
      }
    });
  });

  describe("Performance and Concurrency", () => {
    it("should handle multiple concurrent API calls", async () => {
      // Given: Mock API client returns valid response
      const mockResponse = {
        data: {
          id: "comment-concurrent",
          body: "Concurrent comment",
          postId: "post-123",
          user: validUserReference,
          likes: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Make multiple concurrent calls
      const promises = Array.from({ length: 5 }, (_, index) =>
        commentApiRepository.getById(`comment-${index}`)
      );
      const results = await Promise.all(promises);

      // Then: Should handle all calls successfully
      expect(results).toHaveLength(5);
      results.forEach((result) => {
        expect(result).toBeInstanceOf(Comment);
        expect(result.id).toBe("comment-concurrent");
      });
      expect(mockApiClient.get).toHaveBeenCalledTimes(5);
    });

    it("should handle mixed success and failure concurrent calls", async () => {
      // Given: Mock API client alternates between success and failure
      let callCount = 0;
      vi.mocked(mockApiClient.get).mockImplementation(() => {
        callCount++;
        if (callCount % 2 === 0) {
          return Promise.reject(new Error("API Error"));
        }
        return Promise.resolve({
          data: {
            id: "comment-success",
            body: "Success comment",
            postId: "post-123",
            user: validUserReference,
            likes: 0,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
          status: 200,
          statusText: "OK",
          ok: true,
        });
      });

      // When: Make multiple concurrent calls
      const promises = Array.from({ length: 4 }, (_, index) =>
        commentApiRepository.getById(`comment-${index}`).catch((error) => error)
      );
      const results = await Promise.all(promises);

      // Then: Should handle mixed results correctly
      expect(results).toHaveLength(4);
      expect(results[0]).toBeInstanceOf(Comment); // Success
      expect(results[1]).toBeInstanceOf(Error); // Failure
      expect(results[2]).toBeInstanceOf(Comment); // Success
      expect(results[3]).toBeInstanceOf(Error); // Failure
    });
  });
});
