import React from 'react'
import '../Footer/Footer.css'
import footer_logo from '../../assets/logo.png'
import { FaInstagram, FaFacebook, FaLine } from 'react-icons/fa';
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>เครื่องแบบนักศึกษา</p>
            </div>
            <ul className="footer-links">
                <li>สินค้า</li>
                <Link to='/about'><li>เกี่ยวกับเรา</li></Link>
                <li>ติดต่อเรา</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <span><FaInstagram size={24} /></span>
                </div>
                <div className="footer-icons-container">
                    <span><FaFacebook size={24} /></span>
                </div>
                <div className="footer-icons-container">
                    <span><FaLine size={24} /></span>
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Right Reserved</p>
            </div>
        </div>
    )
}
