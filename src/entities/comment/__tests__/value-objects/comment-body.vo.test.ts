import { CommentBody } from "../../value-objects";

/**
 * CommentBody Value Object Tests
 * Verify CommentBody value object core functionality using Given-When-Then pattern
 */
describe("CommentBody Value Object", () => {
  describe("Constructor and Validation", () => {
    it("should create CommentBody instance with valid text", () => {
      // Given: Valid comment body text
      const validText = "This is a valid comment body.";

      // When: Create CommentBody instance
      const commentBody = new CommentBody(validText);

      // Then: CommentBody instance should be created correctly
      expect(commentBody).toBeInstanceOf(CommentBody);
      expect(commentBody.text).toBe(validText);
      expect(commentBody.value).toBe(validText);
    });

    it("should create CommentBody with maximum allowed length", () => {
      // Given: Comment body with exactly 100 characters
      const maxLengthText = "a".repeat(100);

      // When: Create CommentBody instance
      const commentBody = new CommentBody(maxLengthText);

      // Then: CommentBody should be created with maximum length text
      expect(commentBody.text).toBe(maxLengthText);
      expect(commentBody.text.length).toBe(100);
    });

    it("should create CommentBody with minimum valid length", () => {
      // Given: Minimum valid length comment body (1 character)
      const minLengthText = "a";

      // When: Create CommentBody instance
      const commentBody = new CommentBody(minLengthText);

      // Then: CommentBody should be created with minimum length text
      expect(commentBody.text).toBe(minLengthText);
      expect(commentBody.text.length).toBe(1);
    });

    it("should throw error when creating CommentBody with empty string", () => {
      // Given: Empty string
      const emptyText = "";

      // When & Then: Error should occur with empty string
      expect(() => {
        new CommentBody(emptyText);
      }).toThrow("Comment body cannot be empty");
    });

    it("should throw error when creating CommentBody with only whitespace", () => {
      // Given: String with only whitespace
      const whitespaceText = "   \n\t   ";

      // When & Then: Error should occur with only whitespace
      expect(() => {
        new CommentBody(whitespaceText);
      }).toThrow("Comment body cannot be empty");
    });

    it("should throw error when text exceeds maximum length", () => {
      // Given: Comment body exceeding 100 characters
      const tooLongText = "a".repeat(101);

      // When & Then: Error should occur with too long text
      expect(() => {
        new CommentBody(tooLongText);
      }).toThrow("Comment body cannot exceed 100 characters");
    });
  });

  describe("Equality Comparison", () => {
    it("should return true when comparing CommentBody instances with same text", () => {
      // Given: Two CommentBody instances with same text
      const text = "Same comment text";
      const commentBody1 = new CommentBody(text);
      const commentBody2 = new CommentBody(text);

      // When: Compare using equals method
      const isEqual = commentBody1.equals(commentBody2);

      // Then: Value objects with same value should be equal
      expect(isEqual).toBe(true);
    });

    it("should return false when comparing CommentBody instances with different text", () => {
      // Given: Two CommentBody instances with different text
      const commentBody1 = new CommentBody("First comment text");
      const commentBody2 = new CommentBody("Second comment text");

      // When: Compare using equals method
      const isEqual = commentBody1.equals(commentBody2);

      // Then: Value objects with different values should not be equal
      expect(isEqual).toBe(false);
    });

    it("should return false when comparing CommentBody with null", () => {
      // Given: CommentBody instance and null
      const commentBody = new CommentBody("Test comment");

      // When: Compare with null
      const isEqual = commentBody.equals(null as unknown as CommentBody);

      // Then: Comparison with null should return false
      expect(isEqual).toBe(false);
    });

    it("should demonstrate value-based equality rather than reference equality", () => {
      // Given: Two separate CommentBody instances with same text
      const text = "Value-based comparison test";
      const commentBody1 = new CommentBody(text);
      const commentBody2 = new CommentBody(text);

      // When: Perform reference comparison and value comparison
      const referenceEqual = commentBody1 === commentBody2;
      const valueEqual = commentBody1.equals(commentBody2);

      // Then: Reference should be different but value should be same
      expect(referenceEqual).toBe(false);
      expect(valueEqual).toBe(true);
    });
  });
});
