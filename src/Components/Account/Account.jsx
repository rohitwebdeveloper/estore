import React, { useEffect, useState } from "react";
import './Account.css'
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setauthenticate } from "../../Reducers/authSlice";


const Account = () => {
  // Defining state variables
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [editable, seteditable] = useState(true)
  const [userDetail, setuserDetail] = useState({
    name:'',
    email:'',
    mobileno:null,
    address:''
  });
  const navigate = useNavigate();
  const storedUserDetails = JSON.parse(sessionStorage.getItem('estoreUserprofile'))
  
  const dispatch = useDispatch()

  const gohomeclick = () => {
    navigate('/')
  }


  useEffect(() => {
    ; (async () => {
      //  Retrieving user profile data stored in session storage
      const userid = sessionStorage.getItem('usertokenid');
      try {
        // If profile data is present in session storage then displaying it to user
        if (storedUserDetails !== null && storedUserDetails.length !== 0) {
          setuserDetail({
          name:storedUserDetails.name,
          email:storedUserDetails.email,
          mobileno:storedUserDetails.mobilenumber,
          address:storedUserDetails.address
        })
          setloading(false)
        } else {
          setloading(true)
          seterror(false)
          // If there is no profile data in session storage then making a get request to get the profile data from the database
          const response = await axios.get(`http://localhost:8000/users/profile/${userid}`)
          // setuserDetail(response.data)
          setuserDetail({
            name:response.data.name,
            email:response.data.email,
            mobileno:response.data.mobilenumber,
            address:response.data.address
          })

          console.log(response.data)
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

  // Defining actions for change of input field when user update the details
  const userdetailChange = (event)=>{
    const {name, value} = event.target;
  setuserDetail((prevalue)=>{
    return{
      ...prevalue, [name]:value
    }
  }) 
  } 

// Defining action to be executed when user click on save button 
  const saveClick = async ()=>{
    try {
      // Making a patch request to the server to update user details in the database
      const response = await axios.patch('http://localhost:8000/user/profile/update', userDetail);

      if(response.data.success==true){
        sessionStorage.setItem('estoreUserprofile', JSON.stringify(response.data.updateResult))
        setuserDetail({
          name:response.data.updateResult.name,
          email:response.data.updateResult.email,
          mobileno:response.data.updateResult.mobilenumber,
          address:response.data.updateResult.address
        })
        seteditable(true)
        alert(response.data.message)
      }
      
    } catch (error) {
      alert(error.response.data.message)
    }
  }

//  Defining actions for signout click
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
            <div className="sideBar">
              <div className="linkBox">
              <div className="contentLink">My Profile</div>
              <div className="contentLink">My Wishlist</div>
              <div className="contentLink">My Orders</div>
              <div className="contentLink">Become Seller</div>
              </div>
              <div className="linkBox">
              <button className="signoutBtn" onClick={signoutClick} >Sign-Out➡</button>
              <button className="signoutBtn" onClick={()=> navigate('/account/password/reset')} >Change Password➡</button>
              
              </div>
            </div>
            <div className="contentBox">
              <div className="contentBoxHeading">Your Profile Details</div>
              <div className="profilebox">
                <div className="profileHeading">FullName:</div>
                <input className="profileDetail" value={userDetail.name} name='name' onChange={userdetailChange} readOnly={editable} />
              </div>
              <div className="profilebox">
                <div className="profileHeading">Email Address:</div>
                <div className="profileDetail"> {userDetail.email}  </div>
              </div>
              <div className="profilebox">
                <div className="profileHeading">Mobile Number:</div>
                <input type='number' className="profileDetail" name="mobileno" value={userDetail.mobileno} onChange={userdetailChange} readOnly={editable} />
              </div>
              <div className="profilebox">
                <div className="profileHeading">Address:</div>
                <input className="profileDetail" name="address" value={userDetail.address} onChange={userdetailChange} readOnly={editable} />
              </div>
              <div className="editsaveBox">
                <button className="editsaveBtn" onClick={()=>seteditable(false)} style={editable ?{opacity:1} : {opacity:0.3}} >Edit</button>
                <button className="editsaveBtn" onClick={saveClick} style={editable ?{opacity:0.3} : {opacity:1}} disabled={editable ? true : false} >Save</button>
              </div>
            </div>
          </div>
        </div>
      )}


    </>
  )
}

export default Account;