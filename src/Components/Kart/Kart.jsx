import React, { useState } from "react";
import './Kart.css';
// import Billing from "./Billing";
 import { useNavigate } from "react-router-dom";
// import { MdOutlineDeleteForever } from "react-icons/md";

const Kart = () => {
    const navigate = useNavigate(); 

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

    const handleProceed = ()=>{
        navigate('/billing')
        console.log('click');
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