import React, { useEffect, useState } from 'react'
import './Myorder.css'
import { IoStar } from "react-icons/io5";
import axios from 'axios';


const Myorder = () => {

    const userid = sessionStorage.getItem('usertoken')
    const [orderData, setorderData] = useState([])
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);
    const [noData, setnoData] = useState(false)

    useEffect(() => {
        //    Making a get request to the server to get all orders placed by user
        ; (async () => {
            try {
                setloading(true)
                seterror(false)
                const response = await axios.get(`http://localhost:8000/user/orders/${userid}`)
                setorderData(response.data)
                setloading(false)
                if (!response.data.length) {
                    setnoData(true)
                    return
                }

            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(true)
            }
        })()

    }, [])



    return (
        <>
            {loading && (<div className="h1box"><h2>Loading...</h2></div>)}
            {error && (<div className="h1box"><h2>Sorry, Something went wrong!</h2></div>)}
            {noData && (<div className="h1box"><h2>No Orders Found</h2></div>)}
            {!loading && !error && !noData && (

                <main className='myorderContainer'>
                    {orderData.map((data) => {
                        return (
                            <section key={data._id} className='orderItemSection'>
                                <div className="orderInfoBox">
                                    <div className="orderId">  OrderId :{data.orderid}</div>
                                    <div className="orderDate"> Ordered On : {data.orderdate}</div>
                                    <div className="orderStatus">OrderStatus : {data.status}</div>
                                    <div className="deliveryStatus">Expected to be delivered by : </div>
                                </div>
                                {data.orderitems.map((orderitemData) => {
                                    return (
                                        <div key={orderitemData._id} className="orderItemWrapper">
                                            <div className="orderItemBox">
                                                <div className="orderItemImg">
                                                    <img src={orderitemData.producturl} alt="" />
                                                </div>
                                                <div className="orderItemDetail">
                                                    <div className="orderItemTitle">
                                                        {orderitemData.producttile}
                                                    </div>
                                                    <div className="orderItemQty">Qty: {orderitemData.quantity}</div>
                                                    <div className="orderItemPrice">Amt: {orderitemData.subtotal}</div>
                                                </div>
                                            </div>
                                            <div className="ItemRatingAndStatusBox">
                                                <div className="rateItem"><IoStar /> Rate Product </div>
                                            </div>
                                        </div>

                                    )
                                })}

                                <div className="paymentAndDeliveryInfoBox">
                                    <div className="dileveryInfo">
                                    </div>
                                    <div className="totalAmount">Total Amount = {data.totalamount} </div>
                                </div>
                            </section>

                        )
                    })}

                </main>
            )}
            {/* <div className="orderItemStatus">Shipped</div>
                        <div className="deliveryStatus">Expected to be delivered by:</div> */}
            {/* <div className="orderItemPriceandQty">
            </div> */}
            {/* <details className='moreDetails'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum recusandae repudiandae obcaecati veniam unde eum corrupti, quibusdam repellat blanditiis temporibus doloribus commodi reiciendis, facere odit, laudantium incidunt suscipit nemo nisi.</details> */}
        </>
    )
}

export default Myorder;