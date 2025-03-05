import React from "react";
import Background from "../components/Background";
import LoginForm from "../components/LoginForm";
import { REDCOLOR } from "../assets/constant";
import { Link } from "react-router-dom";


const App: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute top-4 right-4 space-x-4">
        <Link to='/login'>
          <button className={`px-8 py-1 text-white rounded-full hover:bg-[${REDCOLOR}]`}>
            Sign in
          </button>
        </Link>

        <Link to='#'>
          <button className={`px-8 py-1 bg-white text-[${REDCOLOR}] rounded-full hover:bg-[${REDCOLOR}] hover:text-red-500`}>
            <Link to='/register'>Register</Link>
          </button>
        </Link>
      </div>
      <Background backgroundColor={REDCOLOR}>
        <LoginForm />
      </Background>
    </div>
  );
};

export default App;