// components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) {
      localStorage.removeItem('token');
      router.push('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode<{ role: string }>(token);
      const { role } = decodedToken;
      if (!allowedRoles.includes(role)) {
        router.push('/not-found');
        return;
      }

      setUserRole(role);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Token decoding failed:', error);
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router, allowedRoles]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
