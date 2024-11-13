'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import InputField from '@/components/Form/inputfield';
import { MdEmail, IoMdLock } from "@/components/icons/index";
import Button from '@/components/Button/button';
import Link from 'next/link';
import SweetAlert from '@/components/alert/alert'
import { useRouter } from 'next/navigation';


const LoginPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
      // Redirect based on role
      if (role === 'admin') {
        router.push(`/dashboard?${token}`);
      } else if (role === 'driver') {
        router.push(`/driver?${token}`);
      } 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Trigger modal visibility with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalVisible(true);
    }, 300); // Delay for the animation, adjust as needed
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="relative w-full h-screen bg-blackColor/50 flex justify-center pt-[6%] text-blackColor">
      {/* Modal container */}
      <div
        className={`absolute z-10  h-auto bg-white px-6 pb-6 rounded-[5px] shadow-lg transition-transform duration-500 ease-in-out transform ${isModalVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          } `}
      >
        <div className="w-full flex justify-center flex-col items-center">
          <Image src='/van_gif.gif' width={180} height={50} alt='Van Gif'></Image>
          <h1 className="text-[24px] font-medium mb-1 text-primaryColor">Hello, Welcome!</h1>
          <p className="mb-2 text-primaryColor">Enter your credentials to access your account</p>
          <form action="" onSubmit={handleSubmit} className='w-full'>
            <div className='w-full flex flex-col gap-4'>
              <div className='w-full'>
                {error && <p style={{ color: '#D0342C' }} className='text-[14px] h-[35px] bg-red-300 pl-4 flex items-center rounded-[3px]'>{error}</p>}
              </div>
              <InputField
                id="email"
                type="email"
                placeholder="Enter your Email / Username"
                icon={<MdEmail className={`${email ? 'text-primaryColor' : 'text-[#CCCCCC]'} size-[20px]`} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              />
              <InputField
                id="password"
                type="password"
                placeholder="Enter your Password"
                icon={<IoMdLock className={`${password ? 'text-primaryColor' : 'text-[#CCCCCC]'} size-[20px]`} />}
                onChange={(e) => setPassword(e.target.value)}
                value={password} // Update email state on input change
              />
              <p className='text-[14px]'>Forgot your password ?  <Link href='/forgot-password'><span className='text-button underline'>Click Here !</span></Link></p>
              <div className="flex w-full gap-2  items-center justify-center px-2 bg-button">
                <Button type='submit' name={loading ? 'Logging in...' : 'Login'} />
              </div>
            </div>
          </form>


        </div>
      </div>
    </div>
  );
};

export default LoginPage;
