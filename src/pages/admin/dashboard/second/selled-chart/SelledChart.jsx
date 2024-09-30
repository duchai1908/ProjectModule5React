import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const SelledChart = ({ data }) => {
  const options = {
    maintainAspectRatio: false, // Cho phép tùy chỉnh chiều cao
    responsive: true,
  };

  return (
    <div className="w-full h-full p-4 border border-gray-300 shadow-lg rounded-2xl bg-white">
      <Bar data={data} options={options} />
    </div>
  );
};

export default SelledChart;
