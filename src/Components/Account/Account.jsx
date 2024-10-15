import React, { useState, useEffect } from "react";
import apiurl from "../../api/apiConfig";
import './Account.css'
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setauthenticate } from "../../Reducers/authSlice";
import { Route, Routes, NavLink } from "react-router-dom";
import axios from "axios";
import Myorder from "./Myorder";
import Myprofile from "./Myprofile";
import Loader from "../Loader/Loader";
// import { MdArrowForwardIos } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
// import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";


const Account = () => {

  const storedUserDetails = JSON.parse(sessionStorage.getItem('estoreUserprofile'))
  const [isSeller, setisSeller] = useState(false)
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [apiResponse, setapiResponse] = useState()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isActive, setisActive] = useState(false)


  useEffect(() => {
    ; (async () => {
      //  Retrieving user profile data stored in session storage
      const userid = sessionStorage.getItem('usertoken');
      try {
        // If profile data is present in session storage then displaying it to user
        if (storedUserDetails !== null && storedUserDetails.length !== 0) {
          setisSeller(storedUserDetails.isSeller)
          setloading(false)

        } else {
          setloading(true)
          seterror(false)
          // If there is no profile data in session storage then making a get request to get the profile data from the database
          const response = await axios.get(`${apiurl}/api/user/profile/${userid}`)
          setapiResponse(response.data)
          // if(response.data.isSeller== null || response.data.isSeller==undefined) {
            setisSeller(response.data.isSeller)
          // }
          sessionStorage.setItem('estoreUserprofile', JSON.stringify(response.data))
          setloading(false)
        }
      } catch (error) {
        setloading(false)
        seterror(true)
      }
    })()
  }, [])


  //  Defining actions for signout click
  const signoutClick = () => {
    navigate('/')
    dispatch(setauthenticate(false))
    sessionStorage.removeItem('estoreUserprofile')
    sessionStorage.removeItem('usertoken')
  }


  const slideSideBarClick = () => {
    setisActive(!isActive)
  }

  return (
    <>
      <div className="accountContainer">

        <div className="gohomeWrapper">
          <button className="gohomeBtn" onClick={() => navigate('/')} > <IoArrowBackSharp /> Go To Home</button>
        </div>
        <div className="slideArrowBtn" onClick={slideSideBarClick}>
  {isActive ? <MdOutlineKeyboardDoubleArrowLeft /> : <MdOutlineKeyboardDoubleArrowRight />}
</div>
        <div className="accountBox">
          <div className={`sideBar ${isActive ? 'active' : ''}`}>
            <div className="linkBox">
              <div className="contentLink"> <NavLink to="myprofile"> My Profile </NavLink> </div>
              <div className="contentLink"> <NavLink to="myorder" >My Orders</NavLink> </div>
              <div className="contentLink"> <NavLink to="/wishlist" >My Wishlist</NavLink> </div>
              <div className="contentLink"> <NavLink to="/kart" >My Kart</NavLink> </div>
              <div className="contentLink" onClick={() => isSeller ? navigate('/seller/dashboard/profile') : navigate('/seller/register')} >{isSeller ? 'Seller Dashboard' : 'Become Seller'}</div>
            </div>
            <div className="linkBox">
              <button className="signoutBtn" onClick={signoutClick} >Sign-Out➡</button>
              <button className="signoutBtn" style={{textAlign:'left'}} onClick={() => navigate('/account/password/reset')} >Change Password➡</button>

            </div>
          </div>
          <div className="contentBox">
            {loading && (<Loader/>)}
            {error && (<div className="h1box"><h2>Sorry, Something went wrong!</h2></div>)}
            <Routes>
              {!loading && !error && (
                <Route path="myprofile" element={<Myprofile response={apiResponse} />} />
              )}
              <Route path="myorder" element={<Myorder />} />
            </Routes>
          </div>
        </div>
      </div>
      {/* )} */}


    </>
  )
}

export default Account;