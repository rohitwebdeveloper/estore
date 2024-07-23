import React from "react";

const Productlist = (props) => {
  // const [clickone, clicktwo, clickthree, clickfour, clickfive, clicksix, clickseven] = props.click;
  // const [productone, producttwo, productthree, productfour, productfive, productsix ] = props.productlistname;

  const clickdata = props.click;
  const productlist = props.productlistname;
  return (
    <>

      <div className="variety_section">
        <div className="varietybox">
          {clickdata.map((data, index) => {
            const productlistdata = productlist[index];
            return (
                <div className="variety_item" key={index} onClick={data}>{productlistdata}</div>
            )
          })}
          {/* <div className="variety_item" onClick={clicktwo}>{productone}</div>
            <div className="variety_item" onClick={clickthree}>{producttwo}</div>
            <div className="variety_item" onClick={clickfour}>{productthree}</div>
            <div className="variety_item" onClick={clickfive}>{productfour}</div>
            <div className="variety_item" onClick={clicksix}>{productfive}</div>
            <div className="variety_item" onClick={clickseven}>{productsix}</div> */}
        </div>
      </div>
    </>
  )
}

export default Productlist;