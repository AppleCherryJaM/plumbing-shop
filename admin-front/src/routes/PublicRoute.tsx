import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../main';

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { store } = useContext(Context);
  
  if (store.isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};