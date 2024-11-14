import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import { FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';

export const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>STYLE SHOPHUB</p>
            </div>
            <ul className="footer-links">
                <li>สินค้า</li>
                <li>เกี่ยวกับเรา</li>
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
                    <span><FaGithub size={24} /></span>
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Right Reserved</p>
            </div>
        </div>
    )
}
