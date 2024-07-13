import React, { useState, useEffect } from "react";
import './Sellerproduct.css';
import axios from "axios";


const Sellerproduct = () => {
    const userid = sessionStorage.getItem('usertoken')
    const [sellerProduct, setsellerProduct] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [noData, setnoData] = useState(false)


    useEffect(() => {
        // Handles api request to get products published by the seller
        ; (async () => {
            try {
                setloading(true)
                seterror(false)
                // console.log(userid);
                const response = await axios.get(`http://localhost:8000/seller/dashboard/product/${userid}`)
                setsellerProduct(response.data)
                setloading(false)
                if(!response.data.length) {
                    setnoData(true)
                }

            } catch (error) {
                console.log(error)
                seterror(true)
                setloading(false)
            }
        })()
    }, [])


    // handles actions on unplublishClick
    const unpublishClick = async (productid) => {
        try {
            const response = await axios.get(`http://localhost:8000/seller/dashboard/product/unpublish/${productid}`);
            console.log(response);
            if (response.status === 200 && response.data === true) {
                setsellerProduct((previousVal) =>
                    previousVal.filter((data) => data._id !== productid)
                );
            }
        } catch (error) {
            console.log(error);
            seterror(true)
        }
    }

    return (
        <>
        {loading && ( <h2>Loading...</h2> )}
        {error && ( <h2>Sorry, Something went wrong!</h2> )}
        {noData && ( <h2>No Product Published</h2> )}
        {!loading && !error && !noData && (
            <main className="sellerProductContainer">
                {sellerProduct.map((data) => {
                    return (
                        <section className="sellerProduct" key={data._id}>
                            <figure className="sellerProductImg">
                                <img src={data.url} alt={data.title} />
                            </figure>
                            <div className="sellerProductDetail">
                                <h2 className="sellerProductItem">{data.title}</h2>
                                <p className="sellerProductItem"><strong>Category:</strong> {data.category}</p>
                                <p className="sellerProductItem"><strong>Sub-Category:</strong> {data.subCategory}</p>
                                <p className="sellerProductItem"><strong>Price:</strong> {data.price}</p>
                                <p className="sellerProductItem"><strong>Description:</strong> {data.description}</p>
                                <div className="sellerProductBtnBox">
                                    <button className="sellerProductBtn">Edit</button>
                                    <button className="sellerProductBtn">Save</button>
                                    <button className="sellerProductBtn" onClick={() => unpublishClick(data._id)}>Unpublish</button>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </main>
            )}
        </>
    )
}

export default Sellerproduct;
