import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

const Footer = () => {

    return (
        <>
            <div className="footer_section">
                <div className="footerDetail">
                    <div className="boxone box">
                        <div className="followus_heading">Support</div>
                        <div>
                            <div className="support">212 Bandra, Navi Mumbai, Pin-442348, Maharastra, India</div>
                            <div className="support">Mail To: rohitkushwaha.developer@gmail.com</div>
                            <div className="support">Customer Care: 09994554595, 09994554599</div>
                        </div>
                    </div>
                    <div className="boxtwo box">
                        <div className="followus_heading">Quick Link</div>
                        <ul>
                            <li className="quickLink">Home</li>
                            <li className="quickLink">About</li>
                            <li className="quickLink">Privacy Policy</li>
                            <li className="quickLink">Terms&Conditions</li>
                            <li className="quickLink">FAQs</li>
                        </ul>
                    </div>
                    <div className="boxthree box">
                        <div className="followus_heading">Account</div>
                        <ul>
                            <li className="quickLink">My Profile</li>
                            <li className="quickLink">Signin/Signup</li>
                            <li className="quickLink">Kart</li>
                            <li className="quickLink">Wishlist</li>

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