import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import add_icon from '../Assets/addcart.png';

export const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeToCart, addToCart } = useContext(ShopContext);

    if (!all_product || !cartItems) {
        return <div>No products available</div>;
    }

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
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitem-format cartitem-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p className='cartitem-name'>{e.name}</p>
                                <p>{e.new_price} <span>บาท</span></p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>{e.new_price * cartItems[e.id]}</p>
                                <img className='add-icon' src={add_icon} onClick={() => { addToCart(e.id) }} alt="" />
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeToCart(e.id) }} alt="" />
                            </div>
                            <hr />
                        </div>
                    )
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
                    <button><span>สั่งซื้อสินค้า</span></button>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
