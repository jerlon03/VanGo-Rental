// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
  role: string;
}

const useAuth = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (token) {
      try {
        const decodedToken = jwtDecode<TokenPayload>(token);
        setRole(decodedToken.role);
      } catch (error) {
        console.error('Token decoding failed:', error);
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, []);

  return role;
};

export default useAuth;
