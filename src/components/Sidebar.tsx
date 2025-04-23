import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

import { API_IP, REDCOLOR } from "../assets/constant";
import { navItem } from "../assets/dataSide";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";


const Sidebar: React.FC<{ isExpanded: boolean; toggleSidebar: () => void }> = ({
  isExpanded,
  toggleSidebar,
}) => {
  const [showDrop, setShowDrop] = useState(false);
  const [language, setLanguage] = useState('en');

  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigation

  const changeLanguage = (lang: string) => {
    setLanguage(lang)
    alert(`change land success ${lang}`)
  }

  const handleLogout = async () => {
    const user_id = localStorage.getItem('user_id');

    const data = {
      user_id
    }

    await axios.put(API_IP + '/logout', data)
      .then(res => {
        console.log('res:', res)
        localStorage.removeItem('user_id')
        navigate("/");

      })
      .catch(err => {
        console.log('err:', err)
        alert(err.response?.data?.message || "logout failed");

      })
  }

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white text-black flex flex-col transition-all duration-300 shadow-lg border-r border-gray-300 ${isExpanded ? "w-64" : "w-16"
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
            className={`flex items-center p-3 rounded-lg ${location.pathname === item.path
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

        <div
          className={`items-center rounded-lg ${isExpanded ? "" : "justify-center"} mt-10 `}
        >
          <button
            className="hover:bg-gray-300 flex items-center p-3 rounded-lg w-full"
            onClick={() => { isExpanded && setShowDrop(!showDrop) }}
          >
            <div
              className={isExpanded ? "flex items-center w-full" : ""}
            >
              <IoMdSettings size={32} />
              <span
                className={`ml-3 transition-all ${isExpanded ? "block" : "hidden"}`}
              >
                {'Setting'}
              </span>
            </div>
          </button>

          {showDrop &&
            <div
              className="dropdown-content ml-5"
            >
              <p>change language</p>

              <div
                style={{ marginTop: '4px', marginLeft: '10px' }}
              >
                <div style={{ display: 'flex', marginRight: '2' }}>
                  <img src="../../public/image/TH_Flag.png" width={20}
                    style={{ marginRight: '4px' }}
                  />
                  <button onClick={() => changeLanguage('th')}>
                    <p style={{ fontWeight: language == 'th' ? 'bold' : 'normal' }}>
                      {'TH'}
                    </p>
                  </button>
                </div>

                <div style={{ display: 'flex', marginRight: '2' }}>
                  <img src="../../public/image/ENG_Flag.png" width={20}
                    style={{ marginRight: '4px' }}
                  />
                  <button onClick={() => changeLanguage('en')}>
                    <p style={{ fontWeight: language == 'en' ? 'bold' : 'normal' }}>
                      {'EN'}
                    </p>
                  </button>
                </div>
              </div>

            </div>
          }
        </div>


      </ul>


      {/* ปุ่ม Log out */}
      <button onClick={() => handleLogout()} className={`bg-[${REDCOLOR}] text-white w-full py-3 flex items-center justify-center`}>
        <FiLogOut size={24} />
        <span className={`ml-3 transition-all ${isExpanded ? "block" : "hidden"}`}>
          Log out
        </span>
      </button>

    </div>
  );
};

export default Sidebar;
