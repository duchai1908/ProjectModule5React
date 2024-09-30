import React from 'react'
import TopCards from './top-card'
import FooterDashboard from './FooterDashboard'
import SecondLine from './second'


export default function Dashboard() {
  return (
    <div className='p-[16px]'>
        <h1>Dashboard</h1>
        <TopCards/>
        <SecondLine/>
        <FooterDashboard/>
    </div>
  )
}
