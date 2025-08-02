import { expect } from "vitest";

export const MockHelpers = {
  resetAll: (...mocks: unknown[]) => {
    mocks.forEach((mock) => {
      if (typeof mock === "object" && mock !== null) {
        Object.values(mock).forEach((mockFn) => {
          if (typeof mockFn === "function" && "mockReset" in mockFn) {
            (mockFn as { mockReset: () => void }).mockReset();
          }
        });
      }
    });
  },

  restoreAll: (...mocks: unknown[]) => {
    mocks.forEach((mock) => {
      if (typeof mock === "object" && mock !== null) {
        Object.values(mock).forEach((mockFn) => {
          if (typeof mockFn === "function" && "mockRestore" in mockFn) {
            (mockFn as { mockRestore: () => void }).mockRestore();
          }
        });
      }
    });
  },

  verifyMockState: (
    mock: Record<string, unknown>,
    expectedCalls: Record<string, number>
  ) => {
    for (const [method, expectedCount] of Object.entries(expectedCalls)) {
      const mockMethod = mock[method];
      if (
        mockMethod &&
        typeof mockMethod === "object" &&
        mockMethod !== null &&
        "toHaveBeenCalledTimes" in mockMethod &&
        typeof (mockMethod as { toHaveBeenCalledTimes: unknown })
          .toHaveBeenCalledTimes === "function"
      ) {
        expect(mockMethod).toHaveBeenCalledTimes(expectedCount);
      }
    }
  },
};
