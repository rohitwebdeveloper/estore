import React from "react";
import "./Home.css"
import SimpleImageSlider from "react-simple-image-slider";
 import Bestsellerdata from "../Imageurl/Bestseller";


const Home = () => {

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





    return (
        <>
            <div className="offer_section">
                <SimpleImageSlider
                    width={700}
                    height={400}
                    images={image}
                    autoPlay={true}
                    bgColor={'#ffc9c8'}
                />
            </div>
            <div className="home_product_section">
                <div className="section_heading">
                    <h3>Bestseller</h3>
                    <h4>view all</h4>
                </div>
                <hr />
                <div className="bestseller_section">
                {Bestsellerdata.map((Currimg)=>{
                    return(
                        <>
                        <div className="child" key={Currimg.id}><img src={Currimg.url} alt="" /></div>
                        </>
                    )
                })}
                </div>

                <div className="section_heading">
                    <h3>Recently Viewed</h3>
                    <h4>view all</h4>
                </div>
                <div className="bestseller_section">

                </div>
                <div className="section_heading">
                    <h3>Bestseller</h3>
                    <h4>view all</h4>
                </div>
                <div className="bestseller_section">

                </div>
                <h3 className="section_heading">Bestseller</h3>
                <hr />
                <div className="bestseller_section">

                </div>
                <h3 className="section_heading">Recenty Viewed</h3>
                <hr />
                <div className="bestseller_section">

                </div>
                <h3 className="section_heading">Bestseller</h3>
                <hr />
                <div className="bestseller_section">

                </div>
                <h3 className="section_heading">Bestseller</h3>
                <hr />
                <div className="bestseller_section">

                </div>
                <h3 className="section_heading">Bestseller</h3>
                <hr />
                <div className="bestseller_section">

                </div>
            </div>
        </>
    )
}

export default Home;