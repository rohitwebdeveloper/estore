import React, { useState, useEffect } from "react";
import axios from "axios";
import './Wishlist.css'
import { MdOutlineDeleteForever } from "react-icons/md";
// import Bestsellerdata from "../Imageurl/Bestseller";



const Wishlist = () => {

    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [noData, setnoData] = useState(false)
    const userid = sessionStorage.getItem('usertoken')
    const [wishlistData, setwishlistData] = useState([])

    useEffect(() => {
        ; (async () => {
            try {
                setloading(true)
                seterror(false)
                const response = await axios.get(`http://localhost:8000/user/wishlist/${userid}`)
                setwishlistData(response.data)
                setloading(false)
                if (!response.data.length) {
                    setnoData(true)
                    return
                }
            } catch (error) {
                seterror(true)
                setloading(false)
            }
        })()
    }, [])



    const wishKartBtnClick = async (productid) => {
        try {
            const response = await axios.post(`http://localhost:8000/user/kart/addproduct/${userid}`, { productid })
            console.log(response)
        } catch (error) {
            seterror(true)
        }
    }

    const wishRemoveBtnClick = (id) => {
        // let wishitem = document.querySelector('.wishlistRemove').value;
        let newwish = wishlistData.filter((data, index) => index != id);
        setwishlistData(newwish)
    }

    return (
        <>
            {loading && (<h2 style={{textAlign:'center', margin:'20% auto'}}>Loading...</h2>)}
            {error && (<h2 style={{textAlign:'center', margin:'20% auto'}}>Sorry, Something went wrong !</h2>)}
            {noData && (<h2 style={{textAlign:'center', margin:'20% auto'}}>No Item in Wishlist !</h2>)}
            {!loading && !error && !noData && (
                <div className="wishlistContainer">
                    {wishlistData.map((data, id) => {
                        return (
                            <div className="wishlistBox" key={data._id}>
                                <div className="wishlistimgBox" >
                                    <img src={data.url} alt="" />
                                </div>
                                <div className="imgdetailBox">
                                    <div className="wishlistName">{data.title}</div>
                                    <div className="wishlistPrice">{data.price}</div>
                                    <div className="wishlistRating">4.3</div>
                                    <button className="wishlistKartBtn" onClick={() => wishKartBtnClick(data._id)}>Add To Kart</button>
                                    <button className="wishlistRemove" onClick={() => wishRemoveBtnClick(id)} >Remove <span className="dustbin"><MdOutlineDeleteForever /></span> </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default Wishlist;