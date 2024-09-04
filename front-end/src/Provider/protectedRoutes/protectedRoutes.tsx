import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for token only on the client side
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) {
      // Redirect to the login page if no token is found
      router.push('/login');
    } else {
      // Set authentication status to true if token exists
      setIsAuthenticated(true);
    }
  }, [router]);

  // While checking for authentication, you can optionally return null or a loading spinner
  if (!isAuthenticated) {
    return null;
  }

  // If the user is authenticated, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;