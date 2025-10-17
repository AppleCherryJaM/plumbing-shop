// ProtectedRoute.tsx
import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../main';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { store } = useContext(Context);
  
  if (!store.isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};