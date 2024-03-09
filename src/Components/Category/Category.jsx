// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, Routes, NavLink } from 'react-router-dom'
import "./Category.css"
import Electronic from "./Electonic/Electronic";
import Fashion from "./Fashion/Fashion";
import Appliance from "./Appliance/Appliance";
import Beauty from "./Beautyskin/Beauty";
import Mobiles from "./Mobile/Mobiles";
// import { CiMobile3 } from "react-icons/ci";
// import Homekitchen from "./HomeKitchen/Homekitchen";
// import Categorydata from "./categorydata";


const Category = () => {

    // Defining the click action when filter are applied

    // const onchangecheckbox = ()=>{
    //      let checkboxval = [...document.querySelectorAll('.checkbox')].filter((data)=>data.checked).map((check)=>check.value);
    //      console.log(checkboxval);
    //      let filterdata = categoryfilter.filter((filter)=>checkboxval.includes(filter.gender || filter.brand))
    //      console.log(filterdata);
    //      if (checkboxval.length===0) {
    //         setcategoryimg(categoryfilter);
    //      } else {
    //          setcategoryimg(filterdata);
    //      }
    // }     


    // const handlefilter_men = ()=>{
    //     let images = categoryimg.filter((data) => data.gender=='men');
    //     let boxval= document.querySelector('#men').checked;
    //     if (boxval===true) {
    //         setcategoryimg(images);
    //     } else if(boxval===false) {
    //         setcategoryimg(categoryfilter);
    //     }
        
    // }
    // const handlefilter_women = ()=>{
    //     let images = categoryimg.filter((data) => data.gender=='women');
    //     let boxval = document.querySelector('#women').checked;
    //     console.log(boxval);
    //     if (boxval===true) {
    //         setcategoryimg(images)
    //     } else if(boxval===false) {
    //         setcategoryimg(categoryfilter);
    //     }
    // }
   
  



    return (
        <>
            <div className="main_area">
                <div className="category_section">
                    <div className="category_box">
                        {/* <h2 className="category_heading">Categories</h2> */}
                        <ul className="category">
                            <li ><NavLink  className="category_items" to="" >Fashion </NavLink></li>
                            <li ><NavLink className="category_items" to="electronic" >Electonic</NavLink></li>
                            <li ><NavLink className="category_items" to="beautyskin">Beauty&Skin</NavLink></li>
                            <li><NavLink className="category_items" to="appliance">Appliance</NavLink></li>
                            <li ><NavLink  className="category_items"to="mobiles">Mobiles</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="dynamic_content">
                    <Routes>
                        <Route path="" element={<Fashion/>}></Route>
                        <Route path="electronic" element={<Electronic/>}></Route>
                        <Route path="beautyskin" element={<Beauty/>}></Route>
                        <Route path="appliance" element={<Appliance/>}></Route>
                        {/* <Route path="homekitchen" element={<Homekitchen/>}></Route> */}
                        <Route path="mobiles" element={<Mobiles/>}></Route>
                    </Routes>
                </div>
            </div>

        </>
    )
}

export default Category;