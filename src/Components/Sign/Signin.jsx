import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign.css"
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setauthenticate } from '../../Reducers/authSlice'
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";


const Sign = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [responseMsg, setresponseMsg] = useState('');
    const [showPassword, setshowPassword] = useState('password');

    // Storing user credentials in formData state 
    const [formData, setformData] = useState({
        email: '',
        password: ''
    });

    // Defining action for the change in input field of signin box
    const formvalChange = (event) => {
        const { name, value } = event.target;
        setformData((previousValue) => {
            return {
                ...previousValue, [name]: value
            }
        })
    }

    // Defining action for click on submit button
    const submitClick = async () => {

        // Checking whether data input field is empty or not
        if (formData.email === "" || formData.password === "") {
            setresponseMsg('Please fill details')
            return;
        }

        try {
             sessionStorage.removeItem('estoreUserprofile');
            // Sending the user credentials to the backend using post request
            const response = await axios.post('http://localhost:8000/signin', formData)

            const usertoken = response.data.token;

            // Token provide by the server is stored in sessionStorage of the browser for further use
            sessionStorage.setItem('usertokenid', usertoken)
            //    setresponseMsg(response.data.message);

            // Condition to check whether the user is signed in or not
            if (response.data.success === true) {
                navigate('/')
                dispatch(setauthenticate(true))
                setresponseMsg(response.data.message)
            } else {
                setresponseMsg(response.data.message)
            }
        } catch (error) {
            // Displaying the error to the user occurs at the server side
            setresponseMsg(error.response.data.message)
        }

        // Removing the display message after 10 seconds
        setTimeout(() => {
            setresponseMsg('')
        }, 10000);

    }

    // Defining action for click on Don't have an account
    const signupClick = () => {
        navigate('/signup')
    }


    // Defining action when the user click on Signin with Google
    const googleSignin = async (useremail) => {
        try {
            const response = await axios.post('http://localhost:8000/googlesignin', { useremail })
            const usertoken = response.data.token;

            if (response.data.success === true) {
                navigate('/')
                // console.log("token from google:", usertoken)
                sessionStorage.setItem('usertokenid', usertoken)
                dispatch(setauthenticate(true))
                setresponseMsg(response.data.message)
                return;
            } else {
                setresponseMsg(response.data.message)
                return;
            }

        } catch (error) {
            setresponseMsg(error.response.data.message)
        }
    }

    // To show and hide user password
    const checkboxClick = () => {
        const checkbox = document.querySelector('.checkboxShow');
        if (checkbox.checked) {
            setshowPassword('text')
        } else {
            setshowPassword('password')
        }
    }


    return (
        <>
            <div className="sign_container">
                <div className="signin_box">
                    <div className="message">{responseMsg}</div>
                    <div className="sign_heading">
                        <h1 className="sign_h2">Sign In</h1>
                    </div>
                    <input type="email" name="email" value={formData.email} className="sign_credentials" placeholder="Enter Email" onChange={formvalChange} />
                    <input type={showPassword} name="password" value={formData.password} className="sign_credentials" placeholder="Enter Password" onChange={formvalChange} />
                    <input type="checkbox" name="show" className="checkboxShow" onClick={checkboxClick} /><span>Show Password</span>
                    <button className="btn" onClick={submitClick} >Submit</button>
                    <div className="googleBtnWrapper">
                        <GoogleLogin width="320" text="signin_with"
                            onSuccess={credentialResponse => {
                                let decodedInfo = jwtDecode(credentialResponse.credential)
                                googleSignin(decodedInfo.email);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                                alert('Something went wrong, Please try later')
                            }}
                        />
                    </div>
                    <p onClick={signupClick} >Don't have Account, Sign Up</p>
                </div>

            </div>
        </>
    )
}

export default Sign;