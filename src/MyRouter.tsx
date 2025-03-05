import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage';
import UploadPage from './pages/UploadPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/Layout';

export default function MyRouter() {
  return (
    <Routes>
      {/* Pages ที่มี Layout */}
      <Route path="/" element={<Layout></Layout>} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/history" element={<Layout><HistoryPage /></Layout>} />
      <Route path="/upload" element={<Layout><UploadPage /></Layout>} />

      {/* หน้า Login และ Register ไม่มี Layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
