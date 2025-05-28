import React, { useState } from 'react';
import './Addproduct.css'
import { FaImage } from "react-icons/fa6";
import categories from './ProductCategoryData';
import axios from 'axios';
import apiurl from '../../../api/apiConfig';
import { useNavigate } from 'react-router-dom';

const Addproduct = () => {

    const [file, setfile] = useState();
    const userid = sessionStorage.getItem('usertoken')
    const [categoryList, setcategoryList] = useState(categories)
    const [subcategoryList, setsubcategoryList] = useState([])
    const [brandList, setbrandList] = useState([])
    const [productInfo, setproductInfo] = useState({
        title: '',
        description: '',
        price: '',
        brand: '',
        category: '',
        subcategory: '',
    });
    const navigate = useNavigate()

    // Using form method to append product information
    const form = new FormData();
    form.append("photo", file)
    form.append('title', productInfo.title)
    form.append('description', productInfo.description)
    form.append('price', productInfo.price)
    form.append('brand', productInfo.brand)
    form.append('category', productInfo.category)
    form.append('subcategory', productInfo.subcategory)
    form.append('userid', userid)


    // Defining action for file upload
    const changeFile = (event) => {
        setfile(event.target.files[0])
    }


    // Defining action for product input field change
    const productInputChange = (event) => {
        const { name, value } = event.target;
        setproductInfo((previousVal) => {
            return { ...previousVal, [name]: value }
        });
    }



    // Handle product category change
    const categoryInputChange = (event) => {
        const { name, value } = event.target;
        setproductInfo((previousVal) => {
            return { ...previousVal, [name]: value }
        })
        setsubcategoryList(categoryList.find(data => data.category == value).subcategories)
        setbrandList([])

    }
    // Handle product subcategory change
    const subcategoryInputChange = (event) => {
        const { name, value } = event.target;
        setproductInfo((previousVal) => {
            return { ...previousVal, [name]: value }
        })
        setbrandList(subcategoryList.find(subdata => subdata.subcategory == value).items)
    }

    //  Handles brand change
    const brandInputChange = (event) => {
        const { name, value } = event.target;
        setproductInfo((previousVal) => {
            return { ...previousVal, [name]: value }
        })
    }



    // Making post request for product information and photo to the server
    const uploadClick = async () => {
           
        if(!productInfo.title || !productInfo.description || !productInfo.price || !productInfo.category || !productInfo.subcategory || !productInfo.brand) {
            alert('Please fill all details')
            return
        }

        try {
            const response = await axios.post(`${apiurl}/api/products/`, form)
            console.log(response)

            if (response.data.success == true) {
                alert(response.data.message)
                navigate('/seller/dashboard/product')
            }
        } catch (error) {
            console.log(error)
            alert('Product publishing failed, due to internal server error')
        }

    }


    return (
        <>
            <section className="sellerContainer">
                <h2 className='productSectionHeading'>Product Information</h2>
                <div className='sellerBox'>
                    <form onSubmit={(e) => e.preventDefault()} className='sellerForm' >
                        <h4 className='productHeading'>Title</h4>
                        <input type="text" name='title' className='productInput' onChange={productInputChange} value={productInfo.title} />
                        <h4 className='productHeading'>Description</h4>
                        <textarea type="text" name='description' className='productInput' onChange={productInputChange} value={productInfo.description} />
                        <h4 className='productHeading'>Price</h4>
                        <input type='number' name='price' className='productInput' onChange={productInputChange} value={productInfo.price} />

                        <h4 className='productHeading'>Category</h4>
                        <select name='category' className='productInput' onChange={categoryInputChange} value={productInfo.category}>
                            {categoryList.map((categoryData, index) => (
                                <option value={categoryData.category} key={index} >{categoryData.category}</option>
                            ))}
                        </select>
                        <h4 className='productHeading'>Sub-Category </h4>
                        <select name='subcategory' className='productInput' onChange={subcategoryInputChange} value={productInfo.subcategory}>
                            {subcategoryList.map((subcategoryData, index) => (
                                <option key={index} value={subcategoryData.subcategory}>{subcategoryData.subcategory}</option>
                            ))}

                        </select>
                        <h4 className='productHeading'>Brand</h4>
                        <select name='brand' className='productInput' onChange={brandInputChange} value={productInfo.brand}>
                            {brandList.map((brandData, index) =>
                                <option value={brandData} key={index}>{brandData}</option>
                            )}
                        </select>
                        <h4 className='productHeading'>Product Image</h4>
                        <label className='custom-file-upload'>
                            {file ? 'Image Uploaded' : 'Upload Image'} <FaImage />
                            <input type='file' accept="image/*" name='photo' onChange={changeFile} placeholder='Upload image' />
                        </label>
                        <button onClick={uploadClick} className='addbtn' >Add Product</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Addproduct;
