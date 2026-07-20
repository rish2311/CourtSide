import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import './index.css';
import App from './App.tsx';
import queryClient from './lib/queryClient';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Step 26 — Global Theme: light / dark via next-themes */}
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* Step 27 — React Query: QueryClient configured, Provider wired */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
