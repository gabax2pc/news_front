import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import PerformanceMonitor from './components/PerformanceMonitor';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Disclaimer from './pages/Disclaimer';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './index.css';

// React Query クライアントの設定
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <PerformanceMonitor />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App; 