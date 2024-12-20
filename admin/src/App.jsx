// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Navbar } from './Components/Navbar/Navbar'
import { Footer } from './Components/Footer/Footer'
import Admin from './Pages/Admin/Admin';
import { Routes, Route, useLocation } from "react-router-dom";
import LoginSignup from './Pages/LoginSignUp/LoginSighUp';
import AddProduct from './Components/AddProduct/AddProduct'
import ListProduct from './Components/ListProduct/ListProduct'
import EditProduct from './Components/EditProduct/EditProduct'
import ManageUsers from './Components/ManageUsers/ManageUsers';
import Dashboard from './Components/Dashboard/Dashboard';
import Seller from './Pages/Seller/Seller';
import NotificationPopup from './Error/Error';
import About from "./Components/About/About";
import Private from './Private/Private'

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const triggerError = (message) => {
    setErrorMessage(message);
    setShowError(true);
  };

  const triggerSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
  };

  const closeNotification = () => {
    setShowError(false);
    setShowSuccess(false);
  };

  return (
    <div>
      <NotificationPopup
        showError={showError}
        errorMessage={errorMessage}
        showSuccess={showSuccess}
        successMessage={successMessage}
        onClose={closeNotification}
      />
      {!isLoginPage && <Private><Navbar /></Private>} {/* Hide Navbar on login page */}
      <Routes>
        <Route path="/" element={<LoginSignup triggerError={triggerError} triggerSuccess={triggerSuccess} />} />
        <Route path="seller" element={<Private><Admin /></Private>} />
        <Route path="admin" element={<Private><Seller /></Private>} />
        {/* เส้นทางสำหรับเพิ่มสินค้า */}
        <Route path='/addproduct' element={<Private><AddProduct triggerError={triggerError} triggerSuccess={triggerSuccess} /></Private>} />
        {/* เส้นทางสำหรับแสดงรายการสินค้า */}
        <Route path='/listproduct' element={<Private><ListProduct triggerSuccess={triggerSuccess} /></Private>} />
        {/* เส้นทางสำหรับแก้ไขสินค้า */}
        <Route path='/edit-product/:id' element={<Private><EditProduct /></Private>} />
        <Route path="/manage-users" element={<Private><ManageUsers /></Private>} />
        <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
        <Route path="/about" element={<Private><About /></Private>} />
      </Routes>
      {!isLoginPage && <Private><Footer /></Private>}
    </div>
  )
}

export default function WrappedApp() {
  return (
    <App />
  );
}
