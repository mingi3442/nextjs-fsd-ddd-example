import { Timestamp } from "../../value-objects/timestamp.vo";

/**
 * Timestamp Value Object Tests
 * Verify all Timestamp value object functionality using Given-When-Then pattern
 */
describe("Timestamp Value Object", () => {
  describe("Constructor and Validation", () => {
    it("should create Timestamp instance when provided with valid Date object", () => {
      // Given: Valid Date object
      const validDate = new Date("2023-12-25T10:30:00.000Z");

      // When: Create Timestamp instance
      const timestamp = new Timestamp(validDate);

      // Then: Timestamp instance should be created correctly
      expect(timestamp).toBeInstanceOf(Timestamp);
      expect(timestamp.value).toEqual(validDate);
      expect(timestamp.toDate()).toEqual(validDate);
    });

    it("should create Timestamp instance when provided with valid number timestamp", () => {
      // Given: Valid number timestamp
      const validTimestamp = 1703505000000; // 2023-12-25T10:30:00.000Z

      // When: Create Timestamp instance
      const timestamp = new Timestamp(validTimestamp);

      // Then: Timestamp should be created correctly from number timestamp
      expect(timestamp).toBeInstanceOf(Timestamp);
      expect(timestamp.toNumber()).toBe(validTimestamp);
      expect(timestamp.toDate()).toEqual(new Date(validTimestamp));
    });

    it("should create Timestamp instance with current date when no parameter provided", () => {
      // When: Create Timestamp instance without parameters
      const timestamp = new Timestamp();

      // Then: Timestamp should be created with current time
      expect(timestamp.toDate()).toBeInstanceOf(Date);
      expect(timestamp.toNumber()).toBeTypeOf("number");
      expect(timestamp.toNumber()).toBeGreaterThan(0);
    });

    it("should create Timestamp instance with zero timestamp", () => {
      // Given: Zero timestamp (1970-01-01T00:00:00.000Z)
      const zeroTimestamp = 0;

      // When: Create Timestamp instance
      const timestamp = new Timestamp(zeroTimestamp);

      // Then: Timestamp should be created correctly with zero timestamp
      expect(timestamp.toNumber()).toBe(0);
      expect(timestamp.toDate()).toEqual(new Date(0));
    });

    it("should throw error when creating Timestamp with invalid Date object", () => {
      // Given: Invalid Date object
      const invalidDate = new Date("invalid-date-string");

      // When & Then: Error should occur when creating Timestamp with invalid Date object
      expect(() => {
        new Timestamp(invalidDate);
      }).toThrow("Invalid date format");
    });

    it("should throw error when creating Timestamp with NaN timestamp", () => {
      // Given: NaN timestamp
      const nanTimestamp = NaN;

      // When & Then: Error should occur when creating Timestamp with NaN timestamp
      expect(() => {
        new Timestamp(nanTimestamp);
      }).toThrow("Invalid date format");
    });
  });

  describe("now Static Method", () => {
    it("should create Timestamp instance with current time when now method is called", () => {
      // When: Call now static method
      const timestamp = Timestamp.now();

      // Then: Timestamp should be created with current time
      expect(timestamp).toBeInstanceOf(Timestamp);
      expect(timestamp.toDate()).toBeInstanceOf(Date);
      expect(timestamp.toNumber()).toBeTypeOf("number");
    });

    it("should return Timestamp instance from now method", () => {
      // When: Call now static method
      const timestamp = Timestamp.now();

      // Then: Timestamp instance should be returned
      expect(timestamp).toBeInstanceOf(Timestamp);
      expect(timestamp.toDate()).toBeInstanceOf(Date);
      expect(timestamp.toNumber()).toBeTypeOf("number");
    });
  });

  describe("toDate Method", () => {
    it("should return correct Date object when toDate method is called", () => {
      // Given: Timestamp created with specific Date
      const originalDate = new Date("2023-12-25T08:15:30.500Z");
      const timestamp = new Timestamp(originalDate);

      // When: Call toDate method
      const resultDate = timestamp.toDate();

      // Then: Correct Date object should be returned
      expect(resultDate).toEqual(originalDate);
      expect(resultDate).toBeInstanceOf(Date);
    });

    it("should return new Date instance when toDate method is called", () => {
      // Given: Timestamp instance
      const originalDate = new Date("2023-12-25T08:15:30.500Z");
      const timestamp = new Timestamp(originalDate);

      // When: Call toDate method
      const resultDate = timestamp.toDate();

      // Then: New Date instance should be returned (different reference)
      expect(resultDate).not.toBe(originalDate); // Different reference
      expect(resultDate).toEqual(originalDate); // Same value
    });
  });

  describe("toNumber Method", () => {
    it("should return correct number timestamp when toNumber method is called", () => {
      // Given: Timestamp created with specific number timestamp
      const originalTimestamp = 1703505000000; // 2023-12-25T10:30:00.000Z
      const timestamp = new Timestamp(originalTimestamp);

      // When: Call toNumber method
      const resultNumber = timestamp.toNumber();

      // Then: Correct number timestamp should be returned
      expect(resultNumber).toBe(originalTimestamp);
      expect(resultNumber).toBeTypeOf("number");
    });

    it("should handle Date object input correctly in toNumber method", () => {
      // Given: Timestamp created from Date object
      const date = new Date("2023-12-25T10:30:00.000Z");
      const expectedTimestamp = date.getTime();
      const timestamp = new Timestamp(date);

      // When: Call toNumber method
      const resultNumber = timestamp.toNumber();

      // Then: Should return same number as Date object's getTime() value
      expect(resultNumber).toBe(expectedTimestamp);
    });
  });

  describe("Equality Comparison", () => {
    it("should return true when comparing Timestamp instances with same time", () => {
      // Given: Two Timestamp instances with same time
      const time = 1703505000000;
      const timestamp1 = new Timestamp(time);
      const timestamp2 = new Timestamp(time);

      // When: Compare using equals method
      const isEqual = timestamp1.equals(timestamp2);

      // Then: Value objects with same time should be considered equal
      expect(isEqual).toBe(true);
    });

    it("should return false when comparing Timestamp instances with different times", () => {
      // Given: Two Timestamp instances with different times
      const timestamp1 = new Timestamp(1703505000000); // 2023-12-25T10:30:00.000Z
      const timestamp2 = new Timestamp(1703505060000); // 2023-12-25T10:31:00.000Z

      // When: Compare using equals method
      const isEqual = timestamp1.equals(timestamp2);

      // Then: Value objects with different times should be considered different
      expect(isEqual).toBe(false);
    });

    it("should return false when comparing Timestamp with null", () => {
      // Given: Timestamp instance and null
      const timestamp = new Timestamp(1703505000000);

      // When: Compare with null
      const isEqual = timestamp.equals(null as unknown as Timestamp);

      // Then: Comparison with null should return false
      expect(isEqual).toBe(false);
    });

    it("should return true when comparing same Timestamp instance with itself", () => {
      // Given: Timestamp instance
      const timestamp = new Timestamp(1703505000000);

      // When: Compare with itself
      const isEqual = timestamp.equals(timestamp);

      // Then: Comparison with itself should return true
      expect(isEqual).toBe(true);
    });
  });

  describe("Error Scenarios", () => {
    it("should provide meaningful error message for invalid date", () => {
      // Given: Invalid Date object
      const invalidDate = new Date("not-a-date");

      // When & Then: Meaningful error message should be provided
      expect(() => {
        new Timestamp(invalidDate);
      }).toThrow("Invalid date format");
    });

    it("should handle various invalid inputs consistently", () => {
      // Given: Various invalid inputs
      const invalidInputs = [
        NaN,
        Infinity,
        -Infinity,
        new Date("invalid"),
        new Date(NaN),
      ];

      // When & Then: Same error should occur for all invalid inputs
      invalidInputs.forEach((invalidInput) => {
        expect(() => {
          new Timestamp(invalidInput);
        }).toThrow("Invalid date format");
      });
    });
  });
});
