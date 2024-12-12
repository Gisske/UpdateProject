import React, { useState } from "react";
import "./CSS/LoginSignUp.css";
import Logo_img from '../Components/Assets/logo.png'
import { FaInstagram, FaFacebook, FaLine } from 'react-icons/fa';

const LoginSignup = ({ triggerError }) => {
  const [state, setState] = useState("Login"); // จัดการสถานะ Login หรือ Signup
  const [formData, setFormData] = useState({
    username: "",
    idstudent: "",
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

    // ตรวจสอบว่า email และ password ถูกกรอกครบถ้วน
    if (!email || !password) {
      handleError("โปรดกรอก Email และ Password ก่อนเข้าใช้");
      return;
    }

    console.log("Login Function Executed", { formData });
    let responseData;
    try {
      // Make the POST request to login endpoint
      await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => (responseData = data));

      if (responseData.success) {
        const role = responseData.role; // รับ role จาก Backend

        if (role === "user") { // อนุญาตเฉพาะ user เท่านั้น
          localStorage.setItem("auth-token", responseData.token);

          // ตรวจสอบว่า token ถูกต้องหรือไม่
          const token = localStorage.getItem("auth-token");
          if (!token) {
            handleError("ไม่พบ Token, กรุณาลองใหม่");
            return;
          }

          // Redirect to the shop page after successful login
          window.location.replace("/shop");
        } else {
          handleError("บัญชีนี้ไม่ได้รับอนุญาตให้เข้าสู่ระบบ");
        }
      } else {
        handleError(responseData.errors || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      }
    } catch (error) {
      console.error(error);
      handleError("เกิดข้อผิดพลาด กรุณาลองใหม่ในภายหลัง");
    }
  };





  const signup = async () => {
    const { username, idstudent, email, password, role } = formData; // เพิ่ม role

    if (!username || !idstudent || !email || !password) {
      handleError("กรุณากรอกข้อมูลให้ครบถ้วนทั้งชื่อผู้ใช้, อีเมล และ รหัสผ่าน");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, idstudent, email, password, role: role || "user" }), // ส่ง role ไปยัง Backend
      });

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        handleError(responseData.errors || "รหัสนักศึกษา และ อีเมล ซ้ำ! กรุณาลองใหม่");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      handleError("เกิดข้อผิดพลาด กรุณาลองใหม่ในภายหลัง");
    }
  };




  return (
    <div className="center">
      <div className={`container ${state === "Signup" ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="footer-social-icon">
              <div className="footer-icons-container">
                <span><FaInstagram size={24} /></span>
              </div>
              <div className="footer-icons-container">
                <span><FaFacebook size={24} /></span>
              </div>
              <div className="footer-icons-container">
                <span><FaLine size={24} /></span>
              </div>
            </div>
            <h1 className="for-h1">Create Account</h1>
            <input
              type="text"
              name="username"
              placeholder="ชื่อนักศึกษา"
              value={formData.username}
              onChange={changeHandler}
            />
            <input
              type="text"
              name="idstudent"
              placeholder="รหัสนักศึกษา"
              value={formData.idstudent}
              onChange={changeHandler}
            />
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
            <button type="button" onClick={signup}>
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="footer-social-icon">
              <div className="footer-icons-container">
                <span><FaInstagram size={24} /></span>
              </div>
              <div className="footer-icons-container">
                <span><FaFacebook size={24} /></span>
              </div>
              <div className="footer-icons-container">
                <span><FaLine size={24} /></span>
              </div>
            </div>
            <h1 className="for-h1">Sign In</h1>
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
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <img className="toggle-logo" src={Logo_img} alt="" />
              <h1>ยินดีต้อนรับ!</h1>
              <p>หลังจากกรอกรายละเอียดเรียบร้อยแล้ว <br /> สามารถคลิ๊กที่ปุ่ม Sing Up เพื่อเข้าใช้งานได้เลย</p>
              <button className="hidden" onClick={() => setState("Login")}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <img className="toggle-logo" src={Logo_img} alt="" />
              <h1>สวัสดีนักศึกษาทุกท่าน</h1>
              <p>หากยังไม่ได้สมัครสมาชิกสามารถคลิ๊กที่ปุ่มสมัครด้านล่างได้เลย!</p>
              <button className="hidden" onClick={() => setState("Signup")}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup; 