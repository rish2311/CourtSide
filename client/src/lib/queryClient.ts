import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,       // 5 minutes — data stays fresh for 5 mins
      retry: 2,                         // Retry failed requests up to 2 times
      refetchOnWindowFocus: false,      // Don't re-fetch when user switches tabs
    },
  },
});

export default queryClient;
