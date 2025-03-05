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
      className={`bg-white shadow-lg rounded-lg px-12 py-6 text-center border border-gray-200 hover:shadow-xl transition-all duration-300 w-full h-full flex flex-col justify-center items-center ${size}`}
    >
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-4xl font-bold text-black mt-2">
        {value} <span className="text-base">{unit}</span>
      </p>
    </div>
  );
};

export default DashboardCard;
