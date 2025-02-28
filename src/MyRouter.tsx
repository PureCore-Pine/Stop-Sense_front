import { Route, Routes } from "react-router-dom";
import HistoryPage from "./pages/HistoryPage";
import Dashboard from "./pages/Dashboard";

import LoginPage from "./pages/LoginPage";


export default function MyRouter() {
    return (
        <Routes>

            <Route path='/history' element={<HistoryPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
    )
}