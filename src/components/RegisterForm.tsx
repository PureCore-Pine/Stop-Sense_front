import React, { useState } from 'react';
import { API_IP } from '../assets/constant';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigation

  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword

    }


    await axios.post(API_IP + '/register', data)
      .then(res => {
        console.log({ res })
        localStorage.setItem('user_id', res.data.user_id);

        navigate('/login')
      })

      .catch(err => {
        console.log({ err })
        alert(err.response?.data.message || "Register failed")
      })


    console.log('Register Submitted:', formData);
  };

  return (
    <div className="w-140 bg-[#F5E8D9] rounded-3xl shadow-lg p-20 opacity-95">
      <h2 className="text-4xl text-center text-[#E5B85C] font-bold mb-8">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 px-6 mt-5 rounded-lg shadow-sm bg-white text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-[#E5B85C] "
            required
            placeholder="Email"
          />
        </div>

        <div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 px-6 mt-1 rounded-lg shadow-sm bg-white text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-[#E5B85C]"
            required
            placeholder="Username"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 px-6 mt-1 rounded-lg shadow-sm bg-white text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-[#E5B85C]"
            required
            placeholder="Password"
          />
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 px-6 mt-1 rounded-lg shadow-sm bg-white text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-[#E5B85C]"
            required
            placeholder="Confirm Password"
          />
        </div>

        <button type="submit" className="w-full py-4 mt-6 text-white bg-[#E5B85C] text-lg rounded-full hover:bg-[#d3a14e] transition duration-300">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
