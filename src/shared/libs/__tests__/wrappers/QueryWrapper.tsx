import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export const createTestQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
};

interface QueryWrapperProps {
  children: React.ReactNode;
  queryClient?: QueryClient;
}

export const QueryWrapper: React.FC<QueryWrapperProps> = ({
  children,
  queryClient,
}) => {
  const testQueryClient = queryClient || createTestQueryClient();

  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

/**
 * 커스텀 QueryWrapper 팩토리
 */
export const createQueryWrapper = (
  queryClientOptions?: Partial<ConstructorParameters<typeof QueryClient>[0]>
) => {
  const customQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
        ...queryClientOptions?.defaultOptions?.queries,
      },
      mutations: {
        retry: false,
        ...queryClientOptions?.defaultOptions?.mutations,
      },
    },
    ...queryClientOptions,
  });

  const CustomQueryWrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={customQueryClient}>
      {children}
    </QueryClientProvider>
  );
  CustomQueryWrapper.displayName = "CustomQueryWrapper";
  return CustomQueryWrapper;
};
