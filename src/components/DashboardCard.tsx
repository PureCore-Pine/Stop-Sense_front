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
  className={`shadow-lg rounded-lg px-12 py-6 text-center border hover:shadow-xl transition-all duration-300 w-full h-full flex flex-col justify-center items-center ${size}`}
  style={{
    backgroundColor: "var(--card-bg)",
    color: "var(--card-text)",
    borderColor: "rgba(255,255,255,0.1)",
  }}
>

<h3
  className="text-lg font-semibold"
  style={{ color: 'var(--card-text)' }}
>
  {title}
</h3>
<p
  className="text-4xl font-bold mt-2"
  style={{ color: 'var(--card-text)' }}
>
  {value} <span className="text-base">{unit}</span>
</p>

    </div>
  );
};

export default DashboardCard;
