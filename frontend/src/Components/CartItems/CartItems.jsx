import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import add_icon from '../Assets/addcart.png';

export const CartItems = ({ triggerError, triggerSuccess }) => {
    const { getTotalCartAmount, all_product, cartItems, removeToCart, addToCart, user } = useContext(ShopContext);
    const [showPopup, setShowPopup] = useState(false); // State สำหรับจัดการ popup

    const handleError = (message) => {
        triggerError(message); // เรียก Error Popup พร้อมข้อความที่ส่งมา
    };

    const handleSuccess = (message) => {
        triggerSuccess(message); // เรียก Error Popup พร้อมข้อความที่ส่งมา
    };

    if (!all_product || !cartItems) {
        return <div>No products available</div>;
    }

    const handleConfirmOrder = async () => {
        try {
            // Check if there are items in the cart
            if (!cartItems || cartItems.length === 0) {
                handleError("ไม่มีสินค้าในตะกร้า");
                return;
            }

            // Prepare order items
            const orderItems = all_product
                .filter((product) => cartItems.some((item) => item.itemId === product.id))
                .map((product) => {
                    const item = cartItems.find((item) => item.itemId === product.id);
                    return item ? {
                        productId: product.id,
                        name: product.name,
                        size: item.size || "N/A",
                        quantity: item.quantity || 0,
                        price: product.new_price,
                        total: product.new_price * (item.quantity || 0),
                    } : null;
                })
                .filter((item) => item);

            // Check if there are valid items in the order
            if (orderItems.length === 0) {
                handleError("ไม่พบข้อมูลสินค้าในคำสั่งซื้อ");
                return;
            }

            // Prepare order data
            const orderData = {
                name: user?.name || "Anonymous",
                idstudent: user?.idstudent || "N/A",
                totalAmount: getTotalCartAmount(),
                items: orderItems,
                orderDate: new Date().toISOString(),
            };

            console.log("Order Data: ", orderData);

            // Submit the order
            const response = await fetch('http://localhost:4000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Order Result: ", result);
                handleSuccess('คำสั่งซื้อสำเร็จ! รายการสินค้าถูกบันทึกเรียบร้อย');
                setShowPopup(false);
                // Optionally, clear the cart here
            } else {
                const errorText = await response.text();
                console.error("Error Response Text: ", errorText);
                const errorResult = await response.json();
                handleError(errorResult.message || 'เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ');
            }
        } catch (error) {
            console.error('Error confirming order:', error);
            handleError('เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ');
        }
    };





    return (
        <div className='cartitem'>
            <div className="cartitem-format-main">
                <span className='span'>สินค้า</span>
                <span className='span'>ชื่อสินค้า</span>
                <span className='span'>ราคา</span>
                <span className='span'>จำนวน</span>
                <span className='span'>รวม</span>
                <span className='span'>เพิ่ม & ลบ สินค้า</span>
                <span className='total'>ราคารวมสินค้า</span>
            </div>
            <hr />
            {cartItems.length > 0 && all_product.map((e) => {
                const items = cartItems.filter((item) => item.itemId === e.id);
                if (items.length > 0) {
                    return items.map((item, index) => (
                        <div key={`${e.id}-${item.size}-${index}`}>
                            <div className="cartitem-format cartitem-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p className='cartitem-name'>{e.name} <br /> ไซต์: ({item.size})</p>
                                <p>{e.new_price} <span>บาท</span></p>
                                <button className='cartitems-quantity'>{item.quantity}</button>
                                <p>{e.new_price * item.quantity}</p>
                                <img
                                    className='add-icon'
                                    src={add_icon}
                                    onClick={() => addToCart(e.id, item.size, e.new_price)}
                                    alt=""
                                />
                                <img
                                    className='cartitems-remove-icon'
                                    src={remove_icon}
                                    onClick={() => removeToCart(e.id, item.size)}
                                    alt=""
                                />
                            </div>
                        </div>
                    ));
                }
                return null;
            })}

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>ยอดรวมสินค้า</h1>
                    <div>
                        <div className="cartitem-total-item">
                            <p>ผลรวม</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>นัดรับเอง</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>ราคา</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={() => setShowPopup(true)}><span>สั่งซื้อสินค้า</span></button>
                </div>
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>ยืนยันคำสั่งซื้อ</h2>
                        <div className="popup-items">
                            {cartItems.length > 0 && all_product.map((e) => {
                                const items = cartItems.filter((item) => item.itemId === e.id);
                                if (items.length > 0) {
                                    return items.map((item, index) => (
                                        <div key={`${e.id}-${item.size}-${index}`} className="popup-item">
                                            <img src={e.image} alt="" />
                                            <p>{e.name}</p>
                                            <p>จำนวน: {item.quantity}</p>
                                            <p>รวม: {e.new_price * item.quantity} บาท</p>
                                        </div>
                                    ));
                                }
                                return null;
                            })}
                        </div>
                        <div className="popup-total">
                            <h3>ยอดรวมทั้งหมด: {getTotalCartAmount()} บาท</h3>
                        </div>
                        <button onClick={handleConfirmOrder}>ยืนยันคำสั่งซื้อ</button>
                        <button onClick={() => setShowPopup(false)}>ยกเลิก</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CartItems;