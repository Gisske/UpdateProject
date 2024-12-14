import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import add_icon from '../Assets/addcart.png';

export const CartItems = ({ triggerError }) => {
    const { getTotalCartAmount, all_product, cartItems, removeToCart, addToCart, user } = useContext(ShopContext);
    const [showPopup, setShowPopup] = useState(false); // State สำหรับจัดการ popup

    const handleError = (message) => {
        triggerError(message); // เรียก Error Popup พร้อมข้อความที่ส่งมา
    };

    if (!all_product || !cartItems) {
        return <div>No products available</div>;
    }

    // ฟังก์ชันสำหรับยืนยันการสั่งซื้อ
    const handleConfirmOrder = async () => {
        try {
            const orderItems = all_product
                .filter((e) => cartItems[e.id] > 0)
                .map((e) => ({
                    productId: e.id,
                    name: e.name,
                    quantity: cartItems[e.id],
                    total: e.new_price * cartItems[e.id],
                }));

            const orderData = {
                name: user.name, // สมมติ user มีข้อมูล name ใน context
                idstudent: user.idstudent,
                totalAmount: getTotalCartAmount(),
                items: orderItems,
            };

            // ส่งข้อมูลคำสั่งซื้อไปยัง backend
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                alert('คำสั่งซื้อสำเร็จ!');
                setShowPopup(false); // ปิด popup หลังจากยืนยัน
            } else {
                alert('เกิดข้อผิดพลาดในการสั่งซื้อ');
            }
        } catch (error) {
            console.error('Error confirming order:', error);
            handleError('เกิดข้อผิดพลาดในการสั่งซื้อ');
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
            {/* { cartItems.length > 0 && all_product.map((e) => {
                const item = cartItems.find((item) => item.itemId === e.id);
                if (item) {
                    return <div key={e.id}>
                        <div className="cartitem-format cartitem-format-main">
                            <img src={e.image} alt="" className='carticon-product-icon' />
                            <p className='cartitem-name'>{e.name}</p>
                            <p>{e.new_price} <span>บาท</span></p>
                            <button className='cartitems-quantity'>{item.quantity}</button>
                            <p>{e.new_price * item.quantity}</p>
                            <img className='add-icon' src={add_icon} onClick={() => { addToCart(e.id, item.size) }} alt="" />
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeToCart(e.id) }} alt="" />
                        </div>
                    </div>
                }
                return null;
            })} */}

            {/* {cartItems.length > 0 && all_product.map((e) => {
                const item = cartItems.find((item) => item.itemId === e.id);
                if (item) {
                    return <div key={e.id}>
                        <div className="cartitem-format cartitem-format-main">
                            <img src={e.image} alt="" className='carticon-product-icon' />
                            <p className='cartitem-name'>{e.name}</p>
                            <p>{e.new_price} <span>บาท</span></p>
                            <button className='cartitems-quantity'>{item.quantity}</button>
                            <p>{e.new_price * item.quantity}</p>
                            <img className='add-icon' src={add_icon} onClick={() => { addToCart(e.id, item.size, e.new_price) }} alt="" />
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeToCart(e.id) }} alt="" />
                        </div>
                    </div>
                }
                return null;
            })} */}

            {cartItems.length > 0 && all_product.map((e) => {
                const items = cartItems.filter((item) => item.itemId === e.id); // หา items ทั้งหมดที่ตรงกับ product
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
                                const items = cartItems.filter((item) => item.itemId === e.id); // หา items ทั้งหมดที่ตรงกับ product
                                if (items.length > 0) {
                                    return items.map((item, index) => (
                                        <div key={item.id} className="popup-item">
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
