import React, {useEffect, useState} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import Bestsellerdata from "../Imageurl/Bestseller";
import './Home.css';




const Multiimageslider = () => {
 const [imagedata, setimagedata] = useState([])

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  
  useEffect(()=>{
    ;(async()=>{
      try {

        const response = await fetch('https://fakestoreapi.com/products ');
        const resjson = await response.json();
        setimagedata(resjson);
        console.log(resjson);

      } catch (error) {
        // console.log(error);
      }
  
    })()
  }, [])


  return (
        <>
            <Carousel responsive={responsive} itemClass="imgBox">
{imagedata.length===0 ? (
  
    <h1>DATA NOT FOUND</h1>
) : (imagedata.map((data)=>{
    return(
      <>
      <div>
      <img src={data.image} alt="" />
      <div className="carouselImgname">{data.category}</div>
      <div className="carouselImgoffer">Upto 30% off</div>
      </div>
      </>
    )
  })
)}
</Carousel>;
        </>
    )
}

export default Multiimageslider;