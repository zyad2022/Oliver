import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AppProvider } from './state';
import { MainLayout } from './layouts/MainLayout';
import { AppRoutes } from './router/routes';
import { AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <MainLayout>
          <AnimatePresence mode="wait">
            <AppRoutes />
          </AnimatePresence>
        </MainLayout>
      </AppProvider>
      <SpeedInsights />
    </BrowserRouter>
  );
}


