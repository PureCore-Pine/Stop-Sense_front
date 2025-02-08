import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/Upload";
import History from "./pages/History";

export default function MyRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/upload' element={<UploadPage />} />
            <Route path='/history' element={<History />} />
        </Routes>
    )
}