import React from "react";

interface DashboardCardProps {
  title: string;
  value: number | string;
  unit?: string;
  size?: string; // ✅ ขนาดของแต่ละการ์ด
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, unit, size }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 text-center border border-gray-200 hover:shadow-xl transition-all duration-300 ${size}`}>
      <h3 className="text-xs font-medium text-gray-600">{title}</h3> {/* ✅ ปรับให้เล็กสุด */}
      <p className="text-2xl font-bold text-black mt-2 leading-none"> {/* ✅ ลดขนาดตัวเลขลงอีก */}
        {value} <span className="text-sm">{unit}</span> {/* ✅ ลดขนาดหน่วยลง */}
      </p>
    </div>
  );
};

export default DashboardCard;
