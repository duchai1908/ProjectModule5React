import React from 'react'
import "./contactnavi.css"
export default function ContactNavigation() {
  return (
    <section className="flex flex-col items-center justify-center about-navigation">
        <div>
          <h2 className='font-bold text-3xl'>Contact</h2>   
        </div>
        <div className='mt-2'>
          <h4 className='font-bold'><a href="">Home</a> &#62; <span className='text-blue-500'>Contact</span></h4>
        </div>
      </section>
  )
}
