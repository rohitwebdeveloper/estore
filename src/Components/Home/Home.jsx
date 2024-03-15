import React from "react";
import "./Home.css"
import SimpleImageSlider from "react-simple-image-slider";
// import Bestsellerdata from "../Imageurl/Bestseller";
import Multiimageslider from "./Multiimageslider";
import { useNavigate } from "react-router-dom";


const Home = () => {

   
    const navigate = useNavigate();

    let image = [
        {
            url: "/offerone.png"
        },
        {
            url: "/offertwo.png"
        },
        {
            url: "/offerthree.png"
        }
    ]

    const clickviewall = () => {
        navigate('/category')
    }

    return (
        <>
            <div className="offer_section">
                <SimpleImageSlider
                    width={700}
                    height={400}
                    images={image}
                    autoPlay={true}
                    bgColor={'#f7f7f7'}
                />
            </div>
            <div className="homeContainer">
                <div className="homeSection">
                    <div className="headingLinkbox">
                        <div className="sectionHeading">Best of Fashion, Cloth & Accessories</div>
                        <button className="viewallBtn" onClick={clickviewall} >View All</button>
                    </div>
                    <div className="sliderbox">
                        <Multiimageslider />
                    </div>
                </div>
                <div className="homeSection">
                    <div className="headingLinkbox">
                        <div className="sectionHeading">Best of Electronics</div>
                        <button className="viewallBtn" onClick={clickviewall} >View All</button>
                    </div>
                    <div className="sliderbox">
                        <Multiimageslider />
                    </div>
                </div>
                <div className="homeSection">
                    <div className="headingLinkbox">
                        <div className="sectionHeading">TVs, AC, Invertors & more...</div>
                        <button className="viewallBtn" onClick={clickviewall} >View All</button>
                    </div>
                    <div className="sliderbox">
                        <Multiimageslider />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;