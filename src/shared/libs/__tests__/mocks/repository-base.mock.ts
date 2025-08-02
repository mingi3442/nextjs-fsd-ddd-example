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

export class RepositoryMockFactory {
  static createBasicMock<T>(): MockRepository<T> {
    return {
      findById: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
  }

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

export const RepositoryMockHelpers = {
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

  verifyCallCount: <T>(
    mockRepo: MockRepository<T>,
    method: keyof MockRepository<T>,
    expectedCount: number
  ) => {
    expect(mockRepo[method]).toHaveBeenCalledTimes(expectedCount);
  },

  resetAllMocks: <T>(mockRepo: MockRepository<T>) => {
    Object.values(mockRepo).forEach((mockFn) => {
      if (vi.isMockFunction(mockFn)) {
        mockFn.mockReset();
      }
    });
  },

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
