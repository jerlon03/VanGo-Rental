// pages/404.tsx
'use client'
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import useAuth from '@/lib/hooks/useAuth';

const NofFound: NextPage = () => {
  const router = useRouter();
  const role = useAuth();

  const handleRedirect = () => {
    if (role === 'admin') {
      router.push('/dashboard');
    } else if (role === 'customer') {
      router.push('/customer');
    } else if (role === 'driver') {
      router.push('/driver');
    } else {
      router.push('/');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn't find the page you were looking for.</p>
      <button onClick={handleRedirect}>
        {role ? 'Go to Your Dashboard' : 'Go to Homepage'}
      </button>
    </div>
  );
};

export default NofFound;
