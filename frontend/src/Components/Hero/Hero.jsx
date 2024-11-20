// Hero.js
import React from 'react';
import './Hero.css';
import hero_image from '../Assets/product_40.png';
import TypingAnimation from './TypingAnimation';

export const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>สินค้าที่ดีมีแค่ที่นี้เท่านั้น</h2>
                <div className="hero-hand-icon">
                    <p>สินค้ามากมาย</p>
                </div>
                <p>สำหรับนักศึกษา</p>
                <p><TypingAnimation /></p>
                <div className="hero-latest-btn">
                    <span>เลือกดูสินค้า</span>
                </div>
            </div>
            <div className="hero-right">
                <img src={hero_image} alt="สินค้าของเรา" />
            </div>
        </div>
    );
};

export default Hero;
