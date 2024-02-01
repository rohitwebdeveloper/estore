import React from 'react'

const Filter = (props) => {

  const [brandone, brandtwo, brandthree, brandfour, brandfive] = props.brand;
  const [priceone, pricetwo, pricethree, pricefour, pricefive, pricesix, priceseven, priceeight, pricenine, priceten ] = props.price;
  const [ratingone, ratingtwo, ratingthree, ratingfour, ratingfive] = props.rating;

  return (
    <>
    <div className="filter_box">
            <h3 className="filter_heading">Filter Search</h3>
            <div className="filter">
              <h4>Brands</h4>
              <div className="filter_items"><input type="checkbox" onChange={props.change} className="checkboxbrand" value="samsung" /> {brandone}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxbrand" value="vivo" /> {brandtwo}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxbrand" value="realme" /> {brandthree}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxbrand" value="oneplus" /> {brandfour}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxbrand" value="oppo" /> {brandfive}</div>
              <h4>Price</h4>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={priceone}/>{priceone}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={pricetwo} />{pricetwo}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={pricethree} /> {pricethree}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={pricefour} /> {pricefour}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={pricefive} /> {pricefive}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={pricesix} /> {pricesix}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={priceseven} /> {priceseven}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={priceeight} />{priceeight}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={pricenine} /> {pricenine}</div>
              <div className="filter_items"><input type="checkbox" onChange={props.change}   className="checkboxprice" value={priceten} /> {priceten}</div>
              <h4>Most Rated</h4>
              <div className="filter_items"><input type="checkbox"  onChange={props.change}  className="checkboxrating" value={ratingone} /> 5 ⭐</div>
              <div className="filter_items"><input type="checkbox"  onChange={props.change}  className="checkboxrating" value={ratingtwo} /> 4 ⭐ </div>
              <div className="filter_items"><input type="checkbox"  onChange={props.change}  className="checkboxrating" value={ratingthree} /> 3 ⭐</div>
              <div className="filter_items"><input type="checkbox"  onChange={props.change}  className="checkboxrating" value={ratingfour} /> 2 ⭐</div>
              <div className="filter_items"><input type="checkbox"  onChange={props.change}  className="checkboxrating" value={ratingfive} /> 1 ⭐</div>
            </div>
          </div>
    </>
  )
}

export default Filter;