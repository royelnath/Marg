import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, message }) {
  const isAuthenticated = localStorage.getItem('userToken');
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate 
      to="/sign" 
      state={{ redirectMessage: message, from: location.pathname }} 
      replace 
    />;
  }

  return children;
}