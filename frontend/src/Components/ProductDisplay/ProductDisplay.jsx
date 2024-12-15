import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';

export const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    // State for popup visibility and selected size
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [sizeMessage, setSizeMessage] = useState('');  // State for displaying selected size message

    // Show the popup when "Add to Cart" is clicked
    const handleAddToCartClick = () => {
        setIsPopupVisible(true);
    };

    // Handle size selection and show message
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setSizeMessage(`คุณได้เลือกไซต์: ${size}`);  // Display the selected size message
    };

    // Handle confirming the selection and adding to cart
    const handleConfirmAddToCart = () => {
        if (selectedSize) {
            addToCart(product.id, selectedSize, product.new_price); // ส่ง size ไปพร้อมกับ product ID
            setIsPopupVisible(false);
            setSizeMessage('');
        } else {
            alert('กรุณาเลือกไซต์!');
        }
    };

    return (
        <div className="productdisplay flex flex-col md:flex-row gap-4">
            {/* Left Section */}
            <div className="productdisplay-left md:w-1/2">
                <div className="productdisplay-img-list grid grid-cols-4 gap-2">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-image mt-4">
                    <img
                        className="productdisplay-main-img w-full rounded-lg"
                        src={product.image}
                        alt=""
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="productdisplay-right md:w-1/2 space-y-4">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <div className="productdisplay-right-prices flex items-center gap-4">
                    <div className="productdisplay-right-prices-old line-through text-gray-500">
                        ${product.old_price}
                    </div>
                    <div className="productdisplay-right-prices-new text-xl font-semibold text-green-500">
                        ${product.new_price}
                        <span> บาท</span>
                    </div>
                </div>
                <div className="productdisplay-right-description text-gray-700">
                    {product.description}
                </div>
                <div className="productdisplay-right-size space-y-2">
                    <h1 className="text-lg font-medium">เลือกไซต์</h1>
                    <div className="productdisplay-right-sizes flex gap-2">
                        {product.sizes &&
                            product.sizes.map((size, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                                    onClick={() => handleSizeSelect(size)}
                                >
                                    {size}
                                </div>
                            ))}
                    </div>
                </div>
                <button
                    className="addtocart bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={handleAddToCartClick}
                >
                    ADD TO CART
                </button>
            </div>

            {/* Popup */}
            {isPopupVisible && (
                <div className="popupcontainer fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="popupcontent bg-white p-6 rounded shadow-lg w-3/4 md:w-1/3">
                        <h2 className="text-xl font-semibold">เลือกไซต์</h2>
                        <div className="popup-sizes flex flex-wrap gap-2 mt-4">
                            {product.sizes &&
                                product.sizes.map((size, index) => (
                                    <div
                                        key={index}
                                        className="cursor-pointer px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                                        onClick={() => handleSizeSelect(size)}
                                    >
                                        {size}
                                    </div>
                                ))}
                        </div>
                        {sizeMessage && (
                            <div className="size-message text-green-500 font-semibold mt-4">
                                {sizeMessage}
                            </div>
                        )}
                        <div className="popup-actions flex gap-4 mt-6">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={handleConfirmAddToCart}
                            >
                                ยืนยัน
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => setIsPopupVisible(false)}
                            >
                                ยกเลิก
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};