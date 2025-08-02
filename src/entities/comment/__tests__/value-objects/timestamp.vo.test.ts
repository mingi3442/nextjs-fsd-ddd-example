import { Timestamp } from "../../value-objects";

/**
 * Timestamp Value Object Tests
 * Verify Timestamp value object core functionality using Given-When-Then pattern
 */
describe("Timestamp Value Object", () => {
  describe("Constructor and Validation", () => {
    it("should create Timestamp instance with valid Date object", () => {
      // Given: Valid Date object
      const validDate = new Date("2023-12-25T10:30:00.000Z");

      // When: Create Timestamp instance
      const timestamp = new Timestamp(validDate);

      // Then: Timestamp instance should be created correctly
      expect(timestamp).toBeInstanceOf(Timestamp);
      expect(timestamp.value).toEqual(validDate);
      expect(timestamp.toDate()).toEqual(validDate);
    });

    it("should create Timestamp instance with valid number timestamp", () => {
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

    it("should throw error when creating Timestamp with invalid Date object", () => {
      // Given: Invalid Date object
      const invalidDate = new Date("invalid-date-string");

      // When & Then: Error should occur with invalid Date object
      expect(() => {
        new Timestamp(invalidDate);
      }).toThrow("Invalid date format");
    });

    it("should throw error when creating Timestamp with NaN timestamp", () => {
      // Given: NaN timestamp
      const nanTimestamp = NaN;

      // When & Then: Error should occur with NaN timestamp
      expect(() => {
        new Timestamp(nanTimestamp);
      }).toThrow("Invalid date format");
    });
  });

  describe("Static Methods", () => {
    it("should create Timestamp instance with current time when now method is called", () => {
      // When: Call now static method
      const timestamp = Timestamp.now();

      // Then: Timestamp should be created with current time
      expect(timestamp).toBeInstanceOf(Timestamp);
      expect(timestamp.toDate()).toBeInstanceOf(Date);
      expect(timestamp.toNumber()).toBeTypeOf("number");
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

      // Then: Value objects with same time should be equal
      expect(isEqual).toBe(true);
    });

    it("should return false when comparing Timestamp instances with different times", () => {
      // Given: Two Timestamp instances with different times
      const timestamp1 = new Timestamp(1703505000000); // 2023-12-25T10:30:00.000Z
      const timestamp2 = new Timestamp(1703505060000); // 2023-12-25T10:31:00.000Z

      // When: Compare using equals method
      const isEqual = timestamp1.equals(timestamp2);

      // Then: Value objects with different times should not be equal
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
  });
});
