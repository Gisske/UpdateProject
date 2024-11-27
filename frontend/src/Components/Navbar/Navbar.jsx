import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/icon-dropdown.png'

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItem } = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    return (
        <div className='navbar'>
            <div className="navbar-logo">
                <Link style={{ textDecoration: 'none' }} to='/shop'><img src={logo} alt="Logo" /></Link>
                <p className='title-logo'>เครื่องแบบนักศึกษา</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => { setMenu("shop") }}>
                    <Link style={{ textDecoration: 'none' }} to='/shop'><p>หน้าสินค้า</p></Link>
                    {menu === "shop" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("mens") }}>
                    <Link style={{ textDecoration: 'none' }} to='/mens'><p>สินค้าผู้ชาย</p></Link>
                    {menu === "mens" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("womens") }}>
                    <Link style={{ textDecoration: 'none' }} to='/womens'><p>สินค้าผู้หญิง</p></Link>
                    {menu === "womens" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("shirt") }}>
                    <Link style={{ textDecoration: 'none' }} to='/shirt'><p>เสื้อช็อป</p></Link>
                    {menu === "shirt" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("ruls") }}>
                    <Link style={{ textDecoration: 'none' }} to='/ruls'><p>เข็มขัด</p></Link>
                    {menu === "ruls" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("shose") }}>
                    <Link style={{ textDecoration: 'none' }} to='/shose'><p>รองเท้า</p></Link>
                    {menu === "shose" ? <hr /> : null}
                </li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                    ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
                    : <Link to='/'>
                        <button>
                            <span>ลงชื่อเข้าใช้</span>
                        </button>
                    </Link>}
                <Link className='carticon' to='/cart'><img src={cart_icon} alt="Cart Icon" /></Link>
                <div className="nav-cart-count">{getTotalCartItem()}</div>
            </div>
        </div>
    );
}
