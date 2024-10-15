import React, {useState} from "react";
import { TbCategoryFilled } from "react-icons/tb";

const Productlist = (props) => {

  const clickdata = props.click;
  const productlist = props.productlistname;
  const [isActive, setisActive] = useState(false)

  const subcategoryClick = () => {
    if (window.innerWidth <= 800) {
      setisActive(!isActive);
      return;
    }
  }

  return (
    <>
      <div className="variety_section">
        <h3 className="varietyHeading" onClick={subcategoryClick}>Subcategories </h3>
        <div className={`varietybox ${isActive ? 'active' : '' }`}>
          {productlist.map((data, index) => {
            // const productlistdata = productlist[index];
            return (
              <div className="variety_item" key={index} onClick={() => clickdata(data)}>{data}</div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Productlist;