import React from "react";
import { Link } from "react-router-dom";

import '../styles/Sidebar.css';

const Sidebar: React.FC = () => (
  <nav     
    style={{
    width: "200px",
    background: "#f0f0f0",
    padding: "10px",
    position: "absolute",  // ทำให้ Sidebar ลอยอยู่บนสุด
    top: "0",              // ติดขอบบน
    left: "0",             // ติดขอบซ้าย
    height: "100vh",       // ทำให้ Sidebar สูงเต็มจอ
  }}
>
    <ul>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/upload">Upload</Link>
      </li>
      <li>
        <Link to="/history">History</Link>
      </li>
    </ul>
  </nav>
);

export default Sidebar;
