import React from 'react'
import Homepage from './Pages/Homepage'
import Packages from './Pages/Packages'
import FeedbackPage from './Pages/FeedbackPage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import TopDestinations from './Pages/TopDestinations';
import LandingPage from './Components/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomizedPage from './Pages/CustomizedPage';
import MyBookedPage from './Pages/MyBookedPage';
export default function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route index element={<Homepage/>}/>
        <Route path="/home" element={<Homepage/>}/>
        <Route path="/packages" element={<Packages/>}/>
        <Route path="/feedback" element={<FeedbackPage/>}/>
        <Route path="/topdestinations" element={<TopDestinations/>}/>
        <Route path="/customizedpackage" element={<CustomizedPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/landing" element={<LandingPage/>}/>
        <Route path="/mybookings" element={<MyBookedPage />}/>
        </Routes>
      </BrowserRouter>
        </>
  )
}
