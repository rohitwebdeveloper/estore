import React, {useState, useEffect} from "react";
import axios from "axios";
import './Wishlist.css'
import { MdOutlineDeleteForever } from "react-icons/md";
// import Bestsellerdata from "../Imageurl/Bestseller";



const Wishlist = () => {

    const userid = sessionStorage.getItem('usertoken')
    const [wishlistData, setwishlistData] = useState([])

   useEffect( () => {
   ;(async () => {
    const response = await axios.get(`http://localhost:8000/user/wishlist/${userid}`)
    console.log(response.data)
    setwishlistData(response.data)
   })()
   }, [])
    

    // const [wish, setwish]= useState(Bestsellerdata);

    const wishKartBtnClick = async (productid) => {
        try {
            const response = await axios.post(`http://localhost:8000/user/kart/addproduct/${userid}`, {productid})
            console.log(response)
        } catch(error) {
            console.error(error)
        }
    }

    const wishRemoveBtnClick = (id) => {
        // let wishitem = document.querySelector('.wishlistRemove').value;
        let newwish = wishlistData.filter((data, index)=> index != id);
        setwishlistData(newwish)
    }

    return (
        <>
            <div className="wishlistContainer">
                {wishlistData.map((data, id) => {
                    return (
                        <>
                            <div className="wishlistBox">
                                <div className="wishlistimgBox" >
                                    <img src={data.url} alt="" />
                                </div>
                                <div className="imgdetailBox">
                                    <div className="wishlistName">{data.title}</div>
                                    <div className="wishlistPrice">{data.price}</div>
                                    <div className="wishlistRating">4.3</div>
                                    <button className="wishlistKartBtn" onClick={()=> wishKartBtnClick(data._id)}>Add To Kart</button>
                                    <button className="wishlistRemove"   onClick={()=> wishRemoveBtnClick(id)} >Remove <span className="dustbin"><MdOutlineDeleteForever /></span> </button>
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