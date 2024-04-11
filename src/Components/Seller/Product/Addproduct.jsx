import React, { useState } from 'react';
import { FaImage } from "react-icons/fa6";
import axios from 'axios';
import './Addproduct.css'

const Addproduct = () => {

    const [file, setfile] = useState();
    const [product, setproduct] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        subcategory: '',
    });

    // Using form method to append product data
    const form = new FormData();
    form.append("photo", file)
    form.append('title', product.title)
    form.append('description', product.description)
    form.append('price', product.price)
    form.append('category', product.category)
    form.append('subcategory', product.subcategory)

    
    // Defining action for file upload
    const changeFile = (event) => {
        setfile(event.target.files[0])
    }

    // Defining action for product input field change
    const productInputChange = (event) => {
        const { name, value } = event.target;
        setproduct((previousVal) => {
            return {
                ...previousVal, [name]: value
            }
        });
    }


    // Making post request for product information and photo to the server
    const uploadClick = async () => {

        try {
            const response = await axios.post('http://localhost:8000/upload/image', form)

            if (response.data.success == true) {
                alert(response.data.message)
            }
            if (response.data.success == false) {
                alert(response.data.message)
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <>
            <section className="sellerContainer">
                <h2 className='productSectionHeading'>Product Information</h2>
                <div className='sellerBox'>
                    <form onSubmit={(e) => e.preventDefault()} className='sellerForm' >
                        <h4 className='productHeading'>Title</h4>
                        <input type="text" name='title' className='productInput' onChange={productInputChange} value={product.title} />
                        <h4 className='productHeading'>Description</h4>
                        <textarea type="text" name='description' className='productInput' onChange={productInputChange} value={product.description} />
                        <h4 className='productHeading'>Price</h4>
                        <input type='number' name='price' className='productInput' onChange={productInputChange} value={product.price} />
                        <h4 className='productHeading'>Category</h4>
                        <select name='category' className='productInput' onChange={productInputChange} value={product.category}>
                            <option value="cloth">Cloth</option>
                            <option value="mobile">Mobile</option>
                            <option value="electronic">Electronic</option>
                            <option value="fashion">Fashion</option>
                            <option value="appliance">Appliance</option>
                            <option value="beautyandskin">Beauty&Skin</option>
                        </select>
                        <h4 className='productHeading'>Sub-Category</h4>
                        <select name='subcategory' className='productInput' onChange={productInputChange} value={product.subcategory}>
                            <option value="cloth">Cloth</option>
                            <option value="mobile">Mobile</option>
                            <option value="electronic">Electronic</option>
                            <option value="fashion">Fashion</option>
                            <option value="appliance">Appliance</option>
                            <option value="beautyandskin">Beauty&Skin</option>
                        </select>
                        <h4 className='productHeading'>Product Image</h4>
                        <label className='custom-file-upload'>
                            Upload <FaImage />
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