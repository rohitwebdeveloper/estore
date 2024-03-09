import React from "react";
import "./Billing.css";


const Billing = () => {

    return(
        <>
            <h1 className="billingHeading">Billing Details</h1>
        <div className="billingContainer">
            <div className="detailContainer">
                <input type="text"  placeholder="Enter Fullname" className="detailItem" />
                <input type="text"  placeholder="Enter Mobile Number" className="detailItem" />
                <input type="text"  placeholder="Enter Email Address" className="detailItem" />
                <input type="text" placeholder="Enter Address"  className="detailItem" />
                <input type="text"  placeholder="Enter City/Town" className="detailItem" />
                <input type="text"  placeholder="Enter State" className="detailItem" />
                <input type="text" placeholder="Area Pin-Code "  className="detailItem" />
            </div>
            <div className="paymentContainer"></div>
        </div>
        
        </>
    )
}

export default Billing;