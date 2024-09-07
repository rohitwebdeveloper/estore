// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Categorydata from "../Imageurl/Categorydata";
import { MdAccountCircle } from "react-icons/md";
import { MdShoppingCartCheckout } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { IoIosHeartEmpty } from "react-icons/io";


// let searchval;

const Navbar = () => {

  // const navigate = useNavigate();
  const [visibility, setvisibility] = useState();
  const [result, setresult] = useState([]);
  // const [show, setshow] = useState(false);
  // const [searchval, setsearchval] = useState()


  const searchchange = (event) => {
    // setsearchval(event.target.value);
    event.target.value;
  }

  const goclick = () => {
   let searchval = document.querySelector('.search_bar').value;
   let searchresult = Categorydata.filter((data)=> data.category==searchval || data.name==searchval);
   setresult(searchresult)
   console.log(searchresult);
  }

  const handlefocus = () => {
    setvisibility('block')
  }

  const handleonblur = () => {
    setvisibility('none')
  }

  return (
    <>
      <div className="navbar_container" onMouseLeave={handleonblur}>
        <div className="navbar">
          <h3 className="brand_logo">E-Store</h3>
          <div className="searchBox">
          <input type="search" className="search" placeholder=" Search here" onFocus={handlefocus} onChange={searchchange} onKeyDown={(e)=>e.key==='Enter' ? goclick() : null} />
          <div className="searchBtn" onClick={goclick} ><GoSearch/></div>
          </div>
          <nav>
            <ul className="ullist">
              <li><NavLink className="navitem" to="/"  >Home</NavLink></li>
              <li><NavLink className="navitem" to="/category/fashion" > Categories</NavLink></li>
              <li><NavLink className="navitem logo" to="/kart" > <MdShoppingCartCheckout/></NavLink></li>
              <li><NavLink className="navitem logo" to="/wishlist" > <IoIosHeartEmpty/></NavLink></li>
              {/* <li><NavLink to="/kart"> Kart</NavLink></li> */}
              <li><NavLink className="navitem logo" to="/profile/myprofile"><MdAccountCircle/></NavLink></li>
            </ul>
          </nav>
        </div>
        <div className="search_result" style={{ display: visibility }} >
          <div className="row">
            {result.length==0 ? (
              <h1>No Search Found</h1>
            ) : (result.map((currdata) => {
              return (
                <>
                <div className="img_card">
                  <img src={currdata.url} key={currdata.id} alt="" />
                </div>
                </>
              )
            })
            ) }
          </div>
        </div>
      </div>
    </>
  )
}


export default Navbar;
// export {searchval};