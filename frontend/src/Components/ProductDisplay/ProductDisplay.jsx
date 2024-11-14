import React, { useContext } from 'react'
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext'

export const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
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
                    In this single tutorial we will make a full stack eCommerce website using (MERN) React JS, MongoDB, Express and Node JS or Online Store using React JS. We will make the e-commerce front-end website to display products, product cart and login registration page using React JS.
                    Then we will make the back-end of the website using express, node js, mongo db and react js. Where we will create the APIs to add product, display product, update product, update cart items and login registration API. We will also make the admin panel of our eCommerce website to add product, update product on our e-commerce website.
                </div>
                <div className="productdisplay-right-size">
                    <h1>เลือกไซต์</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button className="addtocart" onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
            </div>
        </div>
    )
}
