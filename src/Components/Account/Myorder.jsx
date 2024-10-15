import React, { useState, useEffect, useCallback } from 'react';
import './Myorder.css';
import apiurl from '../../api/apiConfig';
import { IoStar } from 'react-icons/io5';
import ApiRequestHandler from '../../api/ApiRequestHandler';
import Loader from '../Loader/Loader';
import axios from 'axios';

const Myorder = () => {
  const userid = sessionStorage.getItem('usertoken');
  const [loading, error, noData, data] = ApiRequestHandler(`${apiurl}/api/orders/${userid}`);
  const [ratingVal, setRatingVal] = useState([]);
  const [visibilityVal, setVisibilityVal] = useState([]);

  useEffect(() => {
    const newVisibilityVal = data.map(orderitemData =>
      orderitemData.orderitems.map(() => false)
    );
    setVisibilityVal(newVisibilityVal);

    const newRatingVal = data.map(orderitemData =>
      orderitemData.orderitems.map(() => '')
    );
    setRatingVal(newRatingVal);
  }, [data]);



  const ratingOnChange = useCallback((event, idx, index) => {
    const updatedRatingVal = [...ratingVal];
    updatedRatingVal[idx][index] = event.target.value;
    setRatingVal(updatedRatingVal);
  }, [ratingVal]);



  const rateProductClick = useCallback((idx, index) => {
    const updatedVisibilityVal = [...visibilityVal];
    updatedVisibilityVal[idx][index] = !updatedVisibilityVal[idx][index];
    setVisibilityVal(updatedVisibilityVal);
  }, [visibilityVal]);



  const ratingSubmitClick = useCallback(async (productid, ratedVal, orderId, orderitemId) => {
    if (!ratedVal || ratedVal > 5 || ratedVal < 0) {
      alert('Rate product out of 5. Rating should not be more than 5 and less than 0');
      return;
    }
    try {
      const response = await axios.post(`${apiurl}/api/products/rating`, { userid, productid, ratedVal, orderId, orderitemId });
      if (response.status === 200 && response.data.success) {
        // console.log(response)
        alert('Thank You! Your Rating has been saved successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error while submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    }
  }, [userid]);


  const formatDate = (dateString) => {
    const date = new Date(dateString).toLocaleDateString(undefined, {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    return date
  }

  return (
    <>
      {loading && <Loader />}
      {error && <div className="h1box"><h2>Sorry, Something went wrong!</h2></div>}
      {noData && <div className="h1box"><h2>No Orders Found</h2></div>}
      {!loading && !error && !noData && (
        <main className="myorderContainer">
          {data.map((orderData, idx) => (
            <section key={orderData._id} className="orderItemSection">
              <div className="orderInfoBox">
                <div className="orderId">OrderId: {orderData.orderid}</div>
                <div className="orderDate">Ordered On: {formatDate(orderData.orderdate)}</div>
                <div className="orderStatus">OrderStatus: {orderData.status}</div>
              </div>
              {orderData.orderitems.map((orderitemData, index) => (
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
                    <div className="rateItem" onClick={() => !orderitemData.rating && rateProductClick(idx, index)}>
                      <IoStar />
                      {orderitemData.rating ? ` Rated ${orderitemData.rating} / 5 ` : ' Rate Product'}
                    </div>
                    {visibilityVal[idx]?.[index] && (
                      <div>
                        <input type="number" className="ratingInput" onChange={(event) => ratingOnChange(event, idx, index)} value={ratingVal[idx]?.[index] || ''} />
                        <button className="ratingSubmit" onClick={() => ratingSubmitClick(orderitemData.product, ratingVal[idx]?.[index], orderData.orderid, orderitemData._id)}>Submit</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="paymentAndDeliveryInfoBox">
                <div className="totalAmount">Total Amount = {orderData.totalamount}</div>
              </div>
            </section>
          ))}
        </main>
      )}
    </>
  );
}

export default Myorder;