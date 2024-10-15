
import React, { useState, useEffect } from 'react';
import apiurl from '../../api/apiConfig';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom'; // For routing
import './ProductDetails.css'
import ApiRequestHandler from '../../api/ApiRequestHandler';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ProductDetails = () => {
    const { productid } = useParams(); // Get the product ID from the URL
    const [loading, error, noData, data] = ApiRequestHandler(`${apiurl}/api/products/details/${productid}`)
    const [productdata, setproductdata] = useState([])
    const userid = sessionStorage.getItem('usertoken')
    const navigate = useNavigate()


    useEffect(() => {
        if (!loading && !error && !noData && data) {
            setproductdata(data[0])
        }
    }, [data])


    const addKartClick = async (productid) => {
        if (!userid) {
            navigate('/signin')
            return
        }
        try {
            const response = await axios.post(`${apiurl}/api/kart/${userid}`, { productid })
            console.log(response)
            if (response.status === 200 && response.data.success === true) {
                alert('Added To Kart !')
                return
            }
        } catch (error) {
            alert('Failed to add to kart due to internal server error')
        }
    }


    return (
        <>
            {loading && <Loader />}
            {error && <div className="h1box"><h2>Sorry, Something went wrong!</h2></div>}
            {noData && <div className="h1box"><h2>No Orders Found</h2></div>}
            {!loading && !error && !noData && (
                <div className="product-details">
                    <div className="product-image-container">
                        <img src={productdata.url} alt={productdata.title} className="product-image" />
                    </div>
                    <div className="product-info">
                        <h2 className="product-title">{productdata.title}</h2>
                        <p className="product-description">{productdata.description}</p>
                        <div className="product-meta">
                            <h3 className="product-price">₹{productdata.price}</h3>
                            <p className="product-brand"><strong>Brand:</strong> {productdata.brand}</p>
                            <p className="product-category"><strong>Category:</strong> {productdata.category}</p>
                            <p className="product-subcategory"><strong>Sub-Category:</strong> {productdata.subCategory}</p>
                        </div>
                        <div className="product-ratings">
                            <p className='ratingBox'>{productdata.averagerating ? productdata.averagerating.toFixed(1) : 0}</p>
                            <p><strong>Total Ratings: </strong> {productdata.ratings ? productdata.ratings.length : 0} </p>
                        </div>
                        <button className="add-to-cart-button" onClick={() => addKartClick(productdata._id)} >Add to Cart</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetails;