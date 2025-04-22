import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage';
import UploadPage from './pages/UploadPage';
import UploadAndDraw from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/Layout';
import ViewClip from './pages/Viewclip';

import TestPage from './pages/Test'
import ProtectedRoutes from "./utils/ProtectedRoutes";

export default function MyRouter() {


  return (
    <>
      {/* <div style={{ display: 'flex', }}>
            {onLogin ? <Sidebar /> : ''}

            <div style={{ marginTop: onLogin ? windowHight * 0.1 : 0, width: '100%' }}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path='/history' element={<HistoryPage />} />
                        <Route path="/upload" element={<UploadPage />} />
                        <Route path="/testSide" element={<Sidebar />} />
                    </Route>

                    <Route path="/testpage" element={<TestPage />} />
                </Routes>
            </div>
        </div> */}

      <Routes>
        <Route element={<ProtectedRoutes />}>
          {/* Pages ที่มี Layout */}
          <Route path="/" element={<UploadAndDraw />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/history" element={<Layout><HistoryPage /></Layout>} />
          <Route path="/upload" element={<Layout><UploadPage /></Layout>} />
          <Route path="/upload" element={<Layout><UploadPage /></Layout>} />
          <Route path="/viewclip/:clip_id" element={<Layout><ViewClip /></Layout>} />
          {/* หน้า Login และ Register ไม่มี Layout */}

        </Route>

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<UploadAndDraw />} />


      </Routes>
    </>


  );
}

