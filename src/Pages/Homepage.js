import React from 'react'
import Navbar from '../Components/Navbar'
import Home from '../Components/Home'
import MyGoogleMap from '../Components/MyGoogleMap'
import Footer from '../Components/Footer'
import BestServices from '../Components/BestServices'
import Testimonials from '../Components/Testimonials'
import Destinations from '../Components/Destinations'
export default function Homepage() {
  return (
    <div>
       <Navbar/>
      <Home/>
      <MyGoogleMap/>
      <BestServices/>
      <Destinations/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}
