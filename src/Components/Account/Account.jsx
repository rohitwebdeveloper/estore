import React, {useEffect, useState} from "react";
import './Account.css'
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const Account = () => {

    const [detail, setdetail] = useState({});

const navigate = useNavigate();

    const gohomeclick = ()=>{
        navigate('/')
    }

    useEffect(()=>{

     ;(async()=>{

       try {
         const response = await fetch('http://localhost:8000/api')
         const resjson = await response.json();
         console.log(resjson);
         setdetail(resjson)
       } catch (error) {
        console.log(error);
       }

     })()

    }, [])

    return (
        <>
            <div className="accountContainer">
                <div className="gohomeWrapper">
                    <button className="gohomeBtn" onClick={gohomeclick} > <IoArrowBackSharp /> Go To Home</button>
                </div>
                <div className="accountBox">
                    <div className="contentLinkbox">
                        <div className="contentLink">My Profile</div>
                        <div className="contentLink">My Wishlist</div>
                        <div className="contentLink">My Orders</div>
                    </div>
                    <div className="contentBox">
                        <div className="contentBoxHeading">Your Profile Details</div>
                        <div className="profilebox">
                          <div className="profileHeading">FullName:</div>
                          <div className="profileDetail">{detail.name}</div>
                        </div>
                        <div className="profilebox">
                          <div className="profileHeading">Email Address:</div>
                          <div className="profileDetail">{detail.email}</div>
                        </div>
                        <div className="profilebox">
                          <div className="profileHeading">Mobile Number:</div>
                          <div className="profileDetail">{detail.mobile}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Account;