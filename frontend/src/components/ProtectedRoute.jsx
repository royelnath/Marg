import { Navigate, useLocation } from 'react-router-dom';

// Notice we added "message" here as a prop
export default function ProtectedRoute({ children, message }) {
  const isAuthenticated = localStorage.getItem('userToken');
  const location = useLocation(); // Gets the current URL

  if (!isAuthenticated) {
    // We attach the message to the "state" of the redirect
    return <Navigate 
      to="/sign" 
      state={{ redirectMessage: message, from: location.pathname }} 
      replace 
    />;
  }

  return children;
}