import React from "react";

interface DashboardCardProps {
  title: string;
  value: number | string;
  unit?: string;
  size?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, unit, size }) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-6 text-center border border-gray-200 hover:shadow-xl transition-all duration-300 ${size}`}
    >
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-5xl font-bold text-black mt-2">
        {value} <span className="text-lg">{unit}</span>
      </p>
    </div>
  );
};

const dashboardData = [
  { title: "จำนวน Conflict", value: 9999, unit: "ครั้ง", size: "col-span-2 row-span-2" },
  { title: "จำนวนผู้ใช้งานวันนี้", value: 9999, unit: "ราย", size: "col-span-1 row-span-2" },
  { title: "จำนวนคลิปที่อัพโหลด", value: 9999, unit: "คลิป", size: "col-span-1 row-span-2" },
  { title: "ระยะเวลารวม", value: "9,999", unit: "นาที", size: "col-span-4 row-span-1" },
];

const Dashboard: React.FC = () => {
  return (
    <div className="w-full min-h-screen p-6 pt-10">
      <h2 className="text-4xl font-bold ffffff mb-6 text-center">Dashboard</h2>

      {/* กำหนดให้กล่องข้อมูลอยู่ตรงกลาง */}
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dashboardData.map((item, index) => (
          <DashboardCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
