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

export class ServiceMockFactory {
  static createBasicMock<T>(): MockService<T> {
    return {
      create: vi.fn(),
      getById: vi.fn(),
      getAll: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
  }

  static createSuccessMock<T>(mockData: T, mockList: T[] = []): MockService<T> {
    return {
      create: vi.fn().mockResolvedValue(mockData),
      getById: vi.fn().mockResolvedValue(mockData),
      getAll: vi.fn().mockResolvedValue(mockList),
      update: vi.fn().mockResolvedValue(mockData),
      delete: vi.fn().mockResolvedValue(undefined),
    };
  }

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

export const ServiceMockHelpers = {
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

  verifyCallCount: <T>(
    mockService: MockService<T>,
    method: keyof MockService<T>,
    expectedCount: number
  ) => {
    expect(mockService[method]).toHaveBeenCalledTimes(expectedCount);
  },

  resetAllMocks: <T>(mockService: MockService<T>) => {
    Object.values(mockService).forEach((mockFn) => {
      if (vi.isMockFunction(mockFn)) {
        mockFn.mockReset();
      }
    });
  },

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
