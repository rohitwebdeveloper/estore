import React, { useState, useEffect } from "react";
import './Sellerorder.css';
import apiurl from "../../../api/apiConfig";
import axios from "axios";
import ApiRequestHandler from "../../../api/ApiRequestHandler";
import Loader from "../../Loader/Loader";



const Sellerorder = () => {

  const sellerid = sessionStorage.getItem('usertoken')
  const [loading, error, noData, data] = ApiRequestHandler(`${apiurl}/api/seller/orders/${sellerid}`)
  const [updateStatus, setupdateStatus] = useState([])
  const [orderStatusValue, setorderStatusValue] = useState('Pending')


  useEffect(() => {
  const newStatus =  data.map(currdata => false)
  setupdateStatus(newStatus)
  console.log(newStatus)
  }, [data])



  // // Making a request to update the product order status
  const updateOrderStausClick = async (idOrder, i) => {
    try {
      const response = await axios.patch(`${apiurl}/api/orders/status`, { orderStatusValue, idOrder })
      if (response.status == 200 && response.data.success) {
        alert(`Order status updated successfully!, Now it has been changed to: ${orderStatusValue} `)
        setupdateStatus((preval)=> {
          let newPreval = [...preval];
          newPreval[i] = !newPreval[i];
          return newPreval;
        })
      }
    } catch (error) {
      alert('Failed to update order status, Due to internal server error')
      console.log(error)
    }
  }


  const updateStatusClick = (i) => {
    setupdateStatus((preval) => {
      let newPreval = [...preval];
      newPreval[i] = !newPreval[i];  // Toggle the value at index i
      return newPreval;
    });
  };



  return (
    <>
      {loading && (<Loader />)}
      {error && (<h2>Sorry, Something went wrong</h2>)}
      {noData && (<h2>No Orders !</h2>)}
      {!loading && !error && !noData && (
        data.map((data, i) => {
          return (
            <main className="sellerOrderContainer" key={data._id}  >
              <section className="sellerCustomerDetails sellerOrderSection">
                <h3>Order Summary</h3>
                <p><strong>Order ID:</strong> {data.orderid}</p>
                <p><strong>Order Date:</strong> {data.orderdate}</p>
                <p><strong>Order Status:</strong> {data.status}</p>
              </section>
              <section className="sellerOrderSummary sellerOrderSection"  >
                <h3>Customer Details</h3>
                <p><strong>Name:</strong> {data.customerDetails.name}</p>
                <p><strong>Email:</strong> john.doe@example.com</p>
                <p><strong>Phone:</strong> {data.customerDetails.mobilenumber}</p>
                <p><strong>Shipping Address:</strong> {data.customerDetails.locality}, {data.customerDetails.city}, {data.customerDetails.state}, {data.customerDetails.pincode} </p>
              </section>
              <section className="sellerOrderItems sellerOrderSection" >
                <h3>Order Items</h3>
                {data.orderitems.map((productdata, index) => {
                  return (
                    <div className="sellerOrderedItem sellerOrderSection" key={index}>
                      <span><strong>Product Name:</strong> {productdata.producttitle} </span>
                      <span><strong>QTY:</strong> {productdata.quantity}</span>
                      <span><strong>Price:</strong> {productdata.price}</span>
                      <span><strong>Total:</strong> {productdata.subtotal}</span>
                    </div>
                  )
                })}
                <p><strong>Subtotal:</strong> {data.totalamount}</p>
              </section>
              <section className="sellerPaymentDetails sellerOrderSection">
                <h3>Payment Details</h3>
                <p><strong>Payment ID: </strong> {data.paymentid}</p>
                <p><strong>Payment Method: </strong>{data.payment.mode}</p>
                <p><strong>Total Amount: </strong> {data.totalamount}</p>
                <p><strong>Payment Status: </strong> {data.payment.status} </p>
              </section>
              <section className="sellerOrderActions sellerOrderSection">
                <h3>Order Actions</h3>
                {/* <button className="sellerOrderBtn" onClick={invoiceDownloadClick} >Download Invoice</button> */}
                <button className="sellerOrderBtn" onClick={() =>updateStatusClick(i)} >Update Status</button>
                <div className="updateOrderStatusBox" style={{visibility: updateStatus[i] ? 'visible' : 'hidden'}}  >
                  <select name="orderStatus" className="statusOptions" id="" value={orderStatusValue} onChange={((e) => setorderStatusValue(e.target.value))}  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                  <button className="sellerOrderBtn" onClick={() => updateOrderStausClick(data._id, i)} > Update</button>
                </div>
              </section>
            </main>
          )
        })

      )}
      {/* <img src={demoimg} alt="" className="demoimg" /> */}
    </>
  )
}

export default Sellerorder;