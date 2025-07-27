import { QueryClient } from "@tanstack/react-query";
import React from "react";
import { QueryWrapper, createTestQueryClient } from "./QueryWrapper";
import { RouterWrapper } from "./RouterWrapper";

/**
 * 모든 Provider를 포함하는 통합 테스트 래퍼
 */
interface FullWrapperProps {
  children: React.ReactNode;
  queryClient?: QueryClient;
  routerPath?: string;
  routerQuery?: Record<string, string | string[]>;
  routerAsPath?: string;
}

export const FullWrapper: React.FC<FullWrapperProps> = ({
  children,
  queryClient,
  routerPath = "/",
  routerQuery = {},
  routerAsPath,
}) => {
  const testQueryClient = queryClient || createTestQueryClient();

  return (
    <QueryWrapper queryClient={testQueryClient}>
      <RouterWrapper
        initialPath={routerPath}
        query={routerQuery}
        asPath={routerAsPath}>
        {children}
      </RouterWrapper>
    </QueryWrapper>
  );
};

/**
 * 커스텀 FullWrapper 팩토리
 */
export const createFullWrapper = (
  options: {
    queryClientOptions?: Partial<ConstructorParameters<typeof QueryClient>[0]>;
    routerOptions?: {
      pathname?: string;
      query?: Record<string, string | string[]>;
      asPath?: string;
    };
  } = {}
) => {
  const customQueryClient = options.queryClientOptions
    ? new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            gcTime: 0,
            staleTime: 0,
            ...options.queryClientOptions.defaultOptions?.queries,
          },
          mutations: {
            retry: false,
            ...options.queryClientOptions.defaultOptions?.mutations,
          },
        },
        ...options.queryClientOptions,
      })
    : createTestQueryClient();

  const CustomFullWrapper = ({ children }: { children: React.ReactNode }) => (
    <FullWrapper
      queryClient={customQueryClient}
      routerPath={options.routerOptions?.pathname}
      routerQuery={options.routerOptions?.query}
      routerAsPath={options.routerOptions?.asPath}>
      {children}
    </FullWrapper>
  );
  CustomFullWrapper.displayName = "CustomFullWrapper";
  return CustomFullWrapper;
};
