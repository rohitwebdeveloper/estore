// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Route, Routes, NavLink } from 'react-router-dom'
import "./Category.css"
import Electronics from "./Electronics/Electronics";
import Fashion from "./Fashion/Fashion";
import Appliance from "./Appliance/Appliance";
import Beauty from "./Beautyskin/Beauty";


const Category = () => {

    return (
        <>
            <div className="main_area">
                <div className="category_section">
                    <div className="category_box">
                        {/* <h2 className="category_heading">Categories</h2> */}
                        <ul className="category">
                            <li ><NavLink  className="category_items" to="fashion" >Fashion&Cloth </NavLink></li>
                            <li ><NavLink className="category_items" to="electronics" >Electonics</NavLink></li>
                            <li ><NavLink className="category_items" to="beautyskin">Beauty&Skin</NavLink></li>
                            <li><NavLink className="category_items" to="appliance">Appliances</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="dynamic_content">
                    <Routes>
                        <Route path="fashion" element={<Fashion/>}></Route>
                        <Route path="electronics" element={<Electronics/>}></Route>
                        <Route path="beautyskin" element={<Beauty/>}></Route>
                        <Route path="appliance" element={<Appliance/>}></Route>
                       {/* <Route path="homekitchen" element={<Homekitchen/>}></Route> */}
                    </Routes>
                </div>
            </div>

        </>
    )
}

export default Category;