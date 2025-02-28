import React from "react";
import Background from "../components/Background";
import LoginForm from "../components/LoginForm";


const App: React.FC = () => {
  return (
    <div className="relative">
      {/* ปุ่ม Sign In และ Register */}
      <div className="absolute top-4 right-4 space-x-4">
        <button className="px-8 py-1 text-white rounded-full hover:bg-[#b0585b]">
          Sign in
        </button>
        <button className="px-8 py-1 bg-white text-[#b0585b] rounded-full hover:bg-[#b0585b] hover:text-white">
          Register
        </button>
      </div>
    <Background>
      <LoginForm />
    </Background>
    </div>
  );
};

export default App;