/**
 * Service 레이어 모킹 기본 유틸리티
 * 비즈니스 로직 레이어를 모킹하여 상위 레이어 테스트에 집중
 */

/**
 * 기본 Service 인터페이스
 */
export interface MockService<T = unknown> {
  create: ReturnType<typeof vi.fn> & { mockResolvedValue: (value: T) => void };
  getById: ReturnType<typeof vi.fn> & {
    mockResolvedValue: (value: T | null) => void;
  };
  getAll: ReturnType<typeof vi.fn> & {
    mockResolvedValue: (value: T[]) => void;
  };
  update: ReturnType<typeof vi.fn> & { mockResolvedValue: (value: T) => void };
  delete: ReturnType<typeof vi.fn> & {
    mockResolvedValue: (value: void) => void;
  };
}

/**
 * Service 모킹 팩토리
 */
export class ServiceMockFactory {
  /**
   * 기본 Service 모킹 생성
   */
  static createBasicMock<T>(): MockService<T> {
    return {
      create: vi.fn(),
      getById: vi.fn(),
      getAll: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
  }

  /**
   * 성공 시나리오로 미리 설정된 Service 모킹 생성
   */
  static createSuccessMock<T>(mockData: T, mockList: T[] = []): MockService<T> {
    return {
      create: vi.fn().mockResolvedValue(mockData),
      getById: vi.fn().mockResolvedValue(mockData),
      getAll: vi.fn().mockResolvedValue(mockList),
      update: vi.fn().mockResolvedValue(mockData),
      delete: vi.fn().mockResolvedValue(undefined),
    };
  }

  /**
   * 에러 시나리오로 미리 설정된 Service 모킹 생성
   */
  static createErrorMock<T>(
    error: Error = new Error("Service Error")
  ): MockService<T> {
    return {
      create: vi.fn().mockRejectedValue(error),
      getById: vi.fn().mockRejectedValue(error),
      getAll: vi.fn().mockRejectedValue(error),
      update: vi.fn().mockRejectedValue(error),
      delete: vi.fn().mockRejectedValue(error),
    };
  }

  /**
   * Not Found 시나리오 Service 모킹 생성
   */
  static createNotFoundMock<T>(): MockService<T> {
    return {
      create: vi.fn(),
      getById: vi.fn().mockResolvedValue(null),
      getAll: vi.fn().mockResolvedValue([]),
      update: vi.fn().mockRejectedValue(new Error("Not found")),
      delete: vi.fn().mockRejectedValue(new Error("Not found")),
    };
  }
}

/**
 * Service 모킹 헬퍼 함수들
 */
export const ServiceMockHelpers = {
  /**
   * Service 메서드 호출 검증
   */
  verifyMethodCall: <T>(
    mockService: MockService<T>,
    method: keyof MockService<T>,
    expectedArgs: unknown[],
    callIndex: number = 0
  ) => {
    const mockMethod = mockService[method];
    expect(mockMethod).toHaveBeenCalled();
    expect(mockMethod).toHaveBeenNthCalledWith(callIndex + 1, ...expectedArgs);
  },

  /**
   * Service 메서드 호출 횟수 검증
   */
  verifyCallCount: <T>(
    mockService: MockService<T>,
    method: keyof MockService<T>,
    expectedCount: number
  ) => {
    expect(mockService[method]).toHaveBeenCalledTimes(expectedCount);
  },

  /**
   * 모든 Service 모킹 초기화
   */
  resetAllMocks: <T>(mockService: MockService<T>) => {
    Object.values(mockService).forEach((mockFn) => {
      if (vi.isMockFunction(mockFn)) {
        mockFn.mockReset();
      }
    });
  },

  /**
   * Service 모킹 동작 변경
   */
  changeMockBehavior: <T>(
    mockService: MockService<T>,
    method: keyof MockService<T>,
    newBehavior: (...args: unknown[]) => unknown
  ) => {
    const mockMethod = mockService[method];
    if (vi.isMockFunction(mockMethod)) {
      mockMethod.mockImplementation(newBehavior);
    }
  },

  /**
   * 비동기 Service 메서드 지연 시뮬레이션
   */
  addDelay: <T>(
    mockService: MockService<T>,
    method: keyof MockService<T>,
    delay: number = 100
  ) => {
    const mockMethod = mockService[method];
    if (vi.isMockFunction(mockMethod)) {
      const originalImplementation = mockMethod.getMockImplementation();
      mockMethod.mockImplementation(async (...args: unknown[]) => {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return originalImplementation
          ? originalImplementation(...args)
          : undefined;
      });
    }
  },
};
