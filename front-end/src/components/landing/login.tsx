'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faUnlock } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Button from '@/components/Button/button';
import InputField from '@/components/Form/inputfield';
import SweetAlert from '@/components/alert/alert';
import { useRouter } from 'next/navigation';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Regular expression for validating an email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email is valid
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:8080/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Invalid email or password.');
      }

      const data = await res.json();
      const { token, role } = data; // Extract token and role from the response

      // Store the token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      SweetAlert.showSuccess('Login Successfully');
      console.log('Login successful:', data);

      // Redirect based on role
      if (role === 'admin') {
        router.push(`/dashboard?${token}`);
      } else if (role === 'driver') {
        router.push(`/driver?${token}`);
      } else {
        router.push(`/customer?${token}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="basis-[35%] h-full w-full bg-primaryColor p-2 max-md:basis-[100%] max-lg:basis-[45%] max-sm:justify-center max-sm:items-center max-sm:h-screen">
      <div className="cursor-pointer">
        <Link href="/">
          <Image src="/logo.svg" width={80} height={80} alt="logo" className="max-md:hidden" />
        </Link>
      </div>
      <div className="flex w-full flex-col px-[15%] max-lg:px-[3%] max-xl:px-0 max-md:px-[20%] max-sm:px-2 max-sm:pt-[4rem] max-2xl:pt-[4rem] max-2xl:px-3 pt-[10rem]">
        <div className="flex justify-center flex-col items-center w-full">
          <Link href="/">
            <Image src="/logo.svg" width={80} height={80} alt="logo" className="hidden max-md:block" />
          </Link>
          <h1 className="text-[25px] font-semibold text-white max-sm:text-[20px]">LOGIN</h1>
          <p className="text-[16px] text-white max-sm:text-[14px]">Enter your details below to begin</p>
        </div>
        <form onSubmit={handleSubmit} className="py-6 flex flex-col gap-4">
          {error && <p style={{ color: '#D0342C' }} className='text-[14px]'>{error}</p>}
          <div className="flex w-full gap-2 border bg-white rounded-md items-center justify-center px-2">
            <FontAwesomeIcon icon={faCircleUser} className="text-primaryColor size-[25px] max-sm:size-[20px]" />
            <InputField
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              border="none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex w-full gap-2 border bg-white rounded-md items-center justify-center px-2">
            <FontAwesomeIcon icon={faUnlock} className="text-primaryColor size-[23px] max-sm:size-[20px]" />
            <InputField
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              border="none"
            />
          </div>
          <div className="flex w-full gap-2  rounded-md max-sm:rounded-[2px] items-center justify-center px-2 bg-button">
            <Button type='submit' name={loading ? 'Logging in...' : 'Login'} />
          </div>
        </form>
        <div className="w-full">
          <p className="text-button max-sm:text-[14px]">Forgot Password?</p>
          <div className="flex w-full gap-2  rounded-sm py-4">
            <button className="bg-white w-full max-sm:text-[14px]">Login with Google</button>
          </div>
          <p className="text-white max-sm:text-[14px]">
            Doesn't have an account?
            <Link href="/register">
              <span className="text-button"> Sign Up </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
