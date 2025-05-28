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
            url: "/hero1.png",
        },
        {
            url: "/hero2.png",
        },
        {
            url: "/hero3.png",
        },
    ]



    const clickviewall = (productCategory) => {
        navigate(`/category/${productCategory}`)
    }

    return (
        <>
            <div className="offer_section">
                <div className="offerImageslider">
                    <Carousel axis="horizontal" showArrows={true} autoPlay={true} infiniteLoop={true} interval={3000} >
                        <div>
                            <img src={image[0].url} className="sliderImage" />

                        </div>
                        <div >
                            <img src={image[1].url} className="sliderImage" />

                        </div>
                        <div >
                            <img src={image[2].url} className="sliderImage" />

                        </div>
                    </Carousel>
                </div>
            </div>
            <div className="homeContainer">
                <div className="homeSection">
                    <div className="headingLinkbox">
                        <div className="sectionHeading">Fashion, Beauty & cloths</div>
                        <button className="viewallBtn" onClick={() => clickviewall('electronics')}>
                            View All
                        </button>
                    </div>
                    <div className="sliderbox">
                        <Multiimageslider imageData={BestOfFashionAndBeauty} />
                    </div>
                </div>
                <div className="homeSection">
                    <div className="headingLinkbox">
                        <div className="sectionHeading">Electronics, Gadgets, and all.. </div>
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