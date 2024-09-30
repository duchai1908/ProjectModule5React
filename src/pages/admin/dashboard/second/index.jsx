import React from 'react';
import CategoryCharts from './category-chart';
import SelledCharts from './selled-chart';

export default function SecondLine() {
  return (
    <div className='grid gap-4 mt-[16px] lg:mt-[24px] grid-cols-1 lg:grid-cols-[30%_70%]'>
      {/* CategoryCharts: Chiếm 30% chiều rộng trên màn hình lớn và full-width trên màn hình nhỏ */}
      <div className='w-full h-[300px] lg:h-[400px]'>
        <CategoryCharts />
      </div>

      {/* SelledCharts: Chiếm 70% chiều rộng trên màn hình lớn và full-width trên màn hình nhỏ */}
      <div className='w-full h-[300px] lg:h-[400px] pr-[0px] lg:pr-[16px]'>
        <SelledCharts />
      </div>
    </div>
  );
}
