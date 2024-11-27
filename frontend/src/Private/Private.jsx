import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // ตรวจสอบ token จาก localStorage
    const token = localStorage.getItem('auth-token');

    // ถ้าไม่มี token ให้แสดง alert และ redirect ไปที่หน้า login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // ถ้ามี token ให้แสดงหน้า
    return children;
};

export default PrivateRoute;
