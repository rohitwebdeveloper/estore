// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import "./Kart.css"
// // import { search_resultdata } from "../Navbar/Navbar";
// import Categorydata from "../Category/categorydata";
// import { searchval } from "../Navbar/Navbar";


// const Kart = () => {

//      const [search, setsearch] = useState([]);

//     useEffect( () => {
//           setsearch(Categorydata.filter((data) => data.category == searchval))
//     }, [])




//     return (
//         <>
//             <div className="searchresult_container">
//                 <div className="row">
//                     {search.map((currdata) => {
//                         return (
//                             <>
//                                 <img src={currdata.url} key={currdata.id} alt="" />
//                             </>
//                         )
//                     })}
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Kart;