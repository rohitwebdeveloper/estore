import React, { useState } from "react";
import './Kart.css';
import useRazorpay from 'react-razorpay'
import axios from "axios";
// import Billing from "./Billing";
import { useNavigate } from "react-router-dom";
// import { MdOutlineDeleteForever } from "react-icons/md";

const Kart = () => {
    const navigate = useNavigate();
    const [Rasorpay] = useRazorpay();
    const [orderid, setorderid] = useState('order_Nrhjm62zyNcenN');
    const [quantity, setquantity] = useState(0);

    const handleincrement = () => {
        // let b = quantity + 1 ;
        setquantity(quantity + 1);
    }

    const handledecrement = () => {
        setquantity((num) => {
            if (num <= 0) {
                return num
            } else {
                return num - 1
            }
        });
    }

    const options = {
        key: "rzp_test_o92dfjzqmiEpC6", 
        amount: "10900", 
        currency: "INR",
        name: "E-Store",
        description: "Test Transaction",
        // "image": "https://example.com/your_logo",
        order_id: orderid, 
        // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        handler: function (response){
            console.log(response)
            console.log('PaymentId:',response.razorpay_payment_id);
            console.log('OrderId',response.razorpay_order_id);
            console.log('Signature',response.razorpay_signature)
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
    
    const handleProceed = async (e) => {
        try {
            const response = await axios.get('http://localhost:8000/user/order')
            console.log(response.data.order)
        //    await setorderid(response.data.order.id)
            await rap.open();
        } catch (error) {
            console.log("This is an error:", error)
        }
        e.preventDefault();
        // navigate('/billing')
        // console.log(rap);
    }

    return (
        <>
            <div className="kartContainer">
                <div className="kartBox">
                    <div className="headingBox">
                        <div className="heading">Product</div>
                        <div className="heading">Price</div>
                        <div className="heading">Quantity</div>
                        <div className="heading">Total</div>
                    </div>
                    <div className="itemBox">
                        <div className="item kartProductimg "></div>
                        <div className="item kartPrice ">1400</div>
                        <div className="item kartQuantity ">
                            <div className="quantityValue">{quantity}</div>
                            <div className="increanddecre">
                                <div className="incre" onClick={handleincrement} >+</div>
                                <div className="decre" onClick={handledecrement} >_</div>
                            </div>
                        </div>
                        <div className="item total ">7000</div>
                    </div>
                    <div className="itemBox">
                        <div className="item kartProductimg "></div>
                        <div className="item kartPrice ">1400</div>
                        <div className="item kartQuantity ">
                            <div className="quantityValue">{quantity}</div>
                            <div className="increanddecre">
                                <div className="incre" onClick={handleincrement} >+</div>
                                <div className="decre" onClick={handledecrement} >_</div>
                            </div>
                        </div>
                        <div className="item total ">500</div>
                    </div>
                    <div className="itemBox">
                        <div className="item kartProductimg "></div>
                        <div className="item kartPrice ">1400</div>
                        <div className="item kartQuantity ">
                            <div className="quantityValue">{quantity}</div>
                            <div className="increanddecre">
                                <div className="incre" onClick={handleincrement} >+</div>
                                <div className="decre" onClick={handledecrement} >_</div>
                            </div>
                        </div>
                        <div className="item total ">1100</div>
                    </div>
                </div>
                <div className="couponBox">
                    <input type="text" className="couponCode" placeholder="Enter coupon code" />
                    <button className="applyBtn">Apply Coupon</button>
                </div>
                <div className="checkoutContainer">
                    <div className="checkoutBox">
                        <div className="checkoutItem">
                            <div className="subTotal">Subtotal:</div>
                            <div className="subtotalAmt">10,499</div>
                        </div>
                        <div className="checkoutItem">
                            <div className="shipping">Shipping:</div>
                            <div className="shippingAmt">200</div>
                        </div>
                        <div className="checkoutItem">
                            <div className="grandTotal">Grandtotal:</div>
                            <div className="grandtotalAmt">10,699</div>
                        </div>
                        <button className="checkoutBtn" onClick={handleProceed} >Proceed to checkout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Kart;