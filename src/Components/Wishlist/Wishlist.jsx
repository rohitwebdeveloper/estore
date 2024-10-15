import React, { useState, useEffect } from "react";
import axios from "axios";
import apiurl from "../../api/apiConfig";
import './Wishlist.css'
import { MdOutlineDeleteForever } from "react-icons/md";
import ApiRequestHandler from "../../api/ApiRequestHandler";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";



const Wishlist = () => {

    const userid = sessionStorage.getItem('usertoken')
    const [loading, error, noData, data] = ApiRequestHandler(`${apiurl}/api/wishlist/${userid}`)
    const [wishlistData, setwishlistData] = useState([])
    const [kartResponse, setkartResponse] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        setwishlistData(data)
        // console.log(wishlistData)
    }, [data])



    const wishKartBtnClick = async (productid) => {
        try {
            const response = await axios.post(`${apiurl}/api/kart/${userid}`, { productid })
            if (response.status === 200 && response.data.success === true) {
                setkartResponse('Added To Kart !')
                setTimeout(() => {
                    setkartResponse('')
                }, 3000);
                return
            }
        } catch (error) {
            alert('Failed to add to kart , Internal server error')
        }
    }


    const wishRemoveBtnClick = async (productid) => {
        try {
            const response = await axios.delete(`${apiurl}/api/wishlist/${productid}`)
            console.log(response)
            if (response.status === 200 && response.data.success === true) {
                setwishlistData(data.filter((data) => data._id != productid))
            }
        } catch (error) {
            alert("Failed to remove item from wishlist, Due to internal server error")
        }
    }


    const handleNavigate = (productId) =>{
        navigate(`/products/${productId}`);
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
                    <p style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', margin: 'auto', display: 'block'
                    }}>
                        {kartResponse}
                    </p>
                    {wishlistData.map((data, id) => {
                        return (
                            <div className="wishlistBox" key={data._id}>
                                <div className="wishlistimgBox" onClick={() => handleNavigate(data.productdetail._id)} >
                                    <img src={data.productdetail.url} alt="" />
                                </div>
                                <div className="imgdetailBox">
                                    <div className="wishlistName" onClick={() => handleNavigate(data._id)} >{data.productdetail.title}</div>
                                    <div className="wishlistPrice">{data.productdetail.price}</div>
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