import React, { useEffect, useState } from "react";
import './Myprofile.css'
import axios from "axios";

const Myprofile = (props) => {

    // Defining state variables
    const storedUserDetails = JSON.parse(sessionStorage.getItem('estoreUserprofile'))
 
    const [editable, seteditable] = useState(true)
    const [userDetail, setuserDetail] = useState({
        name: '',
        email: '',
        mobileno: '',
        address: ''
    });


    useEffect(() => {
        ; (async () => {
            //  Retrieving user profile data stored in session storage
            try {
                // If profile data is present in session storage then displaying it to user
                if (storedUserDetails !== null && storedUserDetails.length !== 0) {
                    setuserDetail({
                        name: storedUserDetails.name,
                        email: storedUserDetails.email,
                        mobileno: storedUserDetails.mobilenumber,
                        address: storedUserDetails.address
                    })
                    return

                } else {
                    setloading(true)
                    seterror(false)

                    setuserDetail({
                        name: props.response.name,
                        email: props.response.email,
                        mobileno: props.response.mobilenumber,
                        address: props.response.address
                    })
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
    const userdetailChange = (event) => {
        const { name, value } = event.target;
        setuserDetail((prevalue) => {
            return {
                ...prevalue, [name]: value
            }
        })
    }


    // Defining action to be executed when user click on save button 
    const saveClick = async () => {
        try {
            // Making a patch request to the server to update user details in the database
            const response = await axios.patch('http://localhost:8000/user/profile/update', userDetail);

            if (response.data.success == true) {
                sessionStorage.setItem('estoreUserprofile', JSON.stringify(response.data.updateResult))
                setuserDetail({
                    name: response.data.updateResult.name,
                    email: response.data.updateResult.email,
                    mobileno: response.data.updateResult.mobilenumber,
                    address: response.data.updateResult.address
                })
                seteditable(true)
                alert(response.data.message)
            }

        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <>
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
                <button className="editsaveBtn" onClick={() => seteditable(false)} style={editable ? { opacity: 1 } : { opacity: 0.3 }} >Edit</button>
                <button className="editsaveBtn" onClick={saveClick} style={editable ? { opacity: 0.3 } : { opacity: 1 }} disabled={editable ? true : false} >Save</button>
            </div>
        </>
    )
}

export default Myprofile;