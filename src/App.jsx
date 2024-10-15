import  { useEffect } from 'react'
import apiurl from './api/apiConfig'
import { Route, Routes } from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Signup from './Components/Sign/Signup'
import Signin from './Components/Sign/Signin'
// import Kart from './Components/Kart/Kart'
import Category from './Components/Category/Category'
import Home from './Components/Home/Home'
import { Pagenotfound } from './Components/Pagenotfound'
import Footer from './Components/Footer/Footer'
import Kart from './Components/Kart/Kart'
import Billing from './Components/Kart/Billing'
import Account from './Components/Account/Account'
import Wishlist from './Components/Wishlist/Wishlist'
import Private from './Components/Privatecomponents/Private'
import ForgetPassword from './Components/Sign/ForgetPassword/ForgetPassword'
import ResetPassword from './Components/Sign/Reset/ResetPassword'
import Addproduct from './Components/Seller/Product/Addproduct'
import Register from './Components/Seller/SellerRegister/Register'
import Dashboard from './Components/Seller/Dashboard/Dashboard'
import Orderplaced from './Components/Kart/Orderplaced'
import Myorder from './Components/Account/Myorder'
import Loader from './Components/Loader/Loader'
import ProductDetails from './Components/ProductDetail/ProductDetails'
import { useDispatch } from "react-redux";
import { setauthenticate } from "./Reducers/authSlice";
import axios from "axios";


function App() {

  const dispatch = useDispatch()
  const userid = sessionStorage.getItem('usertoken')

  useEffect(() => {
      ; (async () => {

          if (userid === null ) {
              dispatch(setauthenticate(false))
              return;
          }

          try {
              const response = await axios.post(`${apiurl}/api/auth/verify`, { userid })
              //             console.log(response.data);
              if (response.data.success === true) {
                  dispatch(setauthenticate(true))
              } else if (response.data.status === 401) {
                  dispatch(setauthenticate(false))
              }
          } catch (error) {
            dispatch(setauthenticate(false))
              console.log(error)
          }

      })()

  }, [])


  return (
    <>
      <Navbar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/loader' element={<Loader />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/signin' element={<Signin />}></Route>
            <Route path='/profile/*' element={<Private page={Account} />}></Route>
            <Route path='/category/*' element={<Category />}></Route>
            <Route path='/kart' element={<Private page={Kart} />}></Route>
            <Route path='/wishlist' element={<Private page={Wishlist}/>}></Route>
            <Route path='/billing' element={<Billing/>}></Route>
            <Route path='/billing/orderplaced' element={<Orderplaced/>}></Route>
            <Route path='/account/password/forget' element={<ForgetPassword/>}></Route>
            <Route path='/account/password/reset' element={<ResetPassword/>}></Route>
            {/* <Route path='/profile/myorder' element={<Myorder/>}></Route> */}
            <Route path='/seller/addproduct' element={<Addproduct/>}></Route>
            <Route path='/seller/register' element={<Register/>}></Route>
            <Route path='/seller/dashboard/*' element={<Dashboard/>}></Route>
            <Route path='/*' element={<Pagenotfound />}></Route>
            <Route path="/products/:productid" element={<ProductDetails/>} />
          </Routes>
      <Footer />
    </>
  )
}

export default App
