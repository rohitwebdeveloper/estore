import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign.css"
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";


const Sign = () => {

    const navigate = useNavigate();
    const [responseMsg, setresponseMsg] = useState('');
    const [formData, setformData] = useState({
        email: '',
        password: ''
    });

    const formvalChange = (event) => {
        const { name, value } = event.target;
        setformData((previousValue) => {
            return {
                ...previousValue, [name]: value
            }
        })
    }

    const submitClick = async () => {
        console.log(formData);

        try {
            const response = await axios.post('http://localhost:8000/login', formData)
            console.log(response.data.token)
            const usertoken = response.data.token;
            localStorage.setItem('userid', usertoken)
            //    setresponseMsg(response.data.message);
            if (response.data.success === true) {
                navigate('/')
                setresponseMsg(response.data.message)
            } else {
                setresponseMsg(response.data.message)
            }
        } catch (error) {
            console.log(error)
            setresponseMsg(error.response.data.message)
        }

        setTimeout(() => {
            setresponseMsg('')
        }, 10000);

    }

    const signupClick = () => {
        navigate('/sign')
    }



    return (
        <>

            <div className="sign_container">
                <div className="signup_box">
                    <div className="message">{responseMsg}</div>
                    <div className="sign_heading">
                        <h1 className="sign_h2">Sign In</h1>
                    </div>
                    <input type="email" name="email" value={formData.email} className="signin_credentials" placeholder="Enter Email" onChange={formvalChange} />
                    <input type="password" name="password" value={formData.password} className="signin_credentials" placeholder="Enter Password" onChange={formvalChange} />
                    {/* <input type="password" name="" id="" className="signin_credentials" placeholder="Enter Password" /> */}
                    <button className="btn" onClick={submitClick} >Submit </button>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse)
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                    {/* <input className="btnGoogle" type="submit" value="Sign In With" /> */}
                    <p onClick={signupClick} >Don't have Account, Sign Up</p>
                </div>

            </div>
        </>
    )
}

export default Sign;