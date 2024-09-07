import React, { useState, useEffect } from "react";
import axios from "axios";
import './Wishlist.css'
import { MdOutlineDeleteForever } from "react-icons/md";
import ApiRequestHandler from "../../api/ApiRequestHandler";
import Loader from "../Loader/Loader";



const Wishlist = () => {

    const userid = sessionStorage.getItem('usertoken')
    const [loading, error, noData, data] = ApiRequestHandler(`http://localhost:8000/user/wishlist/${userid}`)
    const [wishlistData, setwishlistData] = useState([])
    const [kartResponse, setkartResponse] = useState('')
    

    useEffect(() => {
     setwishlistData(data)
    }, [data])
    


    const wishKartBtnClick = async (productid) => {
        try {
            const response = await axios.post(`http://localhost:8000/user/kart/addproduct/${userid}`, { productid })
            if(response.status === 200 && response.data.success === true) {
                setkartResponse('Added To Kart !')
                setTimeout(() => {
                  setkartResponse('')
                }, 3000);
                return
             }
        } catch (error) {
            seterror(true)
        }
    }

    
    const wishRemoveBtnClick = async (productid) => {
        try {
            const response = await axios.delete(`http://localhost:8000/wishlist/${productid}`)
            console.log(response)
            if(response.status === 200 && response.data.success === true) {
                setwishlistData(data.filter((data) => data._id != productid))  
             }
        } catch (error) {
            alert("Failed to remove item from wishlist, Due to internal server error")
        }
    }


    return (
        <>
            {loading && (<h2 style={{ textAlign: 'center', margin: '20% auto' }}><Loader /></h2>)}
            {error && (<h2 style={{ textAlign: 'center', margin: '20% auto' }}>Sorry, Something went wrong !</h2>)}
            {/* {noData && (<h2 style={{textAlign:'center', margin:'20% auto'}}>No Item in Wishlist !</h2>)} */}
            {noData && (<h2 style={{ textAlign: 'center', margin: '20% auto' }}>No Item in Wishlist !</h2>)}
            {/* {!loading && !error && !noData && ( */}
            {!loading && !error && !noData != 0 && (
                <div className="wishlistContainer">
                     <p style={{ width: '200px', margin: 'auto', display: 'block' }}>{kartResponse}</p>
                    {wishlistData.map((data, id) => {
                        return (
                            <div className="wishlistBox" key={data._id}>
                                <div className="wishlistimgBox" >
                                    <img src={data.productdetail.url} alt="" />
                                </div>
                                <div className="imgdetailBox">
                                    <div className="wishlistName">{data.productdetail.title}</div>
                                    <div className="wishlistPrice">{data.productdetail.price}</div>
                                    <div className="wishlistRating">4.3</div>
                                    <button className="wishlistKartBtn" onClick={() => wishKartBtnClick(data.productdetail._id)}>Add To Kart</button>
                                    <button className="wishlistRemove" onClick={() => wishRemoveBtnClick(data._id)} >Remove <span className="dustbin"><MdOutlineDeleteForever /></span> </button>
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