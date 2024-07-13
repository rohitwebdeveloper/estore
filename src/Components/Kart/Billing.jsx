import React, { useState, useEffect } from "react";
import "./Billing.css";
import { useSelector, useDispatch } from "react-redux";
import { removeorderdetails } from "../../Reducers/orderSlice";
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
    const [error, seterror] = useState(false)
    const [isOnlineChecked, setisOnlineChecked] = useState(false)
    const [isCashChecked, setisCashChecked] = useState(false)
    const storedUserDetails = JSON.parse(sessionStorage.getItem('estoreUserprofile'))
    const order = useSelector((state) => state.orderdetails)[0]
    const dispatch = useDispatch()
    const userId = sessionStorage.getItem('usertoken')
    const [Rasorpay] = useRazorpay()
    const navigate = useNavigate()

    // Configuration options for initializing the Razorpay payment gateway
    const options = {
        key: "rzp_test_DtCuAcztnIMxzF",
        amount: order?.[3] || "",
        currency: "INR",
        name: "E-Store",
        description: "Test Transaction",
        order_id: order?.[4],
        callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        handler: async function (response) {
            // Handler function to be executed after payment is completed.
            const { razorpay_payment_id } = response;
            try {
                if (response.razorpay_payment_id) {
                    // Sending payment details to the server for order placement
                    const response = await axios.post(`http://localhost:8000/user/order-place`, { order, userDetail, userId, razorpay_payment_id })
                    if (response.status == 200) {
                        // Redirection the user to order placed page when the response is successfull
                        navigate('/billing/orderplaced')
                    }
                    return
                } else {
                    // Incase if payment is failed then giving alert of payment failed to user
                    alert('Payment failed')
                }
            } catch (error) {
                seterror(true)
            }
        },
        // User details to be stored with the payment
        prefill: {
            name: storedUserDetails?.name || 'User name',
            email: storedUserDetails?.email || 'User email',
            contact: storedUserDetails?.mobilenumber || 'User mobilenumber',
            theme: {
                'color': "#ffff"
            }
        }
    };


    // Initializing Razorpay with above options
    const rap = new Rasorpay(options);


    useEffect(() => {
        if (storedUserDetails) {
            setuserDetail({
                name: storedUserDetails.name,
                address: storedUserDetails.address,
                mobileno: storedUserDetails.mobilenumber,
            })
            return
        }
    }, [])


    // Handles the change event for user detail input fields. 
    const userDetailChange = (event) => {
        const { name, value } = event.target;
        setuserDetail((preval) => {
            return { ...preval, [name]: value }
        })
    }

    // Handles action to be executed on click or placeorder
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
            //   Checking the mode of payment selected by the user   
            if (isCashChecked == true && isOnlineChecked == false) {
                const response = await axios.post(`http://localhost:8000/user/order-place`, { order, userDetail, userId })
                if (response.status == 200) {
                    dispatch(removeorderdetails(0))
                    navigate('/billing/orderplaced')
                }
                return
            }
            if (isOnlineChecked == true && isCashChecked == false) {
                await rap.open()
            }

        } catch (error) {
            seterror(true)
        }
    }

    return (
        <>
            <h1 className="billingHeading">Billing Details</h1>
            <main className="billingContainer">
                {!order && (<><div>
                    <h2 style={{ marginTop: '60px' }}> Go To Kart To Place Order ! </h2>
                    <button className="goToKartBtn" onClick={() => navigate('/kart')}>Go To Kart</button>
                </div></>
                )}
                {error && (<h2>Sorry, Something went wrong in placing order !</h2>)}
                {order && (
                    <>
                        <section className="detailContainer">
                            <input type="text" placeholder="Enter Fullname" className="detailItem" value={userDetail.name} name='name' onChange={userDetailChange} />
                            <input type="text" placeholder="Enter Mobile Number" className="detailItem" value={userDetail.mobileno} name='mobileno' onChange={userDetailChange} />
                            {/* <input type="text" placeholder="Enter Email Address" className="detailItem" value={userDetail.email} name='email' onChange={userDetailChange} /> */}
                            <input type="text" placeholder="Enter Address" className="detailItem" value={userDetail.address} name='address' onChange={userDetailChange} />
                            <input type="text" placeholder="Enter City/Town" className="detailItem" value={userDetail.city} name='city' onChange={userDetailChange} />
                            <input type="text" placeholder="Enter State" className="detailItem" value={userDetail.state} name='state' onChange={userDetailChange} />
                            <input type="text" placeholder="Area Pin-Code " className="detailItem" value={userDetail.pincode} name='pincode' onChange={userDetailChange} />
                        </section><section className="paymentContainer">
                            <h2 className="paymentHeading">Order Summary</h2>
                            {order[0].map((data) => {
                                return (
                                    <div className="billingItemBox" key={data._id}>
                                        <div>{data.productdetail.title} </div>
                                        <div>{data.productdetail.price}</div>
                                    </div>
                                );
                            })}
                            <div className="amountBox ">
                                <div>Amount</div>
                                <div>{order[3]}</div>
                            </div>
                            <div className="paymentModeBox">
                                <div>
                                    <input type="radio" checked={isOnlineChecked} onClick={() => { setisOnlineChecked(!isOnlineChecked); setisCashChecked(false); }} onChange={(e) => e.target.value} /> Online Payment (Credit/Debit Card, Digital Wallets, etc.)
                                </div>
                                <div>
                                    <input type="radio" checked={isCashChecked} onClick={() => { setisCashChecked(!isCashChecked); setisOnlineChecked(false); }} onChange={(e) => e.target.value} /> Cash On Delivery (COD)
                                </div>
                            </div>
                            <button className="placeOrderBtn" onClick={placeOrderClick}>Place Order</button>
                        </section>
                    </>
                )}
            </main>
        </>
    )
}

export default Billing;