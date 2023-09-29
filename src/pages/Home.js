import React, { useEffect } from 'react'
import ProductsList from '../components/ProductsList'
import Slider from '../components/Slider'



function Home() {
  useEffect(() => {
  
    window.scrollTo(0, 0);
  
  }, []);
  return (
    <div>
      <Slider/>
      <ProductsList />
      
    </div>
  )
}

export default Home
