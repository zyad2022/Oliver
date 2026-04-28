import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './state';
import { MainLayout } from './layouts/MainLayout';
import { AppRoutes } from './router/routes';
import { AnimatePresence } from 'motion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppProvider>
          <MainLayout>
            <AnimatePresence mode="wait">
              <AppRoutes />
            </AnimatePresence>
          </MainLayout>
        </AppProvider>
      </BrowserRouter>
      <Analytics />
    </QueryClientProvider>
  );
}


