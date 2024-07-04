import React, {useState, useEffect} from "react";
import './Sellerproduct.css'
import axios from "axios";


const Sellerproduct = () => {

    useEffect(() => {
     ;( async () => {
        const userid = sessionStorage.getItem('usertoken')
        try {
            const response = await axios.get(`http://localhost:8000/seller/dashboard/product/${userid}`)
                console.log(response)

        } catch (error) {
            console.log(error)
        }
     })()
    }, [])
    


    return(
        <>
        <h1>This is a seller product page</h1>
        <main className="sellerProductContainer">
            <section className="sellerProduct">
                <div className="sellerProductImg">
                    <img src="/galaxyone.png" alt="" />
                </div>
                <div className="sellerProductDetail">
                    <div className="sellerProductItem">Samsung Galaxy S22 Ultra</div>
                    <div className="sellerProductItem">129990</div>
                    <div className="sellerProductItem">Electronics</div>
                    <div className="sellerProductItem">Mobile</div>
                    <div className="sellerProductItem">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam modi numquam cupiditate ipsam, illo obcaecati. Reiciendis reprehenderit labore dolor aspernatur atque nisi earum saepe. Possimus, et. A esse soluta placeat.</div>
                    <div className="sellerProductBtnBox">
                        <button className="sellerProductBtn">Edit</button>
                        <button className="sellerProductBtn">Save</button>
                        <button className="sellerProductBtn">Remove</button>
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}

export default Sellerproduct;
