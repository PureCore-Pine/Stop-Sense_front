import axios from "axios";
import React from "react";
import DashboardCard from "../components/DashboardCard";

const dashboardData = [
  { title: "จำนวน Conflict", value: 58, unit: "ครั้ง", size: "col-span-2 row-span-2" },
  { title: "จำนวนผู้ใช้งานวันนี้", value: 130, unit: "ราย", size: "col-span-1 row-span-2" },
  { title: "จำนวนคลิปที่อัพโหลด", value: 12, unit: "คลิป", size: "col-span-full row-span-1" }, // ✅ ปรับให้เต็มความกว้าง
];


const Dashboard: React.FC = () => {
  return (
    <div className="w-full min-h-screen p-6 pt-10 flex justify-center">
      <div className="max-w-screen-lg w-full">
        <h2 className="text-4xl font-bold mb-6 text-center">Dashboard</h2>

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
