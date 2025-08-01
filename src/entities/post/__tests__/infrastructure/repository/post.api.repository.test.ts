import { ApiClient } from "@/shared/api/api";
import { Pagination } from "@/shared/types";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Post } from "../../../core/post.domain";
import { PostDto } from "../../../infrastructure/dto";
import { PostApiRepository } from "../../../infrastructure/repository/post.api.repository";
import { UserReference } from "../../../types";
import { PostFixtures } from "../../fixtures/post.fixtures";

/**
 * Post API Repository Tests
 * Verify all Post API repository functionality using Given-When-Then pattern
 */
describe("Post API Repository", () => {
  let postApiRepository: PostApiRepository;
  let mockApiClient: ApiClient;
  let validPostDto: PostDto;
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

    postApiRepository = new PostApiRepository(mockApiClient);

    // Set up valid test data
    const postData = PostFixtures.valid.basic;
    validUserReference = {
      id: postData.user.id,
      username: postData.user.username,
      profileImage: postData.user.profileImage,
    };

    validPostDto = {
      id: postData.id,
      user: validUserReference,
      title: postData.title,
      body: postData.body,
      image: postData.image,
      likes: postData.likes,
      totalComments: postData.totalComments,
      createdAt: postData.createdAt,
      updatedAt: postData.updatedAt,
    };
  });

  describe("getAll", () => {
    it("should return array of Post domain objects when API call succeeds", async () => {
      // Given: Mock API client returns paginated post data
      const mockPaginationResponse: Pagination<PostDto> = {
        data: [validPostDto],
        pagination: { total: 1, skip: 0, limit: 10 },
      };
      const mockResponse = {
        data: mockPaginationResponse,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get all posts
      const result = await postApiRepository.getAll(10, 0);

      // Then: Should return array of Post domain objects
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Post);
      expect(result[0].id).toBe(validPostDto.id);
      expect(result[0].title).toBe(validPostDto.title);
      expect(result[0].user).toEqual(validPostDto.user);
      expect(mockApiClient.get).toHaveBeenCalledWith("/posts?limit=10&skip=0");
    });

    it("should call correct API endpoint with pagination parameters", async () => {
      // Given: Mock API client returns valid response
      const mockPaginationResponse: Pagination<PostDto> = {
        data: [validPostDto],
        pagination: { total: 1, skip: 20, limit: 5 },
      };
      const mockResponse = {
        data: mockPaginationResponse,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get posts with specific pagination
      await postApiRepository.getAll(5, 20);

      // Then: Should call correct endpoint with parameters
      expect(mockApiClient.get).toHaveBeenCalledWith("/posts?limit=5&skip=20");
      expect(mockApiClient.get).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when API returns no data", async () => {
      // Given: Mock API client returns null or empty data
      const mockPaginationResponse: Pagination<PostDto> = {
        data: [],
        pagination: { total: 0, skip: 0, limit: 10 },
      };
      const mockResponse = {
        data: mockPaginationResponse,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get all posts
      const result = await postApiRepository.getAll(10, 0);

      // Then: Should return empty array
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("should return empty array when API returns empty data array", async () => {
      // Given: Mock API client returns empty data array
      const mockPaginationResponse: Pagination<PostDto> = {
        data: [],
        pagination: { total: 0, skip: 0, limit: 10 },
      };
      const mockResponse = {
        data: mockPaginationResponse,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get all posts
      const result = await postApiRepository.getAll(10, 0);

      // Then: Should return empty array
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("should return empty array when API call fails", async () => {
      // Given: Mock API client throws error
      const apiError = new Error("API Error");
      vi.mocked(mockApiClient.get).mockRejectedValue(apiError);

      // When: Get all posts
      const result = await postApiRepository.getAll(10, 0);

      // Then: Should return empty array and log error
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("should handle multiple posts in response", async () => {
      // Given: Mock API client returns multiple posts
      const multiplePosts = PostFixtures.multiple.map((fixture) => ({
        id: fixture.id,
        user: fixture.user,
        title: fixture.title,
        body: fixture.body,
        image: fixture.image,
        likes: fixture.likes,
        totalComments: fixture.totalComments,
        createdAt: fixture.createdAt,
        updatedAt: fixture.updatedAt,
      }));
      const mockPaginationResponse: Pagination<PostDto> = {
        data: multiplePosts,
        pagination: { total: multiplePosts.length, skip: 0, limit: 10 },
      };
      const mockResponse = {
        data: mockPaginationResponse,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get all posts
      const result = await postApiRepository.getAll(10, 0);

      // Then: Should return all posts as domain objects
      expect(result).toHaveLength(multiplePosts.length);
      result.forEach((post, index) => {
        expect(post).toBeInstanceOf(Post);
        expect(post.id).toBe(multiplePosts[index].id);
        expect(post.title).toBe(multiplePosts[index].title);
      });
    });
  });

  describe("getById", () => {
    it("should return Post domain object when API call succeeds", async () => {
      // Given: Mock API client returns valid post data
      const mockResponse = {
        data: validPostDto,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get post by ID
      const result = await postApiRepository.getById("post-123");

      // Then: Should return Post domain object
      expect(result).toBeInstanceOf(Post);
      expect(result.id).toBe(validPostDto.id);
      expect(result.title).toBe(validPostDto.title);
      expect(result.user).toEqual(validPostDto.user);
      expect(mockApiClient.get).toHaveBeenCalledWith("/posts/post-123");
    });

    it("should call correct API endpoint with post ID", async () => {
      // Given: Mock API client returns valid response
      const mockResponse = {
        data: validPostDto,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get post by specific ID
      await postApiRepository.getById("post-456");

      // Then: Should call correct endpoint
      expect(mockApiClient.get).toHaveBeenCalledWith("/posts/post-456");
      expect(mockApiClient.get).toHaveBeenCalledTimes(1);
    });

    it("should throw error when post is not found", async () => {
      // Given: Mock API client returns null data
      const mockResponse = {
        data: null,
        status: 404,
        statusText: "Not Found",
        ok: false,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When & Then: Should throw error for not found post
      await expect(postApiRepository.getById("non-existent")).rejects.toThrow(
        "Post with ID non-existent not found"
      );
    });

    it("should throw error when API call fails", async () => {
      // Given: Mock API client throws error
      const apiError = new Error("API Error");
      vi.mocked(mockApiClient.get).mockRejectedValue(apiError);

      // When & Then: Should throw the API error
      await expect(postApiRepository.getById("post-123")).rejects.toThrow(
        "API Error"
      );
    });
  });

  describe("search", () => {
    it("should return array of Post domain objects when search succeeds", async () => {
      // Given: Mock API client returns search results
      const mockPaginationResponse: Pagination<PostDto> = {
        data: [validPostDto],
        pagination: { total: 1, skip: 0, limit: 10 },
      };
      const mockResponse = {
        data: mockPaginationResponse,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Search posts
      const result = await postApiRepository.search("test query");

      // Then: Should return array of Post domain objects
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Post);
      expect(result[0].id).toBe(validPostDto.id);
      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/posts/search?q=test query"
      );
    });

    it("should return empty array when search returns no results", async () => {
      // Given: Mock API client returns empty search results
      const mockPaginationResponse: Pagination<PostDto> = {
        data: [],
        pagination: { total: 0, skip: 0, limit: 10 },
      };
      const mockResponse = {
        data: mockPaginationResponse,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Search posts
      const result = await postApiRepository.search("no results");

      // Then: Should return empty array
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("should return empty array when search API call fails", async () => {
      // Given: Mock API client throws error
      const apiError = new Error("Search API Error");
      vi.mocked(mockApiClient.get).mockRejectedValue(apiError);

      // When: Search posts
      const result = await postApiRepository.search("error query");

      // Then: Should return empty array
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe("create", () => {
    it("should return Post domain object when creation succeeds", async () => {
      // Given: Mock API client returns created post data
      const mockResponse = {
        data: validPostDto,
        status: 201,
        statusText: "Created",
        ok: true,
      };
      vi.mocked(mockApiClient.post).mockResolvedValue(mockResponse);

      const newPost = new Post(
        "",
        validUserReference,
        "New Post Title",
        "New Post Body",
        "https://example.com/image.jpg",
        0,
        0,
        Date.now(),
        Date.now()
      );

      // When: Create post
      const result = await postApiRepository.create(newPost);

      // Then: Should return Post domain object
      expect(result).toBeInstanceOf(Post);
      expect(result?.id).toBe(validPostDto.id);
      expect(mockApiClient.post).toHaveBeenCalledWith("/posts/add", {
        title: "New Post Title",
        body: "New Post Body",
        userId: validUserReference.id,
      });
    });

    it("should return null when creation fails", async () => {
      // Given: Mock API client returns null data
      const mockResponse = {
        data: null,
        status: 400,
        statusText: "Bad Request",
        ok: false,
      };
      vi.mocked(mockApiClient.post).mockResolvedValue(mockResponse);

      const newPost = new Post(
        "",
        validUserReference,
        "Failed Post",
        "Failed Body",
        "",
        0,
        0,
        Date.now(),
        Date.now()
      );

      // When: Create post
      const result = await postApiRepository.create(newPost);

      // Then: Should return null
      expect(result).toBeNull();
    });

    it("should return null when API call fails", async () => {
      // Given: Mock API client throws error
      const apiError = new Error("Create API Error");
      vi.mocked(mockApiClient.post).mockRejectedValue(apiError);

      const newPost = new Post(
        "",
        validUserReference,
        "Error Post",
        "Error Body",
        "",
        0,
        0,
        Date.now(),
        Date.now()
      );

      // When: Create post
      const result = await postApiRepository.create(newPost);

      // Then: Should return null
      expect(result).toBeNull();
    });
  });

  describe("update", () => {
    it("should return updated Post domain object when update succeeds", async () => {
      // Given: Mock API client returns updated post data
      const updatedPostDto = {
        ...validPostDto,
        title: "Updated Title",
        body: "Updated Body",
        updatedAt: Date.now(),
      };
      const mockResponse = {
        data: updatedPostDto,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.put).mockResolvedValue(mockResponse);

      const existingPost = new Post(
        validPostDto.id,
        validUserReference,
        "Updated Title",
        "Updated Body",
        validPostDto.image,
        validPostDto.likes,
        validPostDto.totalComments,
        validPostDto.createdAt,
        Date.now()
      );

      // When: Update post
      const result = await postApiRepository.update(existingPost);

      // Then: Should return updated Post domain object
      expect(result).toBeInstanceOf(Post);
      expect(result?.title).toBe("Updated Title");
      expect(result?.body).toBe("Updated Body");
      expect(mockApiClient.put).toHaveBeenCalledWith(
        `/posts/${validPostDto.id}`,
        {
          title: "Updated Title",
          body: "Updated Body",
        }
      );
    });

    it("should return null when update fails", async () => {
      // Given: Mock API client returns null data
      const mockResponse = {
        data: null,
        status: 400,
        statusText: "Bad Request",
        ok: false,
      };
      vi.mocked(mockApiClient.put).mockResolvedValue(mockResponse);

      const existingPost = new Post(
        validPostDto.id,
        validUserReference,
        "Failed Update",
        "Failed Body",
        validPostDto.image,
        validPostDto.likes,
        validPostDto.totalComments,
        validPostDto.createdAt,
        Date.now()
      );

      // When: Update post
      const result = await postApiRepository.update(existingPost);

      // Then: Should return null
      expect(result).toBeNull();
    });

    it("should return null when API call fails", async () => {
      // Given: Mock API client throws error
      const apiError = new Error("Update API Error");
      vi.mocked(mockApiClient.put).mockRejectedValue(apiError);

      const existingPost = new Post(
        validPostDto.id,
        validUserReference,
        "Error Update",
        "Error Body",
        validPostDto.image,
        validPostDto.likes,
        validPostDto.totalComments,
        validPostDto.createdAt,
        Date.now()
      );

      // When: Update post
      const result = await postApiRepository.update(existingPost);

      // Then: Should return null
      expect(result).toBeNull();
    });
  });

  describe("save", () => {
    it("should create new post when post has no ID", async () => {
      // Given: Mock API client returns created post data
      const createdPostDto = {
        ...validPostDto,
        id: "new-post-id",
      };
      const mockResponse = {
        data: createdPostDto,
        status: 201,
        statusText: "Created",
        ok: true,
      };
      vi.mocked(mockApiClient.post).mockResolvedValue(mockResponse);

      const newPost = new Post(
        "",
        validUserReference,
        "New Post",
        "New Body",
        "",
        0,
        0,
        Date.now(),
        Date.now()
      );

      // When: Save post
      const result = await postApiRepository.save(newPost);

      // Then: Should create new post
      expect(result).toBeInstanceOf(Post);
      expect(result.id).toBe("new-post-id");
      expect(mockApiClient.post).toHaveBeenCalledWith("/posts/add", {
        title: "New Post",
        body: "New Body",
        userId: validUserReference.id,
      });
    });

    it("should update existing post when post has ID", async () => {
      // Given: Mock API client returns updated post data
      const updatedPostDto = {
        ...validPostDto,
        title: "Updated via Save",
        body: "Updated Body via Save",
      };
      const mockResponse = {
        data: updatedPostDto,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.put).mockResolvedValue(mockResponse);

      const existingPost = new Post(
        validPostDto.id,
        validUserReference,
        "Updated via Save",
        "Updated Body via Save",
        validPostDto.image,
        validPostDto.likes,
        validPostDto.totalComments,
        validPostDto.createdAt,
        Date.now()
      );

      // When: Save post
      const result = await postApiRepository.save(existingPost);

      // Then: Should update existing post
      expect(result).toBeInstanceOf(Post);
      expect(result.title).toBe("Updated via Save");
      expect(mockApiClient.put).toHaveBeenCalledWith(
        `/posts/${validPostDto.id}`,
        {
          title: "Updated via Save",
          body: "Updated Body via Save",
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

      const newPost = new Post(
        "",
        validUserReference,
        "Failed Save",
        "Failed Body",
        "",
        0,
        0,
        Date.now(),
        Date.now()
      );

      // When & Then: Should throw error
      await expect(postApiRepository.save(newPost)).rejects.toThrow(
        "Failed to create new post"
      );
    });
  });

  describe("delete", () => {
    it("should return true when deletion succeeds", async () => {
      // Given: Mock API client returns successful response
      const mockResponse = {
        data: { success: true },
        ok: true,
        status: 200,
        statusText: "OK",
      };
      vi.mocked(mockApiClient.delete).mockResolvedValue(mockResponse);

      // When: Delete post
      const result = await postApiRepository.delete("post-123");

      // Then: Should return true
      expect(result).toBe(true);
      expect(mockApiClient.delete).toHaveBeenCalledWith("/posts/post-123");
    });

    it("should return false when deletion fails", async () => {
      // Given: Mock API client throws error
      const apiError = new Error("Delete API Error");
      vi.mocked(mockApiClient.delete).mockRejectedValue(apiError);

      // When: Delete post
      const result = await postApiRepository.delete("post-123");

      // Then: Should return false
      expect(result).toBe(false);
    });
  });

  describe("like", () => {
    it("should return true when like succeeds", async () => {
      // Given: Mock API client returns successful response
      const mockResponse = {
        data: { success: true },
        ok: true,
        status: 200,
        statusText: "OK",
      };
      vi.mocked(mockApiClient.patch).mockResolvedValue(mockResponse);

      // When: Like post
      const result = await postApiRepository.like("post-123", "user-456");

      // Then: Should return true
      expect(result).toBe(true);
      expect(mockApiClient.patch).toHaveBeenCalledWith("/posts/post-123/like", {
        userId: "user-456",
      });
    });

    it("should return false when like fails", async () => {
      // Given: Mock API client throws error
      const apiError = new Error("Like API Error");
      vi.mocked(mockApiClient.patch).mockRejectedValue(apiError);

      // When: Like post
      const result = await postApiRepository.like("post-123", "user-456");

      // Then: Should return false
      expect(result).toBe(false);
    });
  });

  describe("unlike", () => {
    it("should return true when unlike succeeds", async () => {
      // Given: Mock API client returns successful response
      const mockResponse = {
        data: { success: true },
        ok: true,
        status: 200,
        statusText: "OK",
      };
      vi.mocked(mockApiClient.patch).mockResolvedValue(mockResponse);

      // When: Unlike post
      const result = await postApiRepository.unlike("post-123", "user-456");

      // Then: Should return true
      expect(result).toBe(true);
      expect(mockApiClient.patch).toHaveBeenCalledWith(
        "/posts/post-123/unlike",
        {
          userId: "user-456",
        }
      );
    });

    it("should return false when unlike fails", async () => {
      // Given: Mock API client throws error
      const apiError = new Error("Unlike API Error");
      vi.mocked(mockApiClient.patch).mockRejectedValue(apiError);

      // When: Unlike post
      const result = await postApiRepository.unlike("post-123", "user-456");

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

      // When: Try to get all posts
      await postApiRepository.getAll(10, 0);

      // Then: Should log the error
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching post list:",
        apiError
      );

      // Cleanup
      consoleSpy.mockRestore();
    });
  });

  describe("Integration with Fixtures", () => {
    it("should correctly handle all valid fixture post data", async () => {
      // Given: All valid fixture data
      const fixtures = [
        PostFixtures.valid.basic,
        PostFixtures.valid.withoutImage,
        PostFixtures.valid.popularPost,
        PostFixtures.valid.longContent,
      ];

      for (const fixture of fixtures) {
        // Given: Mock API client returns fixture data
        const postDto: PostDto = {
          id: fixture.id,
          user: fixture.user,
          title: fixture.title,
          body: fixture.body,
          image: fixture.image,
          likes: fixture.likes,
          totalComments: fixture.totalComments,
          createdAt: fixture.createdAt,
          updatedAt: fixture.updatedAt,
        };
        const mockResponse = {
          data: postDto,
          status: 200,
          statusText: "OK",
          ok: true,
        };
        vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

        // When: Get post by ID
        const result = await postApiRepository.getById(fixture.id);

        // Then: Should return correct Post domain object
        expect(result).toBeInstanceOf(Post);
        expect(result.id).toBe(fixture.id);
        expect(result.title).toBe(fixture.title);
        expect(result.body).toBe(fixture.body);
        expect(result.user).toEqual(fixture.user);
        expect(result.likes).toBe(fixture.likes);
        expect(result.totalComments).toBe(fixture.totalComments);
      }
    });
  });
});
