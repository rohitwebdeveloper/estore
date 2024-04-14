import React, { useState, useCallback, useEffect } from 'react'
import './SellerProfile.css'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setsellerProfileDetail } from '../../../Reducers/sellerprofileSlice'

const SellerProfile = () => {
    // Defining states
    const userid = sessionStorage.getItem('usertoken');
    const [loading, setloading] = useState(true);
    const [err, seterr] = useState(false)
    const [responseMsg, setresponseMsg] = useState('')
    const [isEditable, setisEditable] = useState(true)
    const storedSellerDetail = useSelector((state) => state.sellerProfileDetail)
    const dispatch = useDispatch()
    const [sellerDetail, setsellerDetail] = useState({
        name: '',
        email: '',
        sellerId: '',
        company: '',
        mobileno: '',
        locality: '',
        city: '',
        state: '',
        pincode: ''
    })


    useEffect(() => {

        ; (async () => {
            // Checking whether the seller profile data is stored or not and if it exists then showing it to the user
            if (storedSellerDetail.length !== 0 || storedSellerDetail === null) {
                const [{ name, email, _id, company, mobilenumber, address }] = storedSellerDetail;
                setsellerDetail({
                    name: name,
                    email: email,
                    sellerId: _id,
                    company: company,
                    mobileno: mobilenumber,
                    locality: address.locality,
                    city: address.city,
                    state: address.state,
                    pincode: address.pincode
                })
                setloading(false)
            } else {
                try {
                    setloading(true)
                    seterr(false)
                    // Making a get request to the server to get the seller profile data 
                    const response = await axios.get(`http://localhost:8000/seller/dashboard/profile/${userid}`)

                    const { name, email, _id, company, mobilenumber, address } = response.data;
                    setsellerDetail({
                        name: name,
                        email: email,
                        sellerId: _id,
                        company: company,
                        mobileno: mobilenumber,
                        locality: address.locality,
                        city: address.city,
                        state: address.state,
                        pincode: address.pincode
                    })
                    dispatch(setsellerProfileDetail(response.data))
                    setloading(false)

                } catch (error) {
                    setloading(false)
                    seterr(true)
                }
            }
        })()
    }, [])


    //   Defining action for seller profile input change 
    const sellerProfileChange = (event) => {
        const { name, value } = event.target;
        setsellerDetail((previousVal) => {
            return {
                ...previousVal, [name]: value
            }
        })
    }


    // Defining action to be executed when the user click on save button
    const saveSellerProfile = async () => {
        try {
            // Making a post request to the server to save the updated seller data to the database
            const response = await axios.post(`http://localhost:8000/seller/dashboard/profile/update`, sellerDetail)

            if (response.data.success === true) {
                const { name, email, sellerId, mobilenumber, company, address } = response.data.updateResult;
                setsellerDetail({
                    name: name,
                    email: email,
                    sellerId: sellerId,
                    company: company,
                    mobileno: mobilenumber,
                    locality: address.locality,
                    city: address.city,
                    state: address.state,
                    pincode: address.pincode
                })
                dispatch(setsellerProfileDetail(response.data.updateResult))
                setisEditable(true)
                setresponseMsg('Profile updated successfully')
            }
        } catch (error) {
            setresponseMsg('Failed to update profile, Please try later')
        }

        setTimeout(() => {
            setresponseMsg('')
        }, 7000);
    }

    return (
        <>
            {loading && (<div className="h1box"><h1>Loading...</h1></div>)}
            {err && (<div className="h1box"><h1>!Sorry, Something went wrong</h1></div>)}
            {!loading && !err && (
                <section className='sellerProfileBox'>
                    <div className='responseMsgHeading'>{responseMsg}</div>
                    <h2 className='sellerProfileHeading'>Seller Profile</h2>
                    <form onSubmit={(e) => e.preventDefault()} className='sellerDetailForm'>
                        <div className="sellerDetailHeading">FullName</div>
                        <input type="text" className='sellerDetailInput' onChange={sellerProfileChange} name="name" value={sellerDetail.name} readOnly={isEditable} />
                        <div className="sellerDetailHeading">Email</div>
                        <div className='sellerDetailInput'>{sellerDetail.email}</div>
                        <div className="sellerDetailHeading">SellerId</div>
                        <div className='sellerDetailInput'>{sellerDetail.sellerId}</div>
                        <div className="sellerDetailHeading">Company or Shop Name</div>
                        <input type="text" className='sellerDetailInput' onChange={sellerProfileChange} name="company" value={sellerDetail.company} readOnly={isEditable} />
                        <div className="sellerDetailHeading">Mobile Number</div>
                        <input type="number" className='sellerDetailInput' onChange={sellerProfileChange} name="mobileno" value={sellerDetail.mobileno} readOnly={isEditable} />
                        <h4>Address</h4>
                        <div className="sellerDetailHeading">House No. and Locality</div>
                        <input type="text" className='sellerDetailInput' onChange={sellerProfileChange} name="locality" value={sellerDetail.locality} readOnly={isEditable} />
                        <div className="sellerDetailHeading">City or District</div>
                        <input type="text" className='sellerDetailInput' onChange={sellerProfileChange} name="city" value={sellerDetail.city} readOnly={isEditable} />
                        <div className="sellerDetailHeading">State</div>
                        <input type="text" className='sellerDetailInput' onChange={sellerProfileChange} name="state" value={sellerDetail.state} readOnly={isEditable} />
                        <div className="sellerDetailHeading">Pincode</div>
                        <input type="number" className='sellerDetailInput' onChange={sellerProfileChange} name="pincode" value={sellerDetail.pincode} readOnly={isEditable} />
                        <div className="sellerProfileBtnBox">
                            <button className='sellerProfileBtn' onClick={() => setisEditable(false)} style={isEditable ? { opacity: 1 } : { opacity: 0.3 }} >Edit</button>
                            <button className='sellerProfileBtn' onClick={saveSellerProfile} disabled={isEditable ? true : false} style={isEditable ? { opacity: 0.3 } : { opacity: 1 }}>Save</button>
                        </div>
                    </form>
                </section>
            )}
        </>
    )
}

export default SellerProfile;