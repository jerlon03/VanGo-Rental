import React from 'react';
import Image from 'next/image';
import LoginComponent from '@/components/landing/login';


const Login = () => {

  return (
    <div className="w-full h-screen flex font-Poppins">
      <LoginComponent />
      <div className="w-full h-full flex justify-center items-center text-center flex-col max-md:hidden basis-[65%]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">VanGO Rentals</h1>
        <h3 className="text-lg md:text-xl lg:text-2xl mb-8">Welcome back, it's great to have you here again!</h3>
        <div className="max-w-full">
          <Image src="/png/login.png" layout="responsive" width={800} height={800} alt="LOGIN" className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Login;
