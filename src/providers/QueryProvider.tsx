"use client";

import {
  type DehydratedState,
  hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as React from "react";

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 1000 },
    },
  });

let browserQueryClient: QueryClient | undefined;

const getQueryClient = (): QueryClient => {
  if (typeof window === "undefined") return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
};

export type QueryProviderProps = {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
};

export const QueryProvider = ({
  children,
  dehydratedState,
}: QueryProviderProps) => {
  const queryClient = React.useState(() => {
    const client = getQueryClient();
    if (
      dehydratedState?.queries != null &&
      dehydratedState.queries.length > 0
    ) {
      hydrate(client, dehydratedState);
    }
    return client;
  })[0];

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
