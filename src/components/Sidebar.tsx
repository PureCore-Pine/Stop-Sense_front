import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

import { REDCOLOR } from "../assets/constant";
import { navItem } from "../assets/dataSide";

const Sidebar: React.FC<{ isExpanded: boolean; toggleSidebar: () => void }> = ({
  isExpanded,
  toggleSidebar,
}) => {
  const location = useLocation();

  // ✅ Night Mode (ถูกคอมเมนต์ไว้เพื่อเปิดใช้งานภายหลัง)
  /*
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "enabled";
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  */

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white text-black flex flex-col transition-all duration-300 shadow-lg border-r border-gray-300 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      {/* ปุ่ม Toggle Sidebar */}
      <button
        onClick={toggleSidebar}
        className="text-black text-3xl p-3 flex justify-center"
      >
        <div className="flex items-center justify-center my-4 transition-all">
          {isExpanded ? "Stop Sense" : "S"}
        </div>
      </button>

      <hr className="border-gray-400" />

      <ul className="flex-1 space-y-2 mt-4">
        {/* เมนู */}
        {navItem.map((item) => (
          <Link
            to={item.path}
            key={item.id}
            className={`flex items-center p-3 rounded-lg ${
              location.pathname === item.path
                ? `bg-[#A02A2E] text-white`
                : "hover:bg-gray-300"
            } ${isExpanded ? "" : "justify-center"}`}
          >
            <li className={isExpanded ? "flex items-center w-full" : ""}>
              {item.icon}
              <span
                className={`ml-3 transition-all ${isExpanded ? "block" : "hidden"}`}
              >
                {item.title}
              </span>
            </li>
          </Link>
        ))}

        {/* ✅ ปุ่มเปิด-ปิด Night Mode (ถูกคอมเมนต์ไว้) */}
        {/*
        <li
          className={`flex items-center p-3 rounded-lg hover:bg-gray-300 cursor-pointer ${
            isExpanded ? "" : "justify-center"
          }`}
          onClick={toggleDarkMode}
        >
          {darkMode ? <HiSun size={24} className="text-yellow-500" /> : <HiMoon size={24} />}
          <span className={`ml-3 transition-all ${isExpanded ? "block" : "hidden"}`}>
            {darkMode ? "Light Mode" : "Night Mode"}
          </span>
        </li>
        */}
      </ul>

      {/* ปุ่ม Log out */}
      <Link to="/login">
        <button className={`bg-[${REDCOLOR}] text-white w-full py-3 flex items-center justify-center`}>
          <FiLogOut size={24} />
          <span className={`ml-3 transition-all ${isExpanded ? "block" : "hidden"}`}>
            Log out
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Sidebar;
