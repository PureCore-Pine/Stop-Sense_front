import { Route, Routes } from "react-router-dom";
import HistoryPage from "./pages/HistoryPage";
import Dashboard from "./pages/Dashboard";

import LoginPage from "./pages/LoginPage";

import Sidebar from "./components/Sidebar";
import { Link, useLocation } from "react-router-dom";
import UploadPage from "./pages/UploadPage";

export default function MyRouter() {
    const windowHight = window.innerHeight;
    const windowWidth = window.innerHeight;

    const location = useLocation(); // ตรวจจับ path ปัจจุบัน

    const onLogin = location.pathname !== '/login';

    return (
        <div style={{ display: 'flex', }}>
            {onLogin ? <Sidebar /> : ''}



            <div style={{ marginTop: onLogin ? windowHight * 0.1 : 0, width: '100%' }}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path='/history' element={<HistoryPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="/testSide" element={<Sidebar />} />

                </Routes>
            </div>
        </div>


    )
}