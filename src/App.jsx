import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Sign from './Components/Sign/Sign'
// import Kart from './Components/Kart/Kart'
import Category from './Components/Category/Category'
import Home from './Components/Home/Home'
import { Pagenotfound } from './Components/Pagenotfound'
import Footer from './Components/Footer/Footer'

function App() {


  return (
    <>
      <Navbar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/sign' element={<Sign />}></Route>
            {/* <Route path='/kart' element={<Kart />}></Route> */}
            <Route path='/category/*' element={<Category />}></Route>
            <Route path='/*' element={<Pagenotfound />}></Route>
          </Routes>
      <Footer />
    </>
  )
}

export default App
