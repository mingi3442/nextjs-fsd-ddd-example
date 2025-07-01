"use client";
import { queryClient } from "@/shared/api";
import { QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";

export const TanstackQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
