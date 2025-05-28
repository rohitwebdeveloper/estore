// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { MdShoppingCartCheckout } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { IoIosHeartEmpty } from "react-icons/io";
import apiurl from "../../api/apiConfig";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";


const Navbar = () => {

  const [searchVal, setsearchVal] = useState('')
  const [searchData, setsearchData] = useState([])
  const [isVisibility, setisVisibility] = useState('hidden')
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        if (searchVal) {
          const response = await axios.get(`${apiurl}/api/products/search?q=${searchVal}`)
          setsearchData(response.data)
          setisVisibility(response.data.length ? 'visible' : 'hidden');
          console.log(response)
        }
      } catch (error) {
        console.log(error)
      }
    }, 1000);

    return () => {
      clearTimeout(timer)
    }
  }, [searchVal])



  const searchchange = (event) => {
    setsearchVal(event.target.value)
    
  }


  const handleNavigate = (productId) => {
    setisVisibility('hidden');
    setsearchVal('');
    navigate(`/products/${productId}`);
    window.location.reload()
  };

  const handleSearchFocus = () => {
    setisVisibility('visible');
    setIsActive(false)
  };

  const handleSearchBlur = () => {
    if (!searchVal) {
      setisVisibility('hidden');
    }
  };

  
  const menuClick = () => {
    setIsActive(!isActive);
  }

  return (
    <>
      <div className="navbar_container">
        <div className="navbar">
          <h4 onClick={() => navigate('/')} className="brand_logo">E-Store</h4>
          <div className="searchBox">
            <input
              type="search"
              className="search"
              placeholder="Search here"
              aria-label="Search"
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              value={searchVal}
              onChange={searchchange}
            />
          </div>
          <nav >
            <ul className={`ullist ${isActive ? 'active' : ''}`}  >
              <li><NavLink className="navitem" to="/">Home</NavLink></li>
              <li><NavLink className="navitem" to="/category/fashion">Categories</NavLink></li>
              <li><NavLink className="navitem logo" to="/kart"><MdShoppingCartCheckout /></NavLink></li>
              <li><NavLink className="navitem logo" to="/wishlist"><IoIosHeartEmpty /></NavLink></li>
              <li><NavLink className="navitem logo" to="/profile/myprofile"><MdAccountCircle /></NavLink></li>
            </ul>
          </nav>
          <div className="menuLogo"  onClick={menuClick}  >{isActive ? <IoCloseSharp/> : <IoMenu/>} </div>
         
        </div>
        <div className="search_result" style={{ visibility: isVisibility }}>
          <div className="row">
            {searchData.map((currdata, index) => (
              <div className="img_card" key={index} onClick={() => handleNavigate(currdata._id)}>
                <img src={currdata.url} alt={currdata.title} />
                <div>
                  <div className="searchResultTitle">{currdata.title}</div>
                  <div className="searchResultSubcategory">in {currdata.subCategory}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;





