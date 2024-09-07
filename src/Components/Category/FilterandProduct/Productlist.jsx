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
          {productlist.map((data, index) => {
            // const productlistdata = productlist[index];
            return (
                <div className="variety_item" key={index} onClick={()=> clickdata(data)}>{data}</div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Productlist;