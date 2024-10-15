import React, { useState, useEffect } from "react";
import apiurl from "../../api/apiConfig";
import './Kart.css';
import axios from "axios";
// import Billing from "./Billing";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setorderdetails, removeorderdetails } from "../../Reducers/orderSlice";
import ApiRequestHandler from "../../api/ApiRequestHandler";
import Loader from "../Loader/Loader";

const Kart = () => {

    const userid = sessionStorage.getItem('usertoken')
    const [loading, error, noData, data] = ApiRequestHandler(`${apiurl}/api/kart/${userid}`)
    const navigate = useNavigate();
    const [quantity, setquantity] = useState([]);
    const [kartData, setkartData] = useState([])
    const [subTotal, setsubTotal] = useState([])
    const [baseprice, setbaseprice] = useState([])
    const [total, settotal] = useState(0)
    const dispatch = useDispatch()


    useEffect(() => {
        setkartData(data)
        if (data && data.length > 0) {
            const initialQuantities = data.map(() => 1);
            const initialSubTotals = data.map((item) => item?.productdetail?.price || 0);
            const initialBasePrices = data.map((item) => item?.productdetail?.price || 0);

            setquantity(initialQuantities);
            setsubTotal(initialSubTotals);
            setbaseprice(initialBasePrices);

            const initialTotal = initialSubTotals.reduce((acc, curr) => acc + curr, 0);
            settotal(initialTotal);

            dispatch(removeorderdetails(0));
        }
    }, [data]);



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
            const response = await axios.delete(`${apiurl}/api/kart/${productid}`)
            if (response.status === 200) {

                setsubTotal(prevSubTotal => prevSubTotal.filter((item, i) => i !== index));
                setquantity(prevQuantity => prevQuantity.filter((item, i) => i !== index));
                setkartData(prevKartData => prevKartData.filter((item) => item._id !== productid));

                // Adjust the total after removing the item
                settotal(prevTotal => prevTotal - subtotalPrice);
                return
            }
        } catch (error) {
            alert('Failed to remove product from kart')
        }
    }

    // Handle place order 
    const handleProceed = async () => {
        try {
            // const amount = total + 60
            const response = await axios.post(`${apiurl}/api/orders/generate-id`, { total })
            const order = [kartData, quantity, subTotal, total, response.data.order.id]
            if (response.status == 200) {
                await dispatch(setorderdetails(order))
            }
            navigate('/billing')

        } catch (error) {
            alert('Sorry something went wrong, Internal server error')
        }
    }


    return (
        <div className="kartContainer">
            {loading && (<h2 style={{ textAlign: 'center', marginTop: '15%' }} ><Loader /></h2>)}
            {error && (<h2 style={{ textAlign: 'center', marginTop: '15%' }} >Sorry, Something went wrong!</h2>)}
            {noData && (<h2 style={{ textAlign: 'center', marginTop: '15%' }} >No Items Added in Kart !</h2>)}
            {!loading && !error && !noData && (
                <>
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
                                <div className="itemBox" key={data._id}>
                                    <div className="item kartProductimg ">
                                        <img src={data.productdetail.url} alt="" />
                                        <div className="kartProductName" style={{textAlign:'center'}}>{data.productdetail.title}</div>
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
                            )
                        })}

                    </div>
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
                </>
            )}

        </div>

    )
}

export default Kart;