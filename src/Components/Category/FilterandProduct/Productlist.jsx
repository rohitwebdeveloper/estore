import React from "react";

const Productlist = (props)=>{
    const [clickone, clicktwo, clickthree, clickfour] = props.click;
    const [productone, producttwo, productthree, productfour, productfive, productsix, productseven ] = props.productlistname;

    return(
        <>
        <div className="variety_section">
          <div className="varietybox">
            <div className="variety_item" onClick={clickone}>All</div>
            <div className="variety_item" onClick={clicktwo}>{productone}</div>
            <div className="variety_item" onClick={clickthree}>{producttwo}</div>
            <div className="variety_item" onClick={clickfour}>{productthree}</div>
            <div className="variety_item">{productfour}</div>
            <div className="variety_item">{productfive}</div>
            <div className="variety_item">{productsix}</div>
            <div className="variety_item">{productseven}</div>
          </div>
        </div>
        </>
    )
}

export default Productlist;