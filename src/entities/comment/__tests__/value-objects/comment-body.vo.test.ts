import { CommentBody } from "../../value-objects";

/**
 * CommentBody Value Object Tests
 * Verify all CommentBody value object functionality using Given-When-Then pattern
 */
describe("CommentBody Value Object", () => {
  describe("Constructor and Validation", () => {
    it("should create CommentBody instance when provided with valid text", () => {
      // Given: Valid comment body text
      const validText = "This is a valid comment body.";

      // When: Create CommentBody instance
      const commentBody = new CommentBody(validText);

      // Then: CommentBody instance should be created correctly
      expect(commentBody).toBeInstanceOf(CommentBody);
      expect(commentBody.text).toBe(validText);
      expect(commentBody.value).toBe(validText);
    });

    it("should create CommentBody instance with maximum allowed length text", () => {
      // Given: Comment body with exactly 100 characters
      const maxLengthText = "a".repeat(100);

      // When: Create CommentBody instance
      const commentBody = new CommentBody(maxLengthText);

      // Then: CommentBody should be created correctly with maximum length text
      expect(commentBody.text).toBe(maxLengthText);
      expect(commentBody.text.length).toBe(100);
    });

    it("should create CommentBody instance with minimum valid length text", () => {
      // Given: Minimum valid length comment body (1 character)
      const minLengthText = "a";

      // When: Create CommentBody instance
      const commentBody = new CommentBody(minLengthText);

      // Then: CommentBody should be created correctly with minimum length text
      expect(commentBody.text).toBe(minLengthText);
      expect(commentBody.text.length).toBe(1);
    });

    it("should create CommentBody instance with text containing special characters", () => {
      // Given: Comment body with special characters
      const specialCharText = "Comment with special chars: @#$%^&*()!";

      // When: Create CommentBody instance
      const commentBody = new CommentBody(specialCharText);

      // Then: CommentBody should be created correctly with special characters
      expect(commentBody.text).toBe(specialCharText);
    });

    it("should create CommentBody instance with text containing emojis", () => {
      // Given: Comment body with emojis
      const emojiText = "Great post! 👍😊🎉";

      // When: Create CommentBody instance
      const commentBody = new CommentBody(emojiText);

      // Then: CommentBody should be created correctly with emojis
      expect(commentBody.text).toBe(emojiText);
    });

    it("should create CommentBody instance with text containing line breaks", () => {
      // Given: Comment body with line breaks
      const multiLineText = "First line\nSecond line\nThird line";

      // When: Create CommentBody instance
      const commentBody = new CommentBody(multiLineText);

      // Then: CommentBody should be created correctly with line breaks
      expect(commentBody.text).toBe(multiLineText);
    });

    it("should throw error when creating CommentBody with empty string", () => {
      // Given: Empty string
      const emptyText = "";

      // When & Then: Error should occur when creating CommentBody with empty string
      expect(() => {
        new CommentBody(emptyText);
      }).toThrow("Comment body cannot be empty");
    });

    it("should throw error when creating CommentBody with only whitespace", () => {
      // Given: String with only whitespace
      const whitespaceText = "   \n\t   ";

      // When & Then: Error should occur when creating CommentBody with only whitespace
      expect(() => {
        new CommentBody(whitespaceText);
      }).toThrow("Comment body cannot be empty");
    });

    it("should throw error when creating CommentBody with text exceeding maximum length", () => {
      // Given: Comment body exceeding 100 characters
      const tooLongText = "a".repeat(101);

      // When & Then: Error should occur when creating CommentBody with too long text
      expect(() => {
        new CommentBody(tooLongText);
      }).toThrow("Comment body cannot exceed 100 characters");
    });

    it("should throw error when creating CommentBody with significantly long text", () => {
      // Given: Very long comment body (200 characters)
      const veryLongText = "a".repeat(200);

      // When & Then: Error should occur when creating CommentBody with very long text
      expect(() => {
        new CommentBody(veryLongText);
      }).toThrow("Comment body cannot exceed 100 characters");
    });
  });

  describe("Immutability", () => {
    it("should be immutable after creation", () => {
      // Given: CommentBody created with valid comment body
      const originalText = "Original comment text";
      const commentBody = new CommentBody(originalText);

      // When: Access internal value and attempt to modify
      const internalValue = commentBody.value;

      // Then: Internal value should not be changed (automatically immutable for primitive types)
      expect(commentBody.text).toBe(originalText);
      expect(commentBody.value).toBe(originalText);
      expect(internalValue).toBe(originalText);
    });

    it("should maintain immutability when accessed multiple times", () => {
      // Given: CommentBody instance
      const text = "Immutable comment text";
      const commentBody = new CommentBody(text);

      // When: Access value multiple times
      const firstAccess = commentBody.text;
      const secondAccess = commentBody.value;
      const thirdAccess = commentBody.text;

      // Then: Same value should be returned for all accesses
      expect(firstAccess).toBe(text);
      expect(secondAccess).toBe(text);
      expect(thirdAccess).toBe(text);
      expect(firstAccess).toBe(secondAccess);
      expect(secondAccess).toBe(thirdAccess);
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

      // Then: Value objects with same value should be considered equal
      expect(isEqual).toBe(true);
    });

    it("should return false when comparing CommentBody instances with different text", () => {
      // Given: Two CommentBody instances with different text
      const commentBody1 = new CommentBody("First comment text");
      const commentBody2 = new CommentBody("Second comment text");

      // When: Compare using equals method
      const isEqual = commentBody1.equals(commentBody2);

      // Then: Value objects with different values should be considered different
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

    it("should return false when comparing CommentBody with undefined", () => {
      // Given: CommentBody instance and undefined
      const commentBody = new CommentBody("Test comment");

      // When: Compare with undefined
      const isEqual = commentBody.equals(undefined as unknown as CommentBody);

      // Then: Comparison with undefined should return false
      expect(isEqual).toBe(false);
    });

    it("should return true when comparing same CommentBody instance with itself", () => {
      // Given: CommentBody instance
      const commentBody = new CommentBody("Self comparison test");

      // When: Compare with itself
      const isEqual = commentBody.equals(commentBody);

      // Then: Comparison with itself should return true
      expect(isEqual).toBe(true);
    });

    it("should handle case-sensitive comparison correctly", () => {
      // Given: Two CommentBody instances with different case
      const commentBody1 = new CommentBody("Test Comment");
      const commentBody2 = new CommentBody("test comment");

      // When: Compare using equals method
      const isEqual = commentBody1.equals(commentBody2);

      // Then: Different case should be considered different values
      expect(isEqual).toBe(false);
    });

    it("should handle whitespace differences in comparison", () => {
      // Given: Two CommentBody instances with different whitespace
      const commentBody1 = new CommentBody("Test comment");
      const commentBody2 = new CommentBody("Test  comment"); // 2 spaces

      // When: Compare using equals method
      const isEqual = commentBody1.equals(commentBody2);

      // Then: Different whitespace should be considered different values
      expect(isEqual).toBe(false);
    });
  });

  describe("Value-based Comparison", () => {
    it("should demonstrate value-based equality rather than reference equality", () => {
      // Given: Two separate CommentBody instances with same text
      const text = "Value-based comparison test";
      const commentBody1 = new CommentBody(text);
      const commentBody2 = new CommentBody(text);

      // When: Perform reference comparison and value comparison
      const referenceEqual = commentBody1 === commentBody2;
      const valueEqual = commentBody1.equals(commentBody2);

      // Then: Reference should be different but value should be same
      expect(referenceEqual).toBe(false); // Different object reference
      expect(valueEqual).toBe(true); // Same value
    });

    it("should maintain consistent equality across multiple comparisons", () => {
      // Given: Multiple CommentBody instances with same text
      const text = "Consistent equality test";
      const commentBody1 = new CommentBody(text);
      const commentBody2 = new CommentBody(text);
      const commentBody3 = new CommentBody(text);

      // When: Compare in multiple combinations
      const comparison1 = commentBody1.equals(commentBody2);
      const comparison2 = commentBody2.equals(commentBody3);
      const comparison3 = commentBody1.equals(commentBody3);

      // Then: All comparisons should return consistent results
      expect(comparison1).toBe(true);
      expect(comparison2).toBe(true);
      expect(comparison3).toBe(true);
    });
  });

  describe("Text Getter Method", () => {
    it("should return correct text when text getter is called", () => {
      // Given: CommentBody created with specific text
      const originalText = "Test comment body text";
      const commentBody = new CommentBody(originalText);

      // When: Call text getter
      const retrievedText = commentBody.text;

      // Then: Original text should be returned exactly
      expect(retrievedText).toBe(originalText);
    });

    it("should return same text as value property", () => {
      // Given: CommentBody instance
      const text = "Consistency test text";
      const commentBody = new CommentBody(text);

      // When: Access text getter and value property
      const textFromGetter = commentBody.text;
      const textFromValue = commentBody.value;

      // Then: Both access methods should return same value
      expect(textFromGetter).toBe(textFromValue);
      expect(textFromGetter).toBe(text);
    });

    it("should handle special characters in text getter", () => {
      // Given: CommentBody created with special characters
      const specialText = "Special chars: !@#$%^&*()_+-=[]{}|;':\",./<>?";
      const commentBody = new CommentBody(specialText);

      // When: Call text getter
      const retrievedText = commentBody.text;

      // Then: Special characters should be returned as is
      expect(retrievedText).toBe(specialText);
    });

    it("should handle unicode characters in text getter", () => {
      // Given: CommentBody created with unicode characters
      const unicodeText = "Unicode test: 한글, 中文, 日本語, العربية, русский";
      const commentBody = new CommentBody(unicodeText);

      // When: Call text getter
      const retrievedText = commentBody.text;

      // Then: Unicode characters should be returned as is
      expect(retrievedText).toBe(unicodeText);
    });
  });

  describe("Domain Rules Enforcement", () => {
    it("should enforce maximum length domain rule consistently", () => {
      // Given: Boundary values (99, 100, 101 characters)
      const validText99 = "a".repeat(99);
      const validText100 = "a".repeat(100);
      const invalidText101 = "a".repeat(101);

      // When & Then: 99 and 100 characters should succeed, 101 should fail
      expect(() => new CommentBody(validText99)).not.toThrow();
      expect(() => new CommentBody(validText100)).not.toThrow();
      expect(() => new CommentBody(invalidText101)).toThrow(
        "Comment body cannot exceed 100 characters"
      );
    });

    it("should enforce non-empty domain rule with various empty inputs", () => {
      // Given: Various forms of empty inputs
      const emptyInputs = ["", " ", "  ", "\n", "\t", "\r", "   \n\t\r   "];

      // When & Then: All empty inputs should throw error
      emptyInputs.forEach((emptyInput) => {
        expect(() => {
          new CommentBody(emptyInput);
        }).toThrow("Comment body cannot be empty");
      });
    });

    it("should allow valid text that meets all domain rules", () => {
      // Given: Various valid texts that satisfy domain rules
      const validTexts = [
        "a", // Minimum length
        "Valid comment text", // Regular text
        "Text with numbers 123", // With numbers
        "Text with symbols !@#", // With symbols
        "Text with émojis 😊", // With emojis
        "a".repeat(100), // Maximum length
      ];

      // When & Then: All valid texts should create CommentBody successfully
      validTexts.forEach((validText) => {
        expect(() => {
          const commentBody = new CommentBody(validText);
          expect(commentBody.text).toBe(validText);
        }).not.toThrow();
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle text with only numbers", () => {
      // Given: Text with only numbers
      const numericText = "1234567890";

      // When: Create CommentBody instance
      const commentBody = new CommentBody(numericText);

      // Then: Numeric text should be handled correctly
      expect(commentBody.text).toBe(numericText);
    });

    it("should handle text with mixed languages", () => {
      // Given: Text with multiple languages
      const mixedLanguageText = "Hello 안녕하세요 こんにちは";

      // When: Create CommentBody instance
      const commentBody = new CommentBody(mixedLanguageText);

      // Then: Multi-language text should be handled correctly
      expect(commentBody.text).toBe(mixedLanguageText);
    });

    it("should handle text at exact boundary length", () => {
      // Given: Texts at exact boundary values
      const boundaryTexts = [
        "a".repeat(1), // Minimum valid length
        "a".repeat(50), // Middle length
        "a".repeat(99), // Maximum length - 1
        "a".repeat(100), // Exactly maximum length
      ];

      // When & Then: All boundary value texts should be handled correctly
      boundaryTexts.forEach((text) => {
        const commentBody = new CommentBody(text);
        expect(commentBody.text).toBe(text);
        expect(commentBody.text.length).toBe(text.length);
      });
    });

    it("should handle text with repeated characters", () => {
      // Given: Text with repeated characters
      const repeatedCharText = "aaaaaaaaaa"; // 10 'a's

      // When: Create CommentBody instance
      const commentBody = new CommentBody(repeatedCharText);

      // Then: Repeated character text should be handled correctly
      expect(commentBody.text).toBe(repeatedCharText);
      expect(commentBody.text.length).toBe(10);
    });

    it("should handle text with escape sequences", () => {
      // Given: Text with escape sequences
      const escapeText = "Text with \\n \\t \\r escape sequences";

      // When: Create CommentBody instance
      const commentBody = new CommentBody(escapeText);

      // Then: Text with escape sequences should be handled correctly
      expect(commentBody.text).toBe(escapeText);
    });
  });
});
