import React from "react";
import './Sellerproduct.css';
import apiurl from "../../../api/apiConfig";
import axios from "axios";
import ApiRequestHandler from "../../../api/ApiRequestHandler";
import Loader from "../../Loader/Loader";


const Sellerproduct = () => {

    const userid = sessionStorage.getItem('usertoken')
    const [loading, error, noData, data] = ApiRequestHandler(`${apiurl}/api/seller/product/${userid}`)


    // handles actions on unplublishClick
    const unpublishClick = async (productid) => {
        try {
            const response = await axios.delete(`${apiurl}/api/products/${productid}`);
            console.log(response);
            if (response.status === 200 && response.data === true) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            alert("Failed to Unpublish product, Due to internal server error")
        }
    }

    return (
        <>
            {loading && (<Loader />)}
            {error && (<h2>Sorry, Something went wrong!</h2>)}
            {noData && (<h2>No Product Published</h2>)}
            {!loading && !error && !noData && (
                <main className="sellerProductContainer">
                    {data.map((data) => {
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
                                        {/* <button className="sellerProductBtn">Edit</button>
                                    <button className="sellerProductBtn">Save</button> */}
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
