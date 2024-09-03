import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      // Redirect to login page if no token is found
      router.push('/login');
    }
  }, [token, router]);

  // If the user is authenticated, render the protected component
  // While the redirect is in progress, you can optionally return null or a loading spinner
  return token ? <>{children}</> : null;
};

export default ProtectedRoute;
