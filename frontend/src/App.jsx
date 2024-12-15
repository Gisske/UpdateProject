import React, { useState } from "react";
import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { Footer } from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Shop from "./Pages/shop";
import ShopCategory from "./Pages/shopCategory";
import Product from "./Pages/Product";
import LoginSignup from "./Pages/LoginSignup";
import Cart from "./Pages/Cart";
import men_banner from "./Components/Assets/shirt.jpg";
import women_banner from "./Components/Assets/fashion3.webp";
import shop_banner from "./Components/Assets/shop.jpg";
import line_banner from "./Components/Assets/line.jpg";
import shoes_banner from "./Components/Assets/shoesbanner.jpg";
import ErrorPopup from "./ErrorPopup/Error";
import PrivateRoute from "./Private/Private"; // import PrivateRoute
import CartItems from "./Components/CartItems/CartItems";

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

    const closeErrorPopup = () => {
        setShowError(false);
        setShowSuccess(false);
    };

    return (
        <div>
            {/* ErrorPopup Component for displaying error and success messages */}
            <ErrorPopup
                showError={showError}
                errorMessage={errorMessage}
                showSuccess={showSuccess}
                successMessage={successMessage}
                onClose={closeErrorPopup}
            />

            {/* Conditionally render Navbar based on login status */}
            {!isLoginPage && <PrivateRoute><Navbar /></PrivateRoute>}

            <Routes>
                {/* Public route for the login/signup page */}
                <Route path="/" element={<LoginSignup triggerError={triggerError} triggerSuccess={triggerSuccess} />} />

                {/* Private routes for other pages */}
                <Route
                    path="/shop"
                    element={<PrivateRoute><Shop /></PrivateRoute>}
                />
                <Route path="/mens" element={<PrivateRoute><ShopCategory banner={men_banner} category="ผู้ชาย" /></PrivateRoute>} />
                <Route path="/womens" element={<PrivateRoute><ShopCategory banner={women_banner} category="ผู้หญิง" /></PrivateRoute>} />
                <Route path="/shirt" element={<PrivateRoute><ShopCategory banner={shop_banner} category="เสื้อช็อป" /></PrivateRoute>} />
                <Route path="/ruls" element={<PrivateRoute><ShopCategory banner={line_banner} category="เข็มขัด" /></PrivateRoute>} />
                <Route path="/shose" element={<PrivateRoute><ShopCategory banner={shoes_banner} category="รองเท้า" /></PrivateRoute>} />
                <Route path="product" element={<PrivateRoute><Product /></PrivateRoute>}>
                    <Route path=":productId" element={<PrivateRoute><Product /></PrivateRoute>} />
                </Route>
                <Route path="/cart" element={<PrivateRoute><CartItems triggerError={triggerError} triggerSuccess={triggerSuccess} /></PrivateRoute>} />
            </Routes>

            {/* Conditionally render Footer based on login status */}
            {!isLoginPage && <PrivateRoute><Footer /></PrivateRoute>}
        </div>
    );
}

// WrappedApp component for using BrowserRouter
export default function WrappedApp() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}
