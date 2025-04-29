import axios from "axios";
import React, { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import { API_IP } from "../assets/constant";

import { useTranslation } from "react-i18next";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const user_id = localStorage.getItem('user_id');
  console.log('userID:', user_id);

  // ✅ Use State for API data
  const [conflictCount, setConflictCount] = useState(0);
  const [clipsCount, setClipsCount] = useState(0);
  const [activeUser, setActiveUser] = useState(0);

  // ✅ Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      console.log(user_id)
      try {
        const res = await axios.get(`${API_IP}/dataOverView/${user_id}`);
        console.log("API Response:", res.data);
        setConflictCount(res.data.data.conflictCount);
        setClipsCount(res.data.data.clipsCount);
        setActiveUser(res.data.data.activeUser);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [user_id]); // Runs when `user_id` changes

  // ✅ Use state values in dashboard data
  const dashboardData = [
    {
      // title: "จำนวน Conflict",
      title: t('dashboard.numConflict'),
      value: conflictCount,
      unit: t('dashboard.times'),
      size: "col-span-2 row-span-2"
    },
    {
      title: t('dashboard.numberUsers'),
      value: activeUser,
      unit:  t('dashboard.unitUser'),
      size: "col-span-1 row-span-2"
    },
    {
      title: t('dashboard.numClips'),
      value: clipsCount,
      unit: t('dashboard.unitClip'),
      size: "col-span-full row-span-1"
    }
  ];

  return (
    <div className="w-full min-h-screen p-6 pt-10 flex justify-center">
      <div className="max-w-screen-lg w-full">
        <h2 className="text-4xl font-bold mb-6 text-center">{t('dashboard.Dashboard')}</h2>

        {/* ✅ ปรับ Grid Layout ให้เต็มพื้นที่ */}
        <div className="grid grid-cols-3 gap-6 auto-rows-fr">
        
          {dashboardData.map((item, index) => (
            <DashboardCard key={index} {...item} />
          ))}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
