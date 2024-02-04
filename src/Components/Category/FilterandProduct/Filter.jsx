import React from 'react'

const Filter = (props) => {

  // const [brandone, brandtwo, brandthree, brandfour, brandfive] = props.brand;
  // const [priceone, pricetwo, pricethree, pricefour, pricefive, pricesix, priceseven, priceeight, pricenine, priceten ] = props.price;

  const branddata = props.brand; 
  const pricedata = props.price;


  return (
    <>
      <div className="filter_box">
        <h3 className="filter_heading">Filter Search</h3>
        <div className="filter">
          <h4>Brands</h4>
          {branddata.map((currdata) => {
            return (
              <>
                <div className="filter_items"><input type="checkbox" onChange={props.change} className="checkboxbrand checkbox" value={currdata} /> {currdata}</div>
              </>
            )
          })}
          {/* <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxbrand" value={brandtwo} /> {brandtwo}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxbrand" value={brandfive} /> {brandthree}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxbrand" value={brandfour} /> {brandfour}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxbrand" value={brandfive} /> {brandfive}</div> */}
          <h4>Price</h4>
          {pricedata.map((currdata) => {
            return (
              <>
                <div className="filter_items"><input type="checkbox" onChange={props.change} className="checkboxprice checkbox" value={currdata} />{currdata}</div>
              </>
            )
          })}

          {/* <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={pricetwo} />{pricetwo}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={pricethree} /> {pricethree}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={pricefour} /> {pricefour}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={pricefive} /> {pricefive}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={pricesix} /> {pricesix}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={priceseven} /> {priceseven}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={priceeight} />{priceeight}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={pricenine} /> {pricenine}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={priceten} /> {priceten}</div> */}
          <h4>Most Rated</h4>
          <div className="filter_items"><input type="checkbox" onChange={props.change} className="checkboxrating checkbox" value="5" /> 5 ⭐</div>
          <div className="filter_items"><input type="checkbox" onChange={props.change} className="checkboxrating checkbox" value="4" /> 4 ⭐ </div>
          <div className="filter_items"><input type="checkbox" onChange={props.change} className="checkboxrating checkbox" value="3" /> 3 ⭐</div>
          <div className="filter_items"><input type="checkbox" onChange={props.change} className="checkboxrating checkbox" value="2" /> 2 ⭐</div>
          <div className="filter_items"><input type="checkbox" onChange={props.change} className="checkboxrating checkbox" value="1" /> 1 ⭐</div>
        </div>
      </div>
    </>
  )
}

export default Filter;