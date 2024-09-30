import React from 'react';
import { Pie } from 'react-chartjs-2';

const CategoryChart = ({ data }) => {
  const options = {
    maintainAspectRatio: false, // Cho phép tùy chỉnh chiều cao
    responsive: true,
  };

  return (
    <div className="w-full h-full p-4 border border-gray-300 shadow-lg rounded-2xl bg-white">
      <Pie data={data} options={options} />
    </div>
  );
};

export default CategoryChart;
