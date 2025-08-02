export interface MockResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface MockErrorResponse {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, unknown>;
}

export class ApiMockUtils {
  static createSuccessResponse<T>(
    data: T,
    status: number = 200,
    statusText: string = "OK"
  ): MockResponse<T> {
    return {
      data,
      status,
      statusText,
      headers: {
        "content-type": "application/json",
        "x-request-id": `mock-${Date.now()}`,
      },
    };
  }

  static createErrorResponse(
    message: string,
    status: number = 500,
    code?: string,
    details?: Record<string, unknown>
  ): MockErrorResponse {
    return {
      message,
      status,
      code,
      details,
    };
  }

  static createNetworkError(
    message: string = "Network Error"
  ): Error & { code: string; isNetworkError: boolean } {
    const error = new Error(message) as Error & {
      code: string;
      isNetworkError: boolean;
    };
    error.code = "NETWORK_ERROR";
    error.isNetworkError = true;
    return error;
  }

  static createTimeoutError(
    message: string = "Request Timeout"
  ): Error & { code: string; timeout: boolean } {
    const error = new Error(message) as Error & {
      code: string;
      timeout: boolean;
    };
    error.code = "TIMEOUT";
    error.timeout = true;
    return error;
  }

  static createDelayedResponse<T>(
    data: T,
    delay: number = 100
  ): Promise<MockResponse<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ApiMockUtils.createSuccessResponse(data));
      }, delay);
    });
  }

  static createDelayedError(
    error: MockErrorResponse,
    delay: number = 100
  ): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        const errorObj = new Error(error.message) as Error & {
          status: number;
          code?: string;
        };
        errorObj.status = error.status;
        errorObj.code = error.code;
        reject(errorObj);
      }, delay);
    });
  }
}

export const HttpMocks = {
  get: <T>(data: T, status: number = 200) => {
    return vi
      .fn()
      .mockResolvedValue(ApiMockUtils.createSuccessResponse(data, status));
  },

  post: <T>(data: T, status: number = 201) => {
    return vi
      .fn()
      .mockResolvedValue(ApiMockUtils.createSuccessResponse(data, status));
  },

  put: <T>(data: T, status: number = 200) => {
    return vi
      .fn()
      .mockResolvedValue(ApiMockUtils.createSuccessResponse(data, status));
  },

  delete: (status: number = 204) => {
    return vi
      .fn()
      .mockResolvedValue(
        ApiMockUtils.createSuccessResponse(null, status, "No Content")
      );
  },

  error: (message: string, status: number = 500, code?: string) => {
    const error = new Error(message) as Error & {
      status: number;
      code?: string;
    };
    error.status = status;
    error.code = code;
    return vi.fn().mockRejectedValue(error);
  },

  networkError: (message: string = "Network Error") => {
    return vi.fn().mockRejectedValue(ApiMockUtils.createNetworkError(message));
  },

  timeoutError: (message: string = "Request Timeout") => {
    return vi.fn().mockRejectedValue(ApiMockUtils.createTimeoutError(message));
  },
};

export const PaginationMocks = {
  createPaginatedResponse: <T>(
    items: T[],
    page: number = 1,
    limit: number = 10,
    total?: number
  ) => {
    const actualTotal = total ?? items.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = items.slice(startIndex, endIndex);

    return {
      data: paginatedItems,
      pagination: {
        page,
        limit,
        total: actualTotal,
        totalPages: Math.ceil(actualTotal / limit),
        hasNext: page * limit < actualTotal,
        hasPrev: page > 1,
      },
    };
  },

  createEmptyPage: (page: number = 1, limit: number = 10) => {
    return PaginationMocks.createPaginatedResponse([], page, limit, 0);
  },
};

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const ErrorMessages = {
  NETWORK_ERROR: "Network connection failed",
  TIMEOUT: "Request timeout",
  NOT_FOUND: "Resource not found",
  UNAUTHORIZED: "Authentication required",
  FORBIDDEN: "Access denied",
  BAD_REQUEST: "Invalid request data",
  INTERNAL_ERROR: "Internal server error",
  SERVICE_UNAVAILABLE: "Service temporarily unavailable",
} as const;
