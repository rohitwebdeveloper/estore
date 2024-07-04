import React from "react";
import './Orderplaced.css';
import { useNavigate } from "react-router-dom";


const Orderplaced = () => {

    const navigate = useNavigate()
    
    const handleGoKart = () => {
        navigate('/kart')
    }

    
    return (
        <>
            <main className="orderContainer">
                <div className="orderHeading">Your Order has been placed !</div>
                <button className="orderButton" onClick={handleGoKart}>Go Back To Kart</button>
            </main>
        </>
    )
}

export default Orderplaced;