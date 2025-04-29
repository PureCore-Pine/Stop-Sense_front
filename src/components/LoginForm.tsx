import React, { useState } from 'react';
import { API_IP, REDCOLOR, WHITECOLOR } from '../assets/constant';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

interface FormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {

  const { t } = useTranslation();

  const navigate = useNavigate(); // Initialize navigation

  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
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
      username: formData.username,
      password: formData.password
    }

    await axios.post(API_IP + '/login', data)
      .then(res => {
        console.log({ res })
        localStorage.setItem('user_id', res.data.user_id);
        // Redirect to /dashboard after successful login
        navigate("/dashboard");
        console.log('user_id:', localStorage.getItem('user_id'))
      })
      .catch(err => {
        console.log({ err })
        alert(err.response?.data?.message || "Login failed");

      })


    console.log('Login Submitted:', data);

  };

  return (
    <div className={`w-full max-w-lg bg-gray-200 rounded-lg shadow-2xl p-6 space-y-2 opacity-78`}>
      <h2 className={`text-3xl  text-center text-[${WHITECOLOR}] font-black font-sans`}>
        {/* Your Welcome */}
        {t('login.welcome')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-1.5 pl-5 mt-10 rounded-lg shadow-sm bg-white"
            required
            // placeholder="Username"
            placeholder={t('login.username')}
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
            // placeholder="Password"
            placeholder={t('login.password')}
          />
        </div>

        <button type="submit" className={`w-full py-2 mt-10 mb-10 text-white bg-[${REDCOLOR}] rounded-full hover:bg-gray-400 hover:text-[${REDCOLOR}]`}>
          {/* Sign in */}
          {t('login.signin')}
        </button>


      </form>
    </div>

  );
};

export default LoginForm;