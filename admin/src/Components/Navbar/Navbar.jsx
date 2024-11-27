import React, { useState } from 'react';
import './Navbar.css';
import navlogo from '../../assets/logo.png';
import navProfile from '../../assets/profile.png';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    window.location.replace('/');
  };

  return (
    <div className='navbar'>
      <img src={navlogo} alt="Logo" className="nav-logo" />
      <div className='profile-admin'>
        <div className="profile-container">
          <img
            src={navProfile}
            alt="Profile"
            className="nav-profile"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="profile-dropdown">
              <ul>
                <li><Link to="/profile">โปรไฟล์</Link></li>
                <li><Link to="/settings">ตั้งค่า</Link></li>
                {localStorage.getItem('auth-token') ? (
                  <li onClick={logout}>ออกจากระบบ</li>
                ) : (
                  <li><Link to="/">ลงชื่อเข้าใช้</Link></li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
