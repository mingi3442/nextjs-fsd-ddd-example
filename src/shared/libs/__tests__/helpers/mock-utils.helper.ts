/**
 * Mock 관련 테스트 유틸리티
 */
import { expect } from "vitest";

/**
 * 통합 모킹 헬퍼 함수들
 */
export const MockHelpers = {
  /**
   * 모든 모킹 초기화
   */
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

  /**
   * 모든 모킹 복원
   */
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

  /**
   * 모킹 상태 검증
   */
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
