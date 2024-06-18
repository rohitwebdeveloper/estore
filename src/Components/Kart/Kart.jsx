import React, { useState, useEffect } from "react";
import './Kart.css';
import useRazorpay from 'react-razorpay'
import axios from "axios";
// import Billing from "./Billing";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setorderdetails } from "../../Reducers/orderSlice";

const Kart = () => {
    const navigate = useNavigate();
    const [Rasorpay] = useRazorpay();
    const [orderid, setorderid] = useState('order_IluGWxBm9U8zJ8');
    const [quantity, setquantity] = useState([]);
    const userid = sessionStorage.getItem('usertoken')
    const [kartData, setkartData] = useState([])
    const [subTotal, setsubTotal] = useState([])
    const [baseprice, setbaseprice] = useState([])
    const [total, settotal] = useState(0)
    const dispatch = useDispatch()


    useEffect(() => {
        ; (async () => {
            try {
                // Fetches the kart details for a specific user.
                const response = await axios.get(`http://localhost:8000/user/kart/${userid}`)
                console.log(response.data)
                setkartData(response.data)

                for (let index = 0; index < response.data.length; index++) {
                    await quantity.push(1);
                    await subTotal.push(response.data[index].productdetail.price)
                    await baseprice.push(response.data[index].productdetail.price)
                }
                await subTotal.forEach(data => settotal(previoustotal => data + previoustotal));
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])


    // Handles the increment of a product quantity in the kart. 
    const handleincrement = (index) => {

        setquantity((preval) => {
            preval[index]++
            return [...preval]
        })

        setsubTotal(() => {
            subTotal[index] = baseprice[index] * quantity[index]
            return [...subTotal]
        })

        settotal(previoustotal => previoustotal + baseprice[index])
    }

    // Handles the decrement of a product quantity in the kart.
    const handledecrement = (index) => {
        if (quantity[index] <= 1) {
            setquantity((preval) => {
                preval[index]
                return [...preval]
            })
        } else {

            setquantity((preval) => {
                preval[index]--
                return [...preval]
            })

            setsubTotal(() => {
                subTotal[index] = baseprice[index] * quantity[index]
                return [...subTotal]
            })

            settotal(previoustotal => previoustotal - baseprice[index])
        }

    }

    // Handles the removal of a product from the kart.
    const removeKartItem = async (productid, index, subtotalPrice) => {
        try {
            const response = await axios.delete(`http://localhost:8000/user/kart/remove-product/${productid}`)
            if (response.status === 200) {
                setkartData(kartData.filter((data) => data._id != productid))
                settotal(previoustotal => previoustotal - subtotalPrice)
                subTotal.splice(index, 1)
                quantity.splice(index, 1)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const options = {
        key: "rzp_test_DtCuAcztnIMxzF",
        amount: "10900",
        currency: "INR",
        name: "E-Store",
        description: "Test Transaction",
        // "image": "https://example.com/your_logo",
        order_id: orderid,
        callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        handler: function (response) {
            console.log(response)
            console.log('PaymentId:', response.razorpay_payment_id);
            console.log('OrderId', response.razorpay_order_id);
            console.log('Signature', response.razorpay_signature)
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

    
    // const handleProceed = async (e) => {
    //     const rap = new Rasorpay(options);
    //     try {
    //         const response = await axios.get('http://localhost:8000/user/order')
    //         console.log("This is response :", response)
    //          await setorderid(response.data.order.id)
    //         await rap.open();
    //     } catch (error) {
    //         console.log("This is an error:", error)
    //     }
    //     e.preventDefault();
    //     // navigate('/billing')
    //     console.log(rap);
    // }

    const handleProceed = () => {
        const order = [kartData, quantity, subTotal, total]
        dispatch(setorderdetails(order))
        navigate('/billing')
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
                        <div className="heading"></div>
                    </div>
                    {kartData.map((data, index) => {
                        return (
                            <>
                                <div className="itemBox" key={data._id}>
                                    <div className="item kartProductimg ">
                                        <img src={data.productdetail.url} alt="" />
                                        <div className="kartProductName">{data.productdetail.title}</div>
                                    </div>
                                    <div className="item kartPrice ">{data.productdetail.price}</div>
                                    <div className="item kartQuantity ">
                                        <div className="quantityValue" > {quantity[index]}</div>
                                        <div className="increanddecre">
                                            <div className="incre" onClick={() => handleincrement(index)} >+</div>
                                            <div className="decre" onClick={() => handledecrement(index)} >_</div>
                                        </div>
                                    </div>
                                    <div className="item total " >{subTotal[index]}</div>
                                    {/* <div className="item total "> {subTotal[index]}</div> */}
                                    <div className="removeKartItemBtn" onClick={() => removeKartItem(data._id, index, subTotal[index])}><MdOutlineDeleteForever /></div>
                                </div>
                            </>
                        )
                    })}

                </div>
                {/* <div className="couponBox">
                    <input type="text" className="couponCode" placeholder="Enter coupon code" />
                    <button className="applyBtn">Apply Coupon</button>
                </div> */}
                <div className="checkoutContainer">
                    <div className="checkoutBox">
                        <div className="checkoutItem">
                            <div className="subTotal">Subtotal:</div>
                            <div className="subtotalAmt">{total}</div>
                        </div>
                        <div className="checkoutItem">
                            <div className="shipping">Shipping:</div>
                            <div className="shippingAmt">{total > 500000 ? 'Free' : 60}</div>
                        </div>
                        <div className="checkoutItem">
                            <div className="total">total:</div>
                            <div className="totalAmt"  > {total > 500000 ? total : total + 60} </div>
                        </div>
                        <button className="checkoutBtn" onClick={handleProceed} >Proceed to checkout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Kart;