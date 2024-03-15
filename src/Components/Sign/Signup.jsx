import React, { useState } from "react";
import "./Sign.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

    const navigate = useNavigate();
    const [responseMsg, setresponseMsg] = useState('')
    const [showPassword, setshowPassword] = useState('password');

    // Defining action for click on Already have an account
    const signinClick = () => {
        navigate('/signin')
    }

    // Storing user credentials in formData state 
    const [formData, setformData] = useState({
        fullname: '',
        email: '',
        password: ''
    })

    // Defining action for the change in input field of signup box
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
        if (formData.fullname === "" || formData.email === "" || formData.password === "") {
            setresponseMsg('Please fill details')
            return;
        }

        try {
            // Sending the user data to the backend using post request
            const response = await axios.post('http://localhost:8000/signup', formData)

            // Checking whether the user data is saved in the database
            if (response.data.success == true) {
                navigate('/signin')
            } else {
                setresponseMsg(response.data.message);
            }
            console.log("This is a response:", response)

            // After the successful form submission making the input field blank
            setformData({ fullname: '', email: '', password: '' });

        } catch (error) {
            // Displaying the error to the user if any error occured at the server 
            setresponseMsg(error.response.data.message);
        }

        // Removing the message after 10seconds
        setTimeout(() => {
            setresponseMsg('')
        }, 10000);
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
                <div className="signup_box" >
                    <div className="message">{responseMsg}</div>
                    <div className="sign_heading">
                        <h1 className="sign_h2">Create an account</h1>
                    </div>
                    <input type="text" name="fullname" className="sign_credentials" placeholder="Enter Full Name" value={formData.fullname} onChange={formvalChange} />
                    <input type="email" className="sign_credentials" placeholder="Enter Email" value={formData.email} name='email' onChange={formvalChange} />
                    <input type={showPassword} name="password" className="sign_credentials" placeholder="Enter Password" value={formData.password} onChange={formvalChange} />
                    <input type="checkbox" name="show" className="checkboxShow" onClick={checkboxClick} /><span>Show Password</span>
                    <button className="btn" onClick={submitClick} > Submit </button>
                    <p onClick={signinClick}>Already have Account, Sign In</p>
                </div>

            </div>
        </>
    )
}

export default Signup;