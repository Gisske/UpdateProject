import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';

// สร้าง Sidebar component
const Sidebar = () => {
    return (
        <div className='sidebar'>
            {/* ลิงก์ไปยังหน้าเพิ่มสินค้า */}
            <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
                <div className='sidebar-item'>
                    <img src={add_product_icon} alt="เพิ่มสินค้า" />
                    <p>เพิ่มสินค้าเข้าสู่ระบบ</p>
                </div>
            </Link>

            {/* ลิงก์ไปยังหน้ารายการสินค้า */}
            <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
                <div className='sidebar-item'>
                    <img src={list_product_icon} alt="Product List" />
                    <p>แสดงสินค้าที่มีอยู่ในระบบ</p>
                </div>
            </Link>
        </div>
    );
}

export default Sidebar;
