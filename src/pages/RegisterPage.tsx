import React from 'react';
import Background from '../components/Background';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';
import { YELLOWCOLOR } from '../assets/constant';

const RegisterPage: React.FC = () => {
  return (
    <div className="relative h-screen flex justify-center items-center">
      {/* ✅ ปรับตำแหน่งให้ตรงกับหน้า Login */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <Link to="/login">
          <button className="px-8 py-1 bg-white text-[YELLOWCOLOR] rounded-full hover:bg-[YELLOWCOLOR] hover:text-yellow-500 transition">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-8 py-1 text-white text-lg">
            Register
          </button>
        </Link>
      </div>

      <Background backgroundColor={YELLOWCOLOR}>
        <RegisterForm />
      </Background>
    </div>
  );
};

export default RegisterPage;