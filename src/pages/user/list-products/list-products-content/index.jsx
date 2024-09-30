import React from 'react'
import FilterContent from './filter-content'
import ProductsPanagation from './products-content'

export default function ProductsContent() {
  return (
    <div className='md:flex gap-10'>
        <FilterContent/>
        <ProductsPanagation/>
    </div>
  )
}
