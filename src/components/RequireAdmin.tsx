import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  return !user ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : !user?.is_admin ? (
    <Navigate to="/unauthorised" state={{ from: location }} />
  ) : (
    children
  );
};
