import type { DefaultOptions } from "@tanstack/react-query";

export const defaultQueryOptions: DefaultOptions = {
  queries: {
    /**
     * Data is considered fresh for 1 minute.
     */
    staleTime: 60 * 1000,

    /**
     * Keep inactive cache for 5 minutes.
     */
    gcTime: 5 * 60 * 1000,

    /**
     * Retry failed requests once.
     */
    retry: 1,

    /**
     * Prevent unnecessary refetches.
     */
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,

    /**
     * Network mode.
     */
    networkMode: "online",
  },

  mutations: {
    retry: 0,
    networkMode: "online",
  },
};
