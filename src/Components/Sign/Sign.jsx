import React, { useState } from "react";
import "./Sign.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sign = () => {

    const navigate = useNavigate();
    const [responseMsg, setresponseMsg] = useState('')
    const signinClick = () => {
        navigate('/signin')
    }

    const [formData, setformData] = useState({
        email: '',
        mobilenumber: '',
        password: ''
    })

    const formvalChange = (event) => {
        const { name, value } = event.target;
        setformData((previousValue) => {
            return {
                ...previousValue, [name]: value
            }
        })
    }


    const submitClick = async () => {
        // console.log(formData);
        // const userid = localStorage.getItem('userid');
        // console.log('UserId:', userid)

        if (formData.email === "" || formData.mobilenumber === "" || formData.password === "") {
            setresponseMsg('Please fill details')
            return;
        }

        try {
            // Sending the user data to the backend using post request
            const response = await axios.post('http://localhost:8000/signup', formData)

            // Checking whetheer the user data is saved in the database
            if (response.data.success == true) {
                navigate('/signin')
            } else {
                setresponseMsg(response.data.message);
            }
            console.log("This is a response:", response)

            // After the successful form submission making the data field blank
            setformData({ email: '', mobilenumber: '', password: '' });

        } catch (error) {
            console.log("Error of Submit:", error)
            setresponseMsg(error.response.data.message);
        }

        setTimeout(() => {
            setresponseMsg('')
        }, 10000);
    }


    return (
        <>

            <div className="sign_container">
                <div className="signup_box" >
                    <div className="message">{responseMsg}</div>
                    <div className="sign_heading">
                        <h1 className="sign_h2">Create an account</h1>
                    </div>
                    <input type="email" className="signin_credentials" placeholder="Enter Email" value={formData.email} name='email' onChange={formvalChange} />
                    <input type="text" name="mobilenumber" className="signin_credentials" placeholder="Enter Mobile Number" value={formData.mobilenumber} onChange={formvalChange} />
                    <input type="password" name="password" className="signin_credentials" placeholder="Enter Password" value={formData.password} onChange={formvalChange} />
                    <button className="btn" onClick={submitClick} > Submit </button>
                    <input className="btnGoogle" type="submit" value="Sign Up With" />
                    <p onClick={signinClick}>Already have Account, Sign In</p>
                </div>

            </div>
        </>
    )
}

export default Sign;