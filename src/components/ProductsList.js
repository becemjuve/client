import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Product from './Product'

function ProductsList() {
    const {products} = useSelector(state => state.product)

  return (
    <div className='d-flex gap-1 mt-3 flex-wrap'>
      {products.map(product => (
       <Product  key={product._id} product ={product}/>
      ))}
    </div>
  )
}

export default ProductsList
