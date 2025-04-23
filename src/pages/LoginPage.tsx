import React from "react";
import Background from "../components/Background";
import LoginForm from "../components/LoginForm";
import { REDCOLOR } from "../assets/constant";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 space-x-4">
        <Link to='/login'>
          <button className={`px-8 py-1 text-white rounded-full hover:bg-[${REDCOLOR}]`}>
            {/* Sign in */}
            {t('login.signin')}
          </button>
        </Link>

        <Link to='#'>
          <button className={`px-8 py-1 bg-white text-[${REDCOLOR}] rounded-full hover:bg-[${REDCOLOR}] hover:text-red-500`}>
            <Link to='/register'>
            {/* Register */}
            {t('login.register')}
            </Link>
          </button>
        </Link>
      </div>
      <Background backgroundColor={REDCOLOR}>
        <LoginForm />
      </Background>
    </div>
  );
};

export default Login;