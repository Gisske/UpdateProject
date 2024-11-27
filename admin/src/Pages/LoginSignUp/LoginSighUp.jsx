import React, { useState } from "react";
import "../LoginSignUp/LoginSignUp.css";
import Logo_img from '../../assets/logo.png';

const LoginSignup = ({ triggerError }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });

    const handleError = (message) => {
        triggerError(message); // เรียก Error Popup พร้อมข้อความที่ส่งมา
    };


    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        const { email, password } = formData;

        // Validation: Check if both email and password are provided
        if (!email || !password) {
            handleError('โปรดกรอก Email และ Password');
            return;
        }

        let responseData;
        await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => (responseData = data));

        if (responseData.success) {
            const role = responseData.role;

            // Check if the role is admin or seller
            if (role === "admin") {
                localStorage.setItem("auth-token", responseData.token);
                handleError("เข้าสู่ระบบสำเร็จ!");
                window.location.replace("/admin"); // Redirect to admin page
            } else if (role === "seller") {
                localStorage.setItem("auth-token", responseData.token);
                handleError("เข้าสู่ระบบสำเร็จ!");
                window.location.replace("/seller"); // Redirect to seller page
            } else {
                handleError("บัญชีนี้ไม่สามารถเข้าสู่ระบบได้");
            }
        } else {
            handleError(responseData.error);
        }
    };

    return (
        <div className="center">
            <div className="container">
                <div className="form-container sign-in">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="footer-social-icon"></div>
                        <img className="img" src={Logo_img} alt="" />
                        <h1 className="for-h1">Sign In <p>Login for Admin & Seller</p></h1>
                        <input
                            type="email"
                            name="email"
                            placeholder="อีเมล"
                            value={formData.email}
                            onChange={changeHandler}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="รหัสผ่าน"
                            value={formData.password}
                            onChange={changeHandler}
                        />
                        <button type="button" onClick={login}>
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
