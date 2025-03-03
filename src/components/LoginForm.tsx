import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { REDCOLOR, WHITECOLOR } from '../assets/constant';
import { Link, redirect } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login Submitted:', formData);
    redirect('/history')
    // API call to authenticate the user
  };

  return (
    <div className={`w-full max-w-lg bg-[${REDCOLOR}] rounded-lg shadow-2xl p-6 space-y-2 opacity-78`}>
      <h2 className={`text-3xl  text-center text-[${REDCOLOR}] font-black font-sans`}>Your Welcome</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-1.5 pl-5 mt-10 rounded-lg shadow-sm bg-white"
            required
            placeholder="Email"
          />
        </div>

        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-1.5 pl-5 rounded-lg shadow-sm bg-white"
            required
            placeholder="Password"
          />
        </div>

        {/* <div className="text-right">
          <a href="#" className={`text-sm text-[${REDCOLOR}]`}>Forgot password?</a>
        </div> */}

        <button type="submit" className={`w-full py-2 mt-10 mb-10 text-white bg-[${REDCOLOR}] rounded-full hover:bg-[#FFFFFF] hover:text-[${REDCOLOR}]`}>
          Sign In
        </button>

        <div className="text-center">
          <span className={`text-sm text-[${REDCOLOR}]`}>or continue with</span>
        </div>

        <button className={`w-full py-1.5 mt-10 rounded-lg flex justify-center bg-white text-[${REDCOLOR}] hover:bg-[${REDCOLOR}] hover:text-white`} type='submit'>
          <FcGoogle className="mr-2 text-2xl" />
          Google
        </button>


      </form>
    </div>

  );
};

export default LoginForm;
