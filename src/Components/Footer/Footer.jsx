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
                            <div className="support">Lower Lake, Bhopal, Pin-442348, Madhya Pradesh, India</div>
                            <div className="support">Customer Care: (+91)XXXXXXXXXX, (+91)XXXXXXXXXX</div>
                            <p className="support"> Mail To: <a href="mailto:rohitkushwaha.developer@gmail.com" style={{color:'white', textDecoration:'underline'}}> rohitkushwaha.developer@gmail.com</a></p>
                        </div>
                    </div>
                    <div className="boxtwo box">
                        <div className="followus_heading">Quick Link</div>
                        <ul>
                            <li className="quickLink"><Link to='/' style={{ color: 'white' }} >Home</Link></li>
                            <li className="quickLink"><Link to='/' style={{ color: 'white' }} >About</Link></li>
                            <li className="quickLink"><Link to='/' style={{ color: 'white' }} >Privacy Policy</Link></li>
                            <li className="quickLink"><Link to='/' style={{ color: 'white' }} >Terms&Conditions</Link></li>
                            {/* <li className="quickLink"><Link to='/' style={{ color: 'white' }} >FAQs</Link></li> */}
                        </ul>
                    </div>
                    <div className="boxthree box">
                        <div className="followus_heading">Account</div>
                        <ul>
                            <li className="quickLink"><Link to='/profile/myprofile' style={{ color: 'white' }} >My Profile</Link></li>
                            <li className="quickLink"><Link to='/signin' style={{ color: 'white' }} >Signin/Signup</Link></li>
                            <li className="quickLink"><Link to='/kart' style={{ color: 'white' }} >Kart</Link></li>
                            <li className="quickLink"><Link to='/wishlist' style={{ color: 'white' }} >Wishlist</Link></li>

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
                   Copyright@<a href="www.estore.com" style={{color:'cyan'}}>www.estore.com</a>. All right reserved
                </div>
            </div>
        </>
    )
}

export default Footer;