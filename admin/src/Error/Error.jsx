import React, { useState, useEffect } from "react";
import { FaSpinner, FaTimes } from "react-icons/fa"; // import FaTimes for close icon
import "./Error.css"; // ไฟล์ CSS แยกสำหรับ styling

const ErrorPopup = ({ showError, errorMessage, onClose }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        console.log("showError:", showError);
        if (showError) {
            setIsLoaded(false);
            const timer = setTimeout(() => {
                setIsLoaded(true);
                console.log("Spinner should be hidden, loading finished.");
            }, 200);
            return () => clearTimeout(timer);
        } else {
            setIsLoaded(false);
        }
    }, [showError]);

    return (
        showError && (
            <div className={`error-popup ${isLoaded ? "show" : ""}`}>
                <div className="error-message">
                    {!isLoaded ? (
                        <FaSpinner className="spinner" /> // แสดง spinner ก่อน
                    ) : (
                        <>
                            <p>{errorMessage}</p>
                            <FaTimes className="close-icon" onClick={onClose} /> {/* ใช้ FaTimes แทนปุ่ม */}
                        </>
                    )}
                </div>
            </div>
        )
    );
};

export default ErrorPopup;
