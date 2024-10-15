import React from "react";
import './ProductGrid.css'
import { useNavigate } from "react-router-dom";


const ProductGrid = ({ productData, wishlistClick, wislistResponse }) => {

const navigate = useNavigate()

const handleNavigate = (productId) => {
  navigate(`/products/${productId}`);
}

    return(
        <>
         <section className="product_section">
            <p style={{ width: '200px', margin: 'auto', display: 'block' }}>{wislistResponse}</p>
            <div className="row">
              {productData.map((currdata, index) => {
                return (
                  <article className="categoryproduct_card" key={index}>
                    <figure className="categoryproduct_img" key={currdata.id}>
                      <img src={currdata.url} alt={currdata.title} onClick={() => handleNavigate(currdata._id)} />
                    </figure>
                    <div className="categoryproduct_detail">
                      <h3 className="categoryproduct_brand">{currdata.brand}</h3>
                      <h4 className="categoryproduct_name" onClick={() => handleNavigate(currdata._id)} >{currdata.title}</h4>
                      {/* <div className="categoryproduct_rating">0</div> */}
                      <div className="priceandkart">
                        <span className="categoryproduct_price">₹{currdata.price}</span>
                      </div>
                      <button className="categorywishlistBtn" onClick={() => wishlistClick(currdata._id)}>Add To Wishlist</button>
                      <details>{currdata.description}</details>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        </>
    )
}

export default ProductGrid;