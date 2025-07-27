/**
 * 테스트 데이터 생성 유틸리티
 */

/**
 * 테스트 데이터 생성 헬퍼
 */
export const TestDataHelpers = {
  /**
   * 랜덤 ID 생성
   */
  generateId: (prefix: string = "test") =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,

  /**
   * 랜덤 이메일 생성
   */
  generateEmail: (username?: string) => {
    const user = username || `user${Math.random().toString(36).substr(2, 5)}`;
    return `${user}@example.com`;
  },

  /**
   * 랜덤 사용자명 생성
   */
  generateUsername: () => `user${Math.random().toString(36).substr(2, 8)}`,

  /**
   * 현재 시간에서 특정 시간만큼 이전/이후 타임스탬프 생성
   */
  generateTimestamp: (offsetMs: number = 0) => Date.now() + offsetMs,

  /**
   * 배열 생성 헬퍼
   */
  createArray: <T>(length: number, factory: (index: number) => T): T[] => {
    return Array.from({ length }, (_, index) => factory(index));
  },
};
