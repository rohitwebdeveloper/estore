import React from "react";
import { useState } from "react";
import "./Sign.css"

const Sign = () => {

    const [inposition, setinposition] = useState()
    const [upposition, setupposition] = useState();


    const slidesignup = () => {
        setinposition('-300px')
        setupposition('0px')
    }

    const slidesignin = () => {
       setinposition('0px')
        setupposition('-300px')
       
    }

    return (
        <>
            <div className="sign_container">
                <div className="signin_box" style={{ left:inposition }}>
                    <div className="sign_heading">
                        <h2 className="sign_h2" >Sign Up</h2>
                    </div>
                    <input type="text" className="signin_credentials" placeholder="Enter Fullname" />
                    <input type="email" className="signin_credentials" placeholder="Enter Email" />
                    <input type="password" name="" id="" className="signin_credentials" placeholder="Enter Password" />
                    <input className="btn" type="submit" value="Submit" />
                    <p onClick={slidesignup}>Already have Account Sign In</p>
                </div>
                <div className="signup_box" style={{ left:upposition }}>
                    <div className="sign_heading">
                        <h2 className="sign_h2">Sign In</h2>
                    </div>
                    <input type="email" className="signin_credentials" placeholder="Enter Email" />
                    <input type="password" name="" id="" className="signin_credentials" placeholder="Enter Password" />
                    <input className="btn" type="submit" value="Submit" />
                    <p onClick={slidesignin}>Don't have Account Sign Up</p>
                </div>

            </div>
        </>
    )
}

export default Sign;