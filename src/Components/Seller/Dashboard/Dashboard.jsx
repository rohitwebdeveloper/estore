import React, {useState} from "react";
import './Dashboard.css'
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Addproduct from "../Product/Addproduct";
import SellerProfile from "../Profile/SellerProfile";
import Sellerproduct from "../SellerProduct/Sellerproduct";
import Sellerorder from "../SellerOrder/Sellerorder";
import { useSelector } from "react-redux";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";


const Dashboard = () => {
    
    const authorizeStatus = useSelector((state)=>state.authenticate.value)
    const navigate = useNavigate()
    const [isActive, setisActive] = useState(false)

     //   Defining action for gotosignin button
     const goToSignInClick = () => {
        navigate('/signin')
    }

    const slideSellerDashboard = () => {
          setisActive(!isActive)
    }

    return(
        <>
        {authorizeStatus && (
            <main className="dashboardContainer">
                <div className="dashboardslidearrow" onClick={slideSellerDashboard} >{isActive ? <MdOutlineKeyboardDoubleArrowLeft/> : <MdOutlineKeyboardDoubleArrowRight/> }</div>
            <aside className={`dashboardSidebar ${isActive ? 'active' : ''}`}>
                <h3 className="dashboardHeading">Dashboard</h3>
                <ul>
                    <li className="dashboardListItem"><NavLink to="profile">Profile</NavLink></li>
                    <li className="dashboardListItem"> <NavLink to="order">Orders</NavLink> </li>
                    <li className="dashboardListItem"> <NavLink to="product" >Products</NavLink> </li>
                    <li className="dashboardListItem"><NavLink to="addproduct" >Add Product +</NavLink></li>
                </ul>
            </aside>
            <section className="dashboardContent">
               <Routes>
                <Route path="addproduct" element={<Addproduct/>} />
                <Route path="profile" element={<SellerProfile/>} />
                <Route path="product" element={<Sellerproduct/>} />
                <Route path="order" element={<Sellerorder/>} />
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

