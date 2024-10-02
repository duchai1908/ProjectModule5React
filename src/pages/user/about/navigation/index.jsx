import React from 'react'
import "./navigation.css"
export default function Navigation() {
  return (
    <section className="flex flex-col items-center justify-center about-navigation">
        <div>
          <h2 className='font-bold text-3xl'>About Us</h2>
        </div>
        <div className='mt-2'>
          <h4 className='font-bold'><a href="">Home</a> &#62; <span className='text-blue-500'>About us </span></h4>
        </div>
      </section>
  )
}
