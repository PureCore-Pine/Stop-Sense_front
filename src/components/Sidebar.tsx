import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { RiUploadCloudLine } from "react-icons/ri";
import { BiHistory } from "react-icons/bi";
import { HiMoon, HiSun } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { FaBars } from "react-icons/fa";

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
    <div className={`h-screen bg-white text-black flex flex-col transition-all duration-300 shadow-lg border-r border-gray-300 ${isExpanded ? "w-64" : "w-16"}`}>
      {/* ปุ่ม Toggle Sidebar */}
      <button onClick={() => setIsExpanded(!isExpanded)} className="text-black text-3xl p-3 flex justify-center">
        <FaBars />
      </button>

      {/* โลโก้ / ชื่อโปรเจค */}
      <div className={`flex items-center justify-center my-4 transition-all ${isExpanded ? "text-2xl font-bold" : "hidden"}`}>
        Stop Sense
      </div>
      <hr className="border-gray-400" />

      {/* เมนู */}
      <ul className="flex-1 space-y-2 mt-4">
        <li className={`flex items-center p-3 rounded-lg ${location.pathname === "/" ? "bg-[#A02A2E] text-white" : "hover:bg-gray-300"} ${isExpanded ? "" : "justify-center"}`}>
          <Link to="/" className="flex items-center w-full">
            <MdDashboard size={24} />
            <span className={`ml-3 transition-all ${isExpanded ? "block" : "hidden"}`}>Dashboard</span>
          </Link>
        </li>
        <li className={`flex items-center p-3 rounded-lg ${location.pathname === "/upload" ? "bg-[#A02A2E] text-white" : "hover:bg-gray-300"} ${isExpanded ? "" : "justify-center"}`}>
          <Link to="/upload" className="flex items-center w-full">
            <RiUploadCloudLine size={24} />
            <span className={`ml-3 transition-all ${isExpanded ? "block" : "hidden"}`}>Upload</span>
          </Link>
        </li>
        <li className={`flex items-center p-3 rounded-lg ${location.pathname === "/history" ? "bg-[#A02A2E] text-white" : "hover:bg-gray-300"} ${isExpanded ? "" : "justify-center"}`}>
          <BiHistory size={24} />
          <span className={`ml-3 transition-all ${isExpanded ? "block" : "hidden"}`}>History</span>
        </li>

        {/* ✅ ปุ่ม Night Mode (ย้ายขึ้นมาในเมนู) */}
        <li className="flex items-center p-3 rounded-lg hover:bg-gray-300 cursor-pointer" onClick={toggleDarkMode}>
          {darkMode ? <HiSun size={24} className="text-yellow-500" /> : <HiMoon size={24} />}
          <span className={`ml-3 transition-all ${isExpanded ? "block" : "hidden"}`}>
            {darkMode ? "Light Mode" : "Night Mode"}
          </span>
        </li>
      </ul>

      {/* ปุ่ม Log out */}
      <button className="bg-[#A02A2E] text-white w-full py-3 flex items-center justify-center">
        <FiLogOut size={24} />
        <span className={`ml-3 transition-all ${isExpanded ? "block" : "hidden"}`}>Log out</span>
      </button>
    </div>
  );
};

export default Sidebar;
