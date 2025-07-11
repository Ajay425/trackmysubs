import React, { useEffect, useState } from "react";

const DashboardSummaryCard = ({ title, value, colorClass = "text-white", delay = 0 }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-md
        transition-transform duration-700
        ${animate ? "animate-fullFlip" : "opacity-0"}
      `}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <h2 className="text-lg text-gray-300 mb-1">{title}</h2>
      <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
    </div>
  );
};

export default DashboardSummaryCard;
