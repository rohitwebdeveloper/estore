import React from "react";
import "./Home.css"
import Multiimageslider from "./Multiimageslider";
import { useNavigate } from "react-router-dom";
import { BestOfElectronicsAndAppliances, BestOfFashionAndBeauty, LaptopsAndMobiles } from "./MultiimagesliderData";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Home = () => {

    const navigate = useNavigate();

    let image = [
        {
            url: "/offerone.png",
        },
        {
            url: "/offertwo.png",
        },
        {
            url: "/offerthree.png",
        }
    ]



    const clickviewall = (productCategory) => {
        navigate(`/category/${productCategory}`)
    }

    return (
        <>
            <div className="offer_section">
                <div className="offerImageslider">
                    <Carousel axis="horizontal" autoPlay={true} infiniteLoop={true} interval={2000} >
                        <div >
                            <img src={image[0].url} className="sliderImage" />
                            {/* <p className="legendOne">{image[0].offer}</p>  */}
                            
                        </div>
                        <div >
                            <img src={image[1].url} className="sliderImage" />
                            {/* <p className="legendOne">{image[1].offer}</p>  */}
                        </div>
                        <div >
                            <img src={image[2].url} className="sliderImage" />
                            {/* <p className="legendTwo">{image[2].offer}</p>  */}
                        </div>
                    </Carousel>
                </div>
            </div>
            <div className="homeContainer">
                <div className="homeSection">
                    <div className="headingLinkbox">
                        <div className="sectionHeading">Best of Fashion & Accessories</div>
                        <button className="viewallBtn" onClick={() => clickviewall('fashion')} >View All</button>
                    </div>
                    <div className="sliderbox">
                        <Multiimageslider imageData={BestOfFashionAndBeauty} />
                    </div>
                </div>
                <div className="homeSection">
                    <div className="headingLinkbox">
                        <div className="sectionHeading">Best of Electronics</div>
                        <button className="viewallBtn" onClick={() => clickviewall('electronics')} >View All</button>
                    </div>
                    <div className="sliderbox">
                        <Multiimageslider imageData={BestOfElectronicsAndAppliances} />
                    </div>
                </div>
                <div className="homeSection">
                    <div className="headingLinkbox">
                        <div className="sectionHeading">TVs, AC, Invertors & more...</div>
                        <button className="viewallBtn" onClick={() => clickviewall('appliance')} >View All</button>
                    </div>
                    <div className="sliderbox">
                        <Multiimageslider imageData={LaptopsAndMobiles} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;