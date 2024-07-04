import React from "react";
import "./Billing.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";


const Billing = () => {

    const [userDetail, setuserDetail] = useState({
        name: '',
        mobileno: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    })
    const [isOnlineChecked, setisOnlineChecked] = useState(false)
    const [isCashChecked, setisCashChecked] = useState(false)
    const storedUserDetails = JSON.parse(sessionStorage.getItem('estoreUserprofile'))
    const order = useSelector((state) => state.orderdetails)[0]
    console.log(order)
    const userId = sessionStorage.getItem('usertoken')
    const [paymentId, setpaymentId] = useState('')
    const [Rasorpay] = useRazorpay()
    const navigate = useNavigate()
    const options = {
        key: "rzp_test_DtCuAcztnIMxzF",
        amount: order[3],
        currency: "INR",
        name: "E-Store",
        description: "Test Transaction",
        // "image": "https://example.com/your_logo",
        order_id: order[4],
        callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        handler: async function (response) {

            const { razorpay_payment_id } = response;
            try {
                if (response.razorpay_payment_id) {
                    const response = await axios.post(`http://localhost:8000/user/order-place`, { order, userDetail, userId, razorpay_payment_id })
                    console.log(response)
                    if (response.status == 200) {
                        navigate('/billing/orderplaced')
                    }
                    return
                } else {
                    alert('Payment failed')
                }
            } catch (error) {
                console.log(error)
            }
        },
        prefill: {
            name: "Rohit Kushwaha",
            email: "rohitkushwaha@example.com",
            contact: "7999344193",
            notes: {
                address: "Kolar Road, Bhopal"
            },
            theme: {
                'color': "#ffff"
            }
        }
    };

    const rap = new Rasorpay(options);

    useEffect(() => {
        if (Object.keys(storedUserDetails).length) {
            setuserDetail({
                name: storedUserDetails.name,
                address: storedUserDetails.address,
                mobileno: storedUserDetails.mobilenumber,
                //  email:storedUserDetails.email
            })
            return
        }
    }, [userDetail.name])

    const userDetailChange = (event) => {
        const { name, value } = event.target;
        setuserDetail((preval) => {
            return { ...preval, [name]: value }
        })
    }

    const placeOrderClick = async () => {

        const { name, mobileno, address, city, state, pincode } = userDetail;
        if (!name || !mobileno || !address || !city || !state || !pincode) {
            alert('Please fill all details')
            return
        }
        if (isCashChecked == false && isOnlineChecked == false) {
            alert('Please Select the mode of payment')
            return
        }

        try {

            if (isCashChecked == true && isOnlineChecked == false) {
                const response = await axios.post(`http://localhost:8000/user/order-place`, { order, userDetail, userId })
                if (response.status == 200) {
                    navigate('/billing/orderplaced')
                }
                return
            }
            if (isOnlineChecked == true && isCashChecked == false) {
                await rap.open()
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1 className="billingHeading">Billing Details</h1>
            <main className="billingContainer">
                <section className="detailContainer">
                    <input type="text" placeholder="Enter Fullname" className="detailItem" value={userDetail.name} name='name' onChange={userDetailChange} />
                    <input type="text" placeholder="Enter Mobile Number" className="detailItem" value={userDetail.mobileno} name='mobileno' onChange={userDetailChange} />
                    {/* <input type="text" placeholder="Enter Email Address" className="detailItem" value={userDetail.email} name='email' onChange={userDetailChange} /> */}
                    <input type="text" placeholder="Enter Address" className="detailItem" value={userDetail.address} name='address' onChange={userDetailChange} />
                    <input type="text" placeholder="Enter City/Town" className="detailItem" value={userDetail.city} name='city' onChange={userDetailChange} />
                    <input type="text" placeholder="Enter State" className="detailItem" value={userDetail.state} name='state' onChange={userDetailChange} />
                    <input type="text" placeholder="Area Pin-Code " className="detailItem" value={userDetail.pincode} name='pincode' onChange={userDetailChange} />
                </section>
                <section className="paymentContainer">
                    <h2 className="paymentHeading">Order Summary</h2>
                    {order[0].map((data) => {
                        return (
                            <>
                                <div className="billingItemBox">
                                    <div>{data.productdetail.title} </div>
                                    <div>{data.productdetail.price}</div>
                                </div>
                            </>
                        )
                    })}
                    <div className="amountBox ">
                        <div>Amount</div>
                        <div>{order[3]}</div>
                    </div>
                    <div className="paymentModeBox">
                        <div>
                            <input type="radio" checked={isOnlineChecked} onClick={() => { setisOnlineChecked(!isOnlineChecked); setisCashChecked(false) }} /> Online Payment (Credit/Debit Card, Digital Wallets, etc.)
                        </div>
                        <div>
                            <input type="radio" checked={isCashChecked} onClick={() => { setisCashChecked(!isCashChecked); setisOnlineChecked(false) }} /> Cash On Delivery (COD)
                        </div>
                    </div>
                    <button className="placeOrderBtn" onClick={placeOrderClick} >Place Order</button>
                </section>
            </main>

        </>
    )
}

export default Billing;