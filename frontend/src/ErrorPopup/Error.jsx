import React, { useState, useEffect } from "react";
import { FaSpinner, FaTimes, FaCheckCircle } from "react-icons/fa"; // เพิ่ม FaCheckCircle สำหรับ success icon
import "./Error.css"; // เปลี่ยนชื่อไฟล์ CSS ให้รองรับทั้ง error และ success

const NotificationPopup = ({
    showError,
    errorMessage,
    showSuccess,
    successMessage,
    onClose
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (showError || showSuccess) {
            setIsLoaded(false);
            const timer = setTimeout(() => {
                setIsLoaded(true);
            }, 200);
            return () => clearTimeout(timer);
        } else {
            setIsLoaded(false);
        }
    }, [showError, showSuccess]);

    return (
        (showError || showSuccess) && (
            <div
                className={`error-popup ${isLoaded ? "show" : ""
                    } ${showError ? "error" : "success"}`}
            >
                {!isLoaded ? (
                    <FaSpinner className="spinner" />
                ) : showError ? (
                    // แสดง error popup
                    <>
                        <div className="error-message">
                            <p>{errorMessage}</p>
                            <FaTimes
                                className="close-icon"
                                onClick={onClose}
                            />
                        </div>
                    </>
                ) : (
                    // แสดง success popup
                    <>
                        <div className="success-message">
                            <FaCheckCircle className="success-icon" />
                            <p>{successMessage}</p>
                            <FaTimes
                                className="close-icon"
                                onClick={onClose}
                            />
                        </div>

                    </>
                )}
            </div>
        )
    );
};

export default NotificationPopup;
