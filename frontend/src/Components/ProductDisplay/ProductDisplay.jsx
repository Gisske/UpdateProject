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
            addToCart(product.id, selectedSize);
            setIsPopupVisible(false);  // Close popup after adding to cart
            setSizeMessage('');  // Clear the size message after confirming
        } else {
            alert('Please select a size!');
        }
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-image">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-prices-old">${product.old_price}</div>
                    <div className="productdisplay-right-prices-new">${product.new_price}<span> บาท</span></div>
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                <div className="productdisplay-right-size">
                    <h1>เลือกไซต์</h1>
                    <div className="productdisplay-right-sizes">
                        <div onClick={() => handleSizeSelect('S')}>S</div>
                        <div onClick={() => handleSizeSelect('M')}>M</div>
                        <div onClick={() => handleSizeSelect('L')}>L</div>
                        <div onClick={() => handleSizeSelect('XL')}>XL</div>
                        <div onClick={() => handleSizeSelect('XXL')}>XXL</div>
                    </div>
                </div>
                <button className="addtocart" onClick={handleAddToCartClick}>ADD TO CART</button>


            </div>

            {/* Popup for size selection */}
            {isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>เลือกไซต์</h2>
                        <div className="popup-sizes">
                            <div onClick={() => handleSizeSelect('S')}>S</div>
                            <div onClick={() => handleSizeSelect('M')}>M</div>
                            <div onClick={() => handleSizeSelect('L')}>L</div>
                            <div onClick={() => handleSizeSelect('XL')}>XL</div>
                            <div onClick={() => handleSizeSelect('XXL')}>XXL</div>
                        </div>
                        {/* Display the size message */}
                        {sizeMessage && <div className="size-message">{sizeMessage}</div>}
                        <div className="popup-actions">
                            <button onClick={handleConfirmAddToCart}>Confirm</button>
                            <button onClick={() => setIsPopupVisible(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
