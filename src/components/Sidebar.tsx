import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { API_IP } from "../assets/constant";
import { navItem } from "../assets/dataSide";
import { IoMdSettings } from "react-icons/io";

const Sidebar: React.FC<{ isExpanded: boolean; toggleSidebar: () => void }> = ({
  isExpanded,
  toggleSidebar,
}) => {
  const [showDrop, setShowDrop] = useState(false);
  const [language, setLanguage] = useState('en');

  const location = useLocation();
  const navigate = useNavigate();

  const changeLanguage = (lang: string) => {
    setLanguage(lang)
    alert(`change land success ${lang}`)
  }

  const handleLogout = async () => {
    const user_id = localStorage.getItem("user_id");
    const data = { user_id };

    try {
      await axios.put(`${API_IP}/logout`, data);
      localStorage.removeItem("user_id");
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.message || "logout failed");
    }
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <div
      className="fixed top-0 left-0 h-full flex flex-col transition-all duration-300 shadow-lg border-r"
      style={{
        backgroundColor: "var(--sidebar-bg)",
        color: "var(--sidebar-text)",
        width: isExpanded ? "16rem" : "4rem",
      }}
    >
      <button
        onClick={toggleSidebar}
        className="text-3xl p-3 flex justify-center"
      >
        <div className="flex items-center justify-center my-4 transition-all">
          {isExpanded ? "Stop Sense" : "S"}
        </div>
      </button>

      <hr className="border-gray-400" />

      <ul className="flex-1 space-y-2 mt-4">
        {navItem.map((item) => (
          <Link
            to={item.path}
            key={item.id}
            className={`flex items-center p-3 rounded-lg transition-all ${
              isExpanded ? "" : "justify-center"
            }`}
            style={
              location.pathname === item.path
                ? {
                    backgroundColor: "var(--active-bg)",
                    color: "var(--active-text)",
                  }
                : {
                    backgroundColor: "transparent",
                    color: "var(--sidebar-text)",
                  }
            }
          >
            <li className={isExpanded ? "flex items-center w-full" : ""}>
              {item.icon}
              <span
                className={`ml-3 transition-all ${
                  isExpanded ? "block" : "hidden"
                }`}
              >
                {item.title}
              </span>
            </li>
          </Link>
        ))}

        {/* Toggle Dark Mode */}
        <li>
          <button
            onClick={toggleDarkMode}
            className={`w-full px-4 py-3 hover:opacity-80 transition-all ${
              isExpanded ? "flex items-center" : "justify-center flex"
            }`}
            style={{
              backgroundColor: "transparent",
              color: "var(--sidebar-text)",
            }}
          >
            <span>🌓</span>
            <span className={`ml-3 ${isExpanded ? "block" : "hidden"}`}>
              Night mode
            </span>
          </button>
        </li>

        <div
          className={`items-center rounded-lg ${isExpanded ? "" : "justify-center"} mt-10 `}
        >
          <button
            // className="hover:bg-gray-300 flex items-center p-3 rounded-lg w-full"
            className="flex items-center p-3 rounded-lg w-full"
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


      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full py-3 flex items-center justify-center hover:opacity-80 transition"
        style={{
          backgroundColor: "var(--active-bg)",
          color: "var(--active-text)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <FiLogOut size={24} />
        <span
          className={`ml-3 transition-all ${isExpanded ? "block" : "hidden"}`}
        >
          Log out
        </span>
      </button>
    </div>
  );
};

export default Sidebar;
  