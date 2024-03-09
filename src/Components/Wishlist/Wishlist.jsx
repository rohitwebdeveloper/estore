import React, {useState} from "react";
import './Wishlist.css'
import { MdOutlineDeleteForever } from "react-icons/md";
import Bestsellerdata from "../Imageurl/Bestseller";



const Wishlist = () => {

    const [wish, setwish]= useState(Bestsellerdata);

    const wishremoveClick = (id)=>{
        // let wishitem = document.querySelector('.wishlistRemove').value;
        let newwish = wish.filter((data, index)=> index != id);
        setwish(newwish)
    }

    return (
        <>
            <div className="wishlistContainer">
                {wish.map((data, id) => {
                    return (
                        <>
                            <div className="wishlistBox">
                                <div className="wishlistimgBox" >
                                    <img src={data.url} alt="" />
                                </div>
                                <div className="imgdetailBox">
                                    <div className="wishlistName">Product</div>
                                    <div className="wishlistPrice">599</div>
                                    <div className="wishlistRating">4.3</div>
                                    <button className="wishlistKartBtn">Add To Kart</button>
                                    <button className="wishlistRemove"   onClick={()=> wishremoveClick(id)} >Remove <span className="dustbin"><MdOutlineDeleteForever /></span> </button>
                                </div>
                            </div>
                        </>
                    )

                })}
            </div>
        </>
    )
}

export default Wishlist;