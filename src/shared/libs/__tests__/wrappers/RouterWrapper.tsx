import React from "react";

/**
 * 모킹된 Next.js 라우터 객체
 */
export const createMockRouter = (
  options: {
    pathname?: string;
    query?: Record<string, string | string[]>;
    asPath?: string;
    push?: ReturnType<typeof vi.fn>;
    replace?: ReturnType<typeof vi.fn>;
    back?: ReturnType<typeof vi.fn>;
    forward?: ReturnType<typeof vi.fn>;
    reload?: ReturnType<typeof vi.fn>;
  } = {}
) => ({
  pathname: options.pathname || "/",
  route: options.pathname || "/",
  query: options.query || {},
  asPath: options.asPath || "/",
  basePath: "",
  locale: undefined,
  locales: undefined,
  defaultLocale: undefined,
  isReady: true,
  isPreview: false,
  isLocaleDomain: false,
  push: options.push || vi.fn().mockResolvedValue(true),
  replace: options.replace || vi.fn().mockResolvedValue(true),
  reload: options.reload || vi.fn(),
  back: options.back || vi.fn(),
  forward: options.forward || vi.fn(),
  prefetch: vi.fn().mockResolvedValue(undefined),
  beforePopState: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
});

/**
 * Router Context Provider 래퍼
 */
interface RouterWrapperProps {
  children: React.ReactNode;
  initialPath?: string;
  query?: Record<string, string | string[]>;
  asPath?: string;
}

export const RouterWrapper: React.FC<RouterWrapperProps> = ({
  children,
  initialPath = "/",
  query = {},
  asPath,
}) => {
  const mockRouter = createMockRouter({
    pathname: initialPath,
    query,
    asPath: asPath || initialPath,
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      (window as typeof window & { __NEXT_ROUTER__: unknown }).__NEXT_ROUTER__ =
        mockRouter;
    }
  }, [mockRouter]);

  return <>{children}</>;
};

/**
 * 커스텀 RouterWrapper 팩토리
 */
export const createRouterWrapper = (routerOptions: {
  pathname?: string;
  query?: Record<string, string | string[]>;
  asPath?: string;
}) => {
  const CustomRouterWrapper = ({ children }: { children: React.ReactNode }) => (
    <RouterWrapper
      initialPath={routerOptions.pathname}
      query={routerOptions.query}
      asPath={routerOptions.asPath}>
      {children}
    </RouterWrapper>
  );
  CustomRouterWrapper.displayName = "CustomRouterWrapper";
  return CustomRouterWrapper;
};

/**
 * 라우터 모킹 헬퍼 함수들
 */
export const RouterMockHelpers = {
  /**
   * useRouter 훅 모킹 설정
   */
  mockUseRouter: (routerMock: ReturnType<typeof createMockRouter>) => {
    return routerMock;
  },

  /**
   * 라우터 네비게이션 검증
   */
  verifyNavigation: (
    mockRouter: ReturnType<typeof createMockRouter>,
    expectedPath: string,
    method: "push" | "replace" = "push"
  ) => {
    expect(mockRouter[method]).toHaveBeenCalledWith(expectedPath);
  },

  /**
   * 라우터 쿼리 파라미터 검증
   */
  verifyQuery: (
    mockRouter: ReturnType<typeof createMockRouter>,
    expectedQuery: Record<string, string | string[]>
  ) => {
    expect(mockRouter.query).toEqual(expectedQuery);
  },

  /**
   * 라우터 상태 초기화
   */
  resetRouter: (mockRouter: ReturnType<typeof createMockRouter>) => {
    if (vi.isMockFunction(mockRouter.push)) {
      mockRouter.push.mockClear();
    }
    if (vi.isMockFunction(mockRouter.replace)) {
      mockRouter.replace.mockClear();
    }
    if (vi.isMockFunction(mockRouter.back)) {
      mockRouter.back.mockClear();
    }
    if (vi.isMockFunction(mockRouter.forward)) {
      mockRouter.forward.mockClear();
    }
  },
};
