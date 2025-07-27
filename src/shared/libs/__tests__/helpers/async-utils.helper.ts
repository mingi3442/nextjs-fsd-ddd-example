/**
 * 비동기 테스트 유틸리티
 */

/**
 * 비동기 테스트 헬퍼
 */
export const AsyncTestHelpers = {
  /**
   * 지연 실행
   */
  delay: (ms: number = 100) =>
    new Promise((resolve) => setTimeout(resolve, ms)),

  /**
   * Promise 래핑
   */
  wrapPromise: <T>(value: T, delay: number = 0): Promise<T> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(value), delay);
    });
  },

  /**
   * Promise 에러 래핑
   */
  wrapError: (error: Error, delay: number = 0): Promise<never> => {
    return new Promise((_, reject) => {
      setTimeout(() => reject(error), delay);
    });
  },
};
