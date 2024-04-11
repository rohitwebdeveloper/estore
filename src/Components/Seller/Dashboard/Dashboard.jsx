import React from "react";
import './Dashboard.css'
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Addproduct from "../Product/Addproduct";
import SellerProfile from "../Profile/SellerProfile";
import { useSelector } from "react-redux";


const Dashboard = () => {
    
    const authorizeStatus = useSelector((state)=>state.authenticate.value)
    const navigate = useNavigate()

     //   Defining action for gotosignin button
     const goToSignInClick = () => {
        navigate('/signin')
    }

    return(
        <>
        {authorizeStatus && (
            <main className="dashboardContainer">
            <aside className="dashboardSidebar">
                <h3 className="dashboardHeading">Dashboard</h3>
                <ul>
                    <li className="dashboardListItem"><NavLink to="profile">Profile</NavLink></li>
                    <li className="dashboardListItem">Orders</li>
                    <li className="dashboardListItem">Products</li>
                    <li className="dashboardListItem"><NavLink to="addproduct" >Add Product +</NavLink></li>
                </ul>
            </aside>
            <section className="dashboardContent">
               <Routes>
                <Route path="addproduct" element={<Addproduct/>} />
                <Route path="profile" element={<SellerProfile/>} />
               </Routes>
            </section>
         </main>
        )}
        {!authorizeStatus && (
            <section className="sellerMessageBox">
            <div className="signInMessage" >To Register as a Seller, Please Signin</div>
            <button className="goToSignInBtn" onClick={goToSignInClick} >Go To Sign In</button>
        </section>
        )}
         
        </>
    )
}

export default Dashboard;

