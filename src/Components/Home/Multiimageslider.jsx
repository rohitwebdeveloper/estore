import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './Home.css';
import { useNavigate } from "react-router-dom";



const Multiimageslider = (props) => {

  const navigate = useNavigate()

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



  return (
    <>
      <Carousel responsive={responsive} itemClass="imgBox">
        {props.imageData ? (
          props.imageData.map((data, index) => {
            return (
              <div onClick={() => navigate(data.link)} key={index} className='carouselProductgrid'>
                <img src={data.url} alt="" />
                {/* <div className="carouselImgname">{data.url}</div> */}
                <div className="carouselImgoffer">{data.caption}</div>
              </div>
            )
          })

        ) : (
          <h1>DATA NOT FOUND</h1>
        )}
      </Carousel>;
    </>
  )
}

export default Multiimageslider;