import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {

    return (
        <>
            <div className="footer_section">
                <div className="footerDetail">
                    <div className="boxone box">
                        <div className="followus_heading">Support</div>
                        <div>
                            <div className="support">212 Bandra, Navi Mumbai, Pin-442348, Maharastra, India</div>
                            <div className="support">Customer Care: 09994554595, 09994554599</div>
                            <p className="support"> Mail To: <a href="mailto:rohitkushwaha.developer@gmail.com" style={{color:'white', textDecoration:'underline'}}> rohitkushwaha.developer@gmail.com</a></p>
                        </div>
                    </div>
                    <div className="boxtwo box">
                        <div className="followus_heading">Quick Link</div>
                        <ul>
                            <li className="quickLink"><Link to='/' style={{ color: 'white', textDecoration: 'underline' }} >Home</Link></li>
                            <li className="quickLink"><Link to='/' style={{ color: 'white', textDecoration: 'underline' }} >About</Link></li>
                            <li className="quickLink"><Link to='/' style={{ color: 'white', textDecoration: 'underline' }} >Privacy Policy</Link></li>
                            <li className="quickLink"><Link to='/' style={{ color: 'white', textDecoration: 'underline' }} >Terms&Conditions</Link></li>
                            {/* <li className="quickLink"><Link to='/' style={{ color: 'white', textDecoration: 'underline' }} >FAQs</Link></li> */}
                        </ul>
                    </div>
                    <div className="boxthree box">
                        <div className="followus_heading">Account</div>
                        <ul>
                            <li className="quickLink"><Link to='/profile/myprofile' style={{ color: 'white', textDecoration: 'underline' }} >My Profile</Link></li>
                            <li className="quickLink"><Link to='/signin' style={{ color: 'white', textDecoration: 'underline' }} >Signin/Signup</Link></li>
                            <li className="quickLink"><Link to='/kart' style={{ color: 'white', textDecoration: 'underline' }} >Kart</Link></li>
                            <li className="quickLink"><Link to='/wishlist' style={{ color: 'white', textDecoration: 'underline' }} >Wishlist</Link></li>

                        </ul>
                    </div>
                    <div className="boxfour box">
                        <div className="followus_heading">Connect With Us</div>
                        <ul>
                            <li className="socialIcon linkedin"><FaLinkedin /></li>
                            <li className="socialIcon facebook"><FaFacebook /></li>
                            <li className="socialIcon twitter"><FaTwitter /></li>
                            <li className="socialIcon instagram"><FaInstagram /></li>
                            <li className="socialIcon threads"><FaThreads /></li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                   Copyright@<a href="www.estore.com">www.estore.com</a>. All right reserved
                </div>
            </div>
        </>
    )
}

export default Footer;