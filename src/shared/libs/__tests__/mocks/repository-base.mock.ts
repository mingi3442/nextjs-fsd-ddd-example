/**
 * Repository 레이어 모킹 기본 유틸리티
 * 데이터 액세스 레이어를 모킹하여 비즈니스 로직 테스트에 집중
 */

/**
 * 기본 Repository 인터페이스 (CRUD 작업)
 */
export interface MockRepository<T = unknown> {
  findById: ReturnType<typeof vi.fn> & {
    mockResolvedValue: (value: T | null) => void;
  };
  findAll: ReturnType<typeof vi.fn> & {
    mockResolvedValue: (value: T[]) => void;
  };
  save: ReturnType<typeof vi.fn> & { mockResolvedValue: (value: T) => void };
  update: ReturnType<typeof vi.fn> & { mockResolvedValue: (value: T) => void };
  delete: ReturnType<typeof vi.fn> & {
    mockResolvedValue: (value: void) => void;
  };
}

/**
 * Repository 모킹 팩토리
 */
export class RepositoryMockFactory {
  /**
   * 기본 CRUD Repository 모킹 생성
   */
  static createBasicMock<T>(): MockRepository<T> {
    return {
      findById: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
  }

  /**
   * 성공 시나리오로 미리 설정된 Repository 모킹 생성
   */
  static createSuccessMock<T>(
    mockData: T,
    mockList: T[] = []
  ): MockRepository<T> {
    return {
      findById: vi.fn().mockResolvedValue(mockData),
      findAll: vi.fn().mockResolvedValue(mockList),
      save: vi.fn().mockResolvedValue(mockData),
      update: vi.fn().mockResolvedValue(mockData),
      delete: vi.fn().mockResolvedValue(undefined),
    };
  }

  /**
   * 에러 시나리오로 미리 설정된 Repository 모킹 생성
   */
  static createErrorMock<T>(
    error: Error = new Error("Repository Error")
  ): MockRepository<T> {
    return {
      findById: vi.fn().mockRejectedValue(error),
      findAll: vi.fn().mockRejectedValue(error),
      save: vi.fn().mockRejectedValue(error),
      update: vi.fn().mockRejectedValue(error),
      delete: vi.fn().mockRejectedValue(error),
    };
  }

  /**
   * Not Found 시나리오 Repository 모킹 생성
   */
  static createNotFoundMock<T>(): MockRepository<T> {
    return {
      findById: vi.fn().mockResolvedValue(null),
      findAll: vi.fn().mockResolvedValue([]),
      save: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
  }
}

/**
 * Repository 모킹 헬퍼 함수들
 */
export const RepositoryMockHelpers = {
  /**
   * Repository 메서드 호출 검증
   */
  verifyMethodCall: <T>(
    mockRepo: MockRepository<T>,
    method: keyof MockRepository<T>,
    expectedArgs: unknown[],
    callIndex: number = 0
  ) => {
    const mockMethod = mockRepo[method];
    expect(mockMethod).toHaveBeenCalled();
    expect(mockMethod).toHaveBeenNthCalledWith(callIndex + 1, ...expectedArgs);
  },

  /**
   * Repository 메서드 호출 횟수 검증
   */
  verifyCallCount: <T>(
    mockRepo: MockRepository<T>,
    method: keyof MockRepository<T>,
    expectedCount: number
  ) => {
    expect(mockRepo[method]).toHaveBeenCalledTimes(expectedCount);
  },

  /**
   * 모든 Repository 모킹 초기화
   */
  resetAllMocks: <T>(mockRepo: MockRepository<T>) => {
    Object.values(mockRepo).forEach((mockFn) => {
      if (vi.isMockFunction(mockFn)) {
        mockFn.mockReset();
      }
    });
  },

  /**
   * Repository 모킹 동작 변경
   */
  changeMockBehavior: <T>(
    mockRepo: MockRepository<T>,
    method: keyof MockRepository<T>,
    newBehavior: (...args: unknown[]) => unknown
  ) => {
    const mockMethod = mockRepo[method];
    if (vi.isMockFunction(mockMethod)) {
      mockMethod.mockImplementation(newBehavior);
    }
  },
};
