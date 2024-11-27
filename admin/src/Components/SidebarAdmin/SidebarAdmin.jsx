import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCog, FaTachometerAlt } from 'react-icons/fa'; // Importing icons from react-icons
import './SidebarAdmin.css';

const SidebarAdmin = () => {
    return (
        <div className='sidebar'>
            <h3>Admin Dashboard</h3>
            <div className='sidebar-grid'>
                <Link to={'/dashboard'} style={{ textDecoration: "none" }}>
                    <div className='sidebar-admin'>
                        <FaTachometerAlt className='item-icon' size={60} /> {/* Using FaTachometerAlt icon */}
                        <p>หน้าดูข้อมูล</p>
                    </div>
                </Link>

                <Link to={'/manage-users'} style={{ textDecoration: "none" }}>
                    <div className='sidebar-admin'>
                        <FaUserCog className='item-icon' size={60} /> {/* Using FaUserCog icon */}
                        <p>จัดการ User</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default SidebarAdmin;
