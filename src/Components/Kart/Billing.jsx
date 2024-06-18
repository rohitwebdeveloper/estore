import React from "react";
import "./Billing.css";
import { useSelector } from "react-redux";
import { useState } from "react";


const Billing = () => {

    const [userDetail, setuserDetail] = useState({
        name:'',
        mobileno:'',
        email:'',
        address:'',
        city:'',
        state:'',
        pincode:''
    })
    const [isOnlineChecked, setisOnlineChecked] = useState(false)
    const [isCashChecked, setisCashChecked] = useState(false)
    const storeUserDetails = JSON.parse(sessionStorage.getItem('estoreUserprofile'))
    console.log(storeUserDetails)


    const order = useSelector((state) => state.orderdetails)
    console.log(order)

    return (
        <>
            <h1 className="billingHeading">Billing Details</h1>
            <main className="billingContainer">
                <section className="detailContainer">
                    <input type="text" placeholder="Enter Fullname" className="detailItem" value={userDetail.name} name='name' onChange={userDetailChange} />
                    <input type="text" placeholder="Enter Mobile Number" className="detailItem" value={userDetail.mobileno} name='mobileno' onChange={userDetailChange} />
                    <input type="text" placeholder="Enter Email Address" className="detailItem" value={userDetail.email} name='email' onChange={userDetailChange} />
                    <input type="text" placeholder="Enter Address" className="detailItem" value={userDetail.address} name='address' onChange={userDetailChange} />
                    <input type="text" placeholder="Enter City/Town" className="detailItem" value={userDetail.city} name='city' onChange={userDetailChange} />
                    <input type="text" placeholder="Enter State" className="detailItem" value={userDetail.state} name='state' onChange={userDetailChange} />
                    <input type="text" placeholder="Area Pin-Code " className="detailItem" value={userDetail.pincode} name='pincode' onChange={userDetailChange} />
                </section>
                <section className="paymentContainer">
                    <h2 className="paymentHeading">Order Summary</h2>
                    <div className="billingItemBox">
                        <div>
                            Samsung Galaxy S23 Ultra
                        </div>
                        <div>
                            320000
                        </div>
                    </div>
                    <div className="billingItemBox">
                        <div>
                            Samsung Galaxy S23 Ultra
                        </div>
                        <div>
                            320000
                        </div>
                    </div>
                    <div className="billingItemBox">
                        <div>
                            Samsung Galaxy S23 Ultra
                        </div>
                        <div>
                            320000
                        </div>
                    </div>
                    <div className="amountBox ">
                        <div>Amount</div>
                        <div>320000</div>
                    </div>
                    <div className="paymentModeBox">
                        <div>
                        <input type="radio" checked={isOnlineChecked} onClick={()=> {setisOnlineChecked(!isOnlineChecked); setisCashChecked(false)} } /> Online Payment (Credit/Debit Card, Digital Wallets, etc.)
                        </div>
                        <div>
                        <input type="radio" checked={isCashChecked} onClick = {()=> {setisCashChecked(!isCashChecked); setisOnlineChecked(false)}} /> Cash On Delivery (COD)
                        </div>
                    </div>
                    <button className="placeOrderBtn" >Place Order</button>
                </section>
            </main>

        </>
    )
}

export default Billing;