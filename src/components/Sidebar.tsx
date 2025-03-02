import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMoon, HiSun } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";

import { REDCOLOR } from "../assets/constant";
import { navItem } from "../assets/dataSide";


const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "enabled";
  });
  const location = useLocation(); // ตรวจจับ path ปัจจุบัน

  // เปิด-ปิด Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");

    // ✅ ใช้ document.documentElement.classList แทน useEffect
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // ตั้งค่าตอนเปิดหน้าใหม่
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className={`h-screen bg-white text-black flex flex-col transition-all duration-300 shadow-lg border-r border-gray-300 ${isExpanded ? "w-64" : "w-16"}`} >
      {/* ปุ่ม Toggle Sidebar */}
      <button onClick={() => setIsExpanded(!isExpanded)} className="text-black text-3xl p-3 flex justify-center">
        <div className={`flex items-center justify-center my-4 transition-all`} >
          {isExpanded ? "Stop Sense" : "S"}
        </div>
  
      </button>

      {/* โลโก้ / ชื่อโปรเจค */}

      <hr className="border-gray-400" />


      <ul className="flex-1 space-y-2 mt-4">
        {/* เมนู */}
        {navItem.map((item) => (
          <Link to={item.path} className={`flex items-center p-3 rounded-lg ${location.pathname === item.path ? `bg-[${REDCOLOR}] text-white` : "hover:bg-gray-300"} ${isExpanded ? "" : "justify-center"}`}>
            <li key={item.id} className={isExpanded ? "flex items-center w-full" : ""}>
              {item.icon}
              <span className={`ml-3 transition-all ${isExpanded ? "block" : "hidden"}`}>
                {item.title}
              </span>
            </li>
          </Link>
        ))}


        <li className={`flex items-center p-3 rounded-lg hover:bg-gray-300 cursor-pointer ${isExpanded ? "" : "justify-center"}`} onClick={toggleDarkMode}>
          {darkMode ? <HiSun size={24} className="text-yellow-500" /> : <HiMoon size={24} />}

          <span className={`ml-3 transition-all ${isExpanded ? "block" : "hidden"}`}>
            {darkMode ? "Light Mode" : "Night Mode"}
          </span>
        </li>

      </ul>

      {/* ปุ่ม Log out */}
      <button className={`bg-[${REDCOLOR}] text-white w-full py-3 flex items-center justify-center`}>

        <FiLogOut size={24} />
        <span className={`ml-3 transition-all ${isExpanded ? "block" : "hidden"}`}>Log out</span>

      </button>
    </div>
  );
};

export default Sidebar;