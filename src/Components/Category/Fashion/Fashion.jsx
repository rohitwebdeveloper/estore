import React, { useState, useEffect } from 'react'
import apiurl from '../../../api/apiConfig';
import axios from 'axios';
import Filter from '../FilterandProduct/Filter';
import Productlist from '../FilterandProduct/Productlist';
import CategoryAPIRequestHandler from '../../../api/CategoryAPIRequestHandler';
import Loader from '../../Loader/Loader';
import ProductGrid from '../ProductGrid/ProductGrid';
import "./Fashion.css"


const Fashion = () => {
  const userid = sessionStorage.getItem('usertoken')
  const [loading, error, noData, data] = CategoryAPIRequestHandler("Fashion and Clothes")
  const productlist = ['all', "Men's Clothing", "Women's Clothing", "Footwear"];
  const fashionclothbrand = ["Levis", "Nike", "Adidas", "Zara", "H&M", "Forever 21", "Puma", "Reebok", "Sketchers"]
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDataCopy, setcategoryDataCopy] = useState([]);
  const [range, setRange] = useState();
  const [wishlistAddresponse, setwishlistAddresponse] = useState('')


  useEffect(() => {
    if (!loading && !error && !noData && data) {
      setCategoryData(data)
      setcategoryDataCopy(data)
    }
  }, [data])


  // useEffect(() => {
  //   ; (async () => {
  //     try {
  //       let category = "Fashion and Clothes"
  //       const response = await axios.get(`http://localhost:8000/products/category/${category}`)
  //       console.log(response)
  //       setCategoryData(response.data.electronicsProduct)
  //       setcategoryDataCopy(response.data.electronicsProduct)
  //       setcategoryDataOriginal(response.data.electronicsProduct)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   })()
  // }, [])

  const categoryDataFilter = (categories) => {
    const updatedData = categories == 'all' ? data : data.filter((item) => item.subCategory == categories)
    setCategoryData(updatedData)
    setcategoryDataCopy(updatedData)
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }

  // const allclick = () => {
  //   setCategoryData(categoryDataOriginal)
  //   setcategoryDataCopy(categoryDataOriginal)
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }

  // const mensClothClick = () => {
  //   setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Men's Clothing"))
  //   setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Men's Clothing"))
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }
  // const womensClothClick = () => {
  //   setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Women's Clothing"))
  //   setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Women's Clothing"))
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }
  // const footwearClick = () => {
  //   setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Footwear"))
  //   setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Footwear"))
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }


  const handleonchange = (event) => {
    const checkboxbrandval = [...document.querySelectorAll('.checkboxbrand')]
      .filter(data => data.checked)
      .map(currdata => currdata.value);

    const checkboxratingval = [...document.querySelectorAll('.checkboxrating')]
      .filter(data => data.checked)
      .map(currdata => currdata.value);

    const pricerange = document.querySelector('.pricerangeSlider').value;
    setRange(pricerange);

    const filteredData = (brandVal, priceVal, ratingVal) => {
      return categoryDataCopy.filter((filterdata) => {
        const brandMatch = brandVal.length === 0 || brandVal.includes(filterdata.brand);
        const priceMatch = priceVal === 0 || filterdata.price <= priceVal;
        const ratingMatch = ratingVal.length === 0 || ratingVal.includes(filterdata.rating);
        return brandMatch && priceMatch && ratingMatch
      })
    }
    const updatedCategoryData = filteredData(checkboxbrandval, pricerange, checkboxratingval)
    setCategoryData(updatedCategoryData)

  }


  const addToWishlistClick = async (productid) => {
    if(!userid){
      alert('Please Sign-In , to add to wishlist !')
      return
    }
    try {
      const wishlistResponse = await axios.post(`${apiurl}/api/wishlist/${productid}`, { userid })
      console.log(wishlistAddresponse)
      if (wishlistResponse.status == 200 || wishlistResponse.data.success == true) {
        setwishlistAddresponse('Added To Wishlist !')
        setTimeout(() => {
          setwishlistAddresponse('')
        }, 3000);
        return
      }
    } catch (error) {
       alert('Failed to add to wishlist due to Internal server error',)
    }
  }


  return (
    <>
     <div className="container">
        <Productlist click={categoryDataFilter} productlistname={productlist} />
        {loading && (<h2 style={{ textAlign: 'center', marginTop: '15%', width:'100%' }} ><Loader /></h2>)}
        {error && (<h2 style={{ textAlign: 'center', marginTop: '15%', width:'100%' }} >Sorry, Something went wrong!</h2>)}
        {noData && (<h2 style={{ textAlign: 'center', marginTop: '15%', width:'100%' }} >No Items Found !</h2>)}
        {!loading && !error && !noData && (
          <ProductGrid productData={categoryData} wishlistClick={addToWishlistClick} wislistResponse={wishlistAddresponse} />
        )}
        <Filter change={handleonchange} brand={fashionclothbrand} rangevalue={range} />
      </div>
    </>
  )
}

export default Fashion;