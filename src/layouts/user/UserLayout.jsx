import React from 'react'
// import HeaderLayout from './header'
import FooterLayout from './footer'
import { Outlet } from 'react-router-dom'
import HeaderGenaral from './header'

export default function UserLayout() {
  return (
    <>
      <main className="overflow-hidden">
        <HeaderGenaral/>
        <Outlet/>
        <FooterLayout/>
      </main>      
    </>
  )
}
