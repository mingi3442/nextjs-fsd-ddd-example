/**
 * API 모킹 공통 유틸리티
 * HTTP 요청/응답을 모킹하여 네트워크 의존성 없이 테스트 가능
 */

/**
 * HTTP 응답 모킹 타입 정의
 */
export interface MockResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * API 에러 응답 타입 정의
 */
export interface MockErrorResponse {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * 기본 API 모킹 유틸리티
 */
export class ApiMockUtils {
  /**
   * 성공 응답 생성
   */
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

  /**
   * 에러 응답 생성
   */
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

  /**
   * 네트워크 에러 생성
   */
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

  /**
   * 타임아웃 에러 생성
   */
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

  /**
   * 지연된 응답 생성 (비동기 테스트용)
   */
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

  /**
   * 지연된 에러 응답 생성
   */
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

/**
 * HTTP 메서드별 모킹 함수들
 */
export const HttpMocks = {
  /**
   * GET 요청 모킹
   */
  get: <T>(data: T, status: number = 200) => {
    return vi
      .fn()
      .mockResolvedValue(ApiMockUtils.createSuccessResponse(data, status));
  },

  /**
   * POST 요청 모킹
   */
  post: <T>(data: T, status: number = 201) => {
    return vi
      .fn()
      .mockResolvedValue(ApiMockUtils.createSuccessResponse(data, status));
  },

  /**
   * PUT 요청 모킹
   */
  put: <T>(data: T, status: number = 200) => {
    return vi
      .fn()
      .mockResolvedValue(ApiMockUtils.createSuccessResponse(data, status));
  },

  /**
   * DELETE 요청 모킹
   */
  delete: (status: number = 204) => {
    return vi
      .fn()
      .mockResolvedValue(
        ApiMockUtils.createSuccessResponse(null, status, "No Content")
      );
  },

  /**
   * 에러 응답 모킹
   */
  error: (message: string, status: number = 500, code?: string) => {
    const error = new Error(message) as Error & {
      status: number;
      code?: string;
    };
    error.status = status;
    error.code = code;
    return vi.fn().mockRejectedValue(error);
  },

  /**
   * 네트워크 에러 모킹
   */
  networkError: (message: string = "Network Error") => {
    return vi.fn().mockRejectedValue(ApiMockUtils.createNetworkError(message));
  },

  /**
   * 타임아웃 에러 모킹
   */
  timeoutError: (message: string = "Request Timeout") => {
    return vi.fn().mockRejectedValue(ApiMockUtils.createTimeoutError(message));
  },
};

/**
 * 페이지네이션 응답 모킹
 */
export const PaginationMocks = {
  /**
   * 페이지네이션된 응답 생성
   */
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

  /**
   * 빈 페이지 응답 생성
   */
  createEmptyPage: (page: number = 1, limit: number = 10) => {
    return PaginationMocks.createPaginatedResponse([], page, limit, 0);
  },
};

/**
 * 일반적인 HTTP 상태 코드 상수
 */
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

/**
 * 일반적인 에러 메시지 상수
 */
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
