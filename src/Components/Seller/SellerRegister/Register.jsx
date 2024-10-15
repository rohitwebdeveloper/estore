import React, { useState } from "react";
import './Register.css'
import apiurl from "../../../api/apiConfig";
import axios from "axios";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";


const Register = () => {
    const authorizeStatus = useSelector((state) => state.authenticate.value)
    const navigate = useNavigate()
    const [responseMsg, setresponseMsg] = useState('')
    const [sellerForm, setsellerForm] = useState({
        name: '',
        email: '',
        mobileno: '',
        company: '',
        locality: '',
        city: '',
        state: '',
        pincode: ''
    })
    const [isDisable, setisDisable] = useState(false)

    //    defining actions for register form input field change
    const registerValChange = (event) => {
        const { name, value } = event.target;
        setsellerForm((previousVal) => {
            return {
                ...previousVal, [name]: value
            }
        })
    }

    // Defining action to be executed when user click on register button
    const registerClick = async () => {
        // Checking whether input field is empty or not 
        if (!sellerForm.name || !sellerForm.email || !sellerForm.company || !sellerForm.mobileno || !sellerForm.locality || !sellerForm.city || !sellerForm.state || !sellerForm.pincode ) {
            setresponseMsg("Please fill all details")
            return
        }

        try {
            // Making a post request to the server to register a new seller and save its data in database
            setisDisable(true)
            const response = await axios.post(`${apiurl}/api/auth/register-seller`, {sellerForm})
            if (response.data.success == true) {
                setresponseMsg(response.data.message)
                navigate('/seller/dashboard/profile')
            }
            if (response.data.success == false) {
                setresponseMsg(response.data.message)
                setisDisable(false)
            }

        } catch (error) {
            // setresponseMsg(error.response.data.message);
            console.log(error)
            alert('Failed to Register, Internal server error')
            setisDisable(false)
        }
        setTimeout(() => {
            setresponseMsg('')
        }, 10000);
    }


    //   Defining action for gotosignin button
    const goToSignInClick = () => {
        navigate('/signin')
    }


    return (
        <>
            <main className="sellerRegisterContainer">
                {authorizeStatus && (
                    <form className="sellerRegisterBox" onSubmit={(e) => e.preventDefault()}>
                        <div className="message">{responseMsg}</div>
                        <div className="sellerRegisterHeading">
                            <h1 className="sellerRegisterH2">Become a Seller</h1>
                        </div>
                        <input type="text" className="sellerCredentials" placeholder="Enter FullName" name='name' onChange={registerValChange} value={sellerForm.name} />
                        <input type="email" className="sellerCredentials" placeholder="Enter Email" name='email' onChange={registerValChange} value={sellerForm.email} />
                        <input type='text' name="company" className="sellerCredentials" placeholder="Enter Company or Shop Name" onChange={registerValChange} value={sellerForm.company} />
                        <input type='number' name="mobileno" className="sellerCredentials" placeholder="Enter Mobile Number" onChange={registerValChange} value={sellerForm.mobileno} />
                        <input type='text' name="locality" className="sellerCredentials" placeholder="Enter HouseNo., Colony, Locality " onChange={registerValChange} value={sellerForm.locality} />
                        <input type='text' name="city" className="sellerCredentials" placeholder="Enter City or District" onChange={registerValChange} value={sellerForm.city} />
                        <input type='text' name="state" className="sellerCredentials" placeholder="Enter State" onChange={registerValChange} value={sellerForm.state} />
                        <input type='number' name="pincode" className="sellerCredentials" placeholder="Enter Area Pincode" onChange={registerValChange} value={sellerForm.pincode} />
                        <button className="btn" onClick={registerClick} disabled={isDisable} style={isDisable ? {opacity:0.3} : {opacity:1}} > Submit </button>
                    </form>
                )}

                {!authorizeStatus && (
                    <section className="sellerMessageBox">
                        <div className="signInMessage" >To Register as a Seller, Please Signin</div>
                        <button className="goToSignInBtn" onClick={goToSignInClick} >Go To Sign In</button>
                    </section>
                )}
            </main>
        </>
    )

}

export default Register;