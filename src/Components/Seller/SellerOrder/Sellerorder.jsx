import React, { useState, useEffect, useRef } from "react";
import './Sellerorder.css';
import axios from "axios";
// import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";



const Sellerorder = () => {

  const sellerid = sessionStorage.getItem('usertoken')
  const [error, seterror] = useState(false)
  const [loading, setloading] = useState(false)
  const [noData, setnoData] = useState(false)
  const [sellerOrder, setsellerOrder] = useState([])
  const [demoimg, setdemoimg] = useState()
  const [orderStatusValue, setorderStatusValue] = useState('Pending')
  const [statusVisibility, setstatusVisibility] = useState('hidden')
  const invoiceRef = useRef(null)
  // const options = {
  //   filename: 'my-document.pdf',
  //   margin: 0.5,
  //   image: { type: 'jpeg', quality: 1 },
  //   html2canvas: { scale: 2 },
  //   jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  // };


  useEffect(() => {
      //  handles the request to get all orders of seller
    ; (async () => {
      try {
        setloading(true)
        seterror(false)
        const response = await axios.get(`http://localhost:8000/seller/dashboard/order/${sellerid}`)
        setsellerOrder(response.data)
        setloading(false)
        if (!response.data.length) {
          setnoData(true)
        }
      } catch (error) {
        seterror(true)
        setloading(false)
      }
    })()
  }, [])


  const invoiceDownloadClick = async () => {
    try {
      const invoiceInfo = invoiceRef.current;
      console.log(invoiceInfo)
      // await window.scrollTo(0, 0)
      // invoiceInfo.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Capture the invoice as an image
      const photo = await html2canvas(invoiceInfo,
        //    {
        //   allowTaint: false,
        //  foreignObjectRendering:true,
        //   width: invoiceInfo.scrollWidth,  // Set the canvas width to the element's full width
        //   height: invoiceInfo.scrollHeight, // Set the canvas height to the element's full height
        //   windowHeight: invoiceInfo.scrollHeight,
        //   scrollY: -window.scrollY,
        //   scale: 2, // Increase the scale for higher resolution
        //   useCORS: true, // Enable CORS to handle images loaded from other origins
        // }
      );
      const pdfImg = await photo.toDataURL('image/png')
      await setdemoimg(pdfImg)
      // const doc = new jsPDF();
      // doc.addImage(pdfImg, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight())
      // doc.save('estorebill.pdf')

    } catch (error) {
      console.error(error)
    }
  }

// // Making a request to update the product order status
const updateOrderStausClick = async (idOrder) => {
  try {
     const response = await axios.patch(`http://localhost:8000/seller/dashboard/order/status-update`, {orderStatusValue, idOrder})
     if(response.status==200 && response.data.success) {
      setstatusVisibility('hidden')
     }
  } catch (error) {
      seterror(true)
  }
}




  return (
    <>
      {loading && (<h2>Loading...</h2>)}
      {error && (<h2>Sorry, Something went wrong</h2>)}
      {noData && (<h2>No Orders !</h2>)}
      {!loading && !error && !noData && (
        sellerOrder.map((data) => {
          return (
            <main className="sellerOrderContainer" key={data._id} ref={invoiceRef} >
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
                <button className="sellerOrderBtn" onClick={invoiceDownloadClick} >Download Invoice</button>
                <button className="sellerOrderBtn" onClick={() => setstatusVisibility('visible')} >Update Status</button>
                <div className="updateOrderStatusBox" style={{ visibility: statusVisibility }} >
                  <select name="orderStatus" id="" value={orderStatusValue} onChange={((e) => setorderStatusValue(e.target.value))}  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                   <button className="sellerOrderBtn" onClick={() => updateOrderStausClick(data._id)} > Update</button>
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