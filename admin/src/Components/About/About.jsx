import React from 'react';
import './About.css';
import logo_img from '../../assets/logo.png'


const About = () => {
    return (
        <div className="about-container">
            <img className='logo' src={logo_img} alt="" />
            <h2 className="about-title">เกี่ยวกับเว็บไซต์ของเรา</h2>
            <p className="about-description">
                ยินดีต้อนรับสู่ Student Style Hub แพลตฟอร์มที่ออกแบบมาเพื่อให้การซื้อชุดเครื่องแบบนักเรียนนักศึกษาง่ายและสะดวกที่สุดสำหรับคุณ!
                เรามุ่งมั่นที่จะนำเสนอเครื่องแบบคุณภาพดีในราคาที่เหมาะสม พร้อมระบบออนไลน์ที่ทันสมัย ช่วยลดเวลาการสั่งซื้อและจัดการได้ง่ายดาย
                สำรวจสินค้า เลือกชุดที่ใช่ และมั่นใจได้กับการบริการที่ตอบโจทย์ความต้องการของคุณทุกประการ!

                หากต้องการปรับคำให้เหมาะกับโทนของเว็บไซต์มากขึ้น เช่น ให้ดูเป็นกันเองหรือทางการมากขึ้น บอกฉันได้เลย!
            </p>
            <div className="about-services">
                <div className="service-card">
                    <div className="service-icon"></div>
                    <h3 className="service-title">Web Ecommerce</h3>
                    <p className="service-description">
                        Lorem ipsum elit. Labore quis nemo voluptatem dolorem libero temporibus officiis dignissimos?
                    </p>
                </div>
                <div className="service-card">
                    <div className="service-icon"></div>
                    <h3 className="service-title">App Ecommerce</h3>
                    <p className="service-description">
                        Lorem ipsum elit. Labore quis nemo voluptatem dolorem libero temporibus officiis dignissimos?
                    </p>
                </div>
                <div className="service-card">
                    <div className="service-icon"></div>
                    <h3 className="service-title">Content Ecommerce</h3>
                    <p className="service-description">
                        Lorem ipsum elit. Labore quis nemo voluptatem dolorem libero temporibus officiis dignissimos?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
