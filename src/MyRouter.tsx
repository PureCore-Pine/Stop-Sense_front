import { Route, Routes } from "react-router-dom";
import HistoryPage from "./pages/HistoryPage";
import Dashboard from "./pages/Dashboard";

import LoginPage from "./pages/LoginPage";

import Sidebar from "./components/Sidebar";
import { Link, useLocation } from "react-router-dom";

export default function MyRouter() {
    return (
        <div style={{display: 'flex',}}>
            <Sidebar />

            <div style={{ marginTop: 4, width: '100%' }}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path='/history' element={<HistoryPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                    <Route path="/testSide" element={<Sidebar />} />

                </Routes>
            </div>
        </div>


    )
}