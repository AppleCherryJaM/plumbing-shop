// admin/src/router.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

import { AdminLayout, LazyComponent} from '@/components/components';

// Lazy imports для всех страниц
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const OrdersPage = lazy(() => import('../pages/OrdersPage'));
const ImportPage = lazy(() => import('../pages/ImportPage'));
const AuthPage = lazy(() => import('../pages/AuthPage'));

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: (
      <PublicRoute>
        <LazyComponent component={AuthPage} />
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: <LazyComponent component={DashboardPage} />,
      },
      {
        path: '/products',
        element: <LazyComponent component={ProductsPage} />,
      },
      {
        path: '/orders',
        element: <LazyComponent component={OrdersPage} />,
      },
      {
        path: '/import',
        element: <LazyComponent component={ImportPage} />,
      },
      {
        path: '*',
        element: <Navigate to="/dashboard" />,
      },
    ],
  },
]);