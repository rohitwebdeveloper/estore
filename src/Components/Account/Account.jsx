import React, { useEffect, useState } from "react";
import './Account.css'
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setauthenticate } from "../../Reducers/authSlice";


const Account = () => {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [userDetail, setuserDetail] = useState({});
  const navigate = useNavigate();
  const storedUserDetails = JSON.parse(sessionStorage.getItem('estoreUserprofile'))
  const dispatch = useDispatch()

  const gohomeclick = () => {
    navigate('/')
  }


  useEffect(() => {

    ; (async () => {

      const userid = sessionStorage.getItem('usertokenid');
      try {

        if (storedUserDetails !== null && storedUserDetails.length !== 0) {
          setuserDetail(storedUserDetails)
          setloading(false)
        } else {
          setloading(true)
          seterror(false)
          const response = await axios.get(`http://localhost:8000/profile/${userid}`)
          setuserDetail(response.data)
          sessionStorage.setItem('estoreUserprofile', JSON.stringify(response.data))
          setloading(false)
        }
      } catch (error) {
        setloading(false)
        seterror(true)
        console.error("Unable to fetch user profile")
      }

    })()
  }, [])

 
  const signoutClick = ()=>{
      navigate('/')
      dispatch(setauthenticate(false))
      sessionStorage.removeItem('estoreUserprofile')
      sessionStorage.removeItem('usertokenid')
  }

  return (
    <>
      {loading && (<div className="h1box"><h1>Loading...</h1></div>)}

      {error && (<div className="h1box"><h1>Sorry, something went wrong</h1></div>)}

      {!loading && !error && (
        <div className="accountContainer">
          <div className="gohomeWrapper">
            <button className="gohomeBtn" onClick={gohomeclick} > <IoArrowBackSharp /> Go To Home</button>
          </div>
          <div className="accountBox">
            <div className="contentLinkbox">
              <div className="contentLink">My Profile</div>
              <div className="contentLink">My Wishlist</div>
              <div className="contentLink">My Orders</div>
              <button className="signoutBtn" onClick={signoutClick} >Sign-Out</button>
            </div>
            <div className="contentBox">
              <div className="contentBoxHeading">Your Profile Details</div>
              <div className="profilebox">
                <div className="profileHeading">FullName:</div>
                <div className="profileDetail">{userDetail.name}</div>
              </div>
              <div className="profilebox">
                <div className="profileHeading">Email Address:</div>
                <div className="profileDetail">{userDetail.email}</div>
              </div>
              <div className="profilebox">
                <div className="profileHeading">Mobile Number:</div>
                <div className="profileDetail">9137999344</div>
              </div>
            </div>
          </div>
        </div>
      )}


    </>
  )
}

export default Account;