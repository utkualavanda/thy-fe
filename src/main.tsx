import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { Spinner } from './components/Spinner/Spinner.tsx';
import { client } from './queryClient.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <Suspense fallback={<Spinner sx={{ marginY: 10 }} />}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);
