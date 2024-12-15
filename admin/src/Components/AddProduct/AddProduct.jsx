import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = ({ triggerSuccess, triggerError }) => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "ผู้หญิง",
        new_price: "",
        old_price: "",
        sizes: [] // เพิ่มขนาดสินค้าใน state
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const handleError = (message) => {
        triggerError(message); // เรียก Error Popup พร้อมข้อความที่ส่งมา
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const handleSuccess = (message) => {
        triggerSuccess(message); // เรียก Error Popup พร้อมข้อความที่ส่งมา
    };

    const addSizes = () => {
        // ฟังก์ชันเพิ่มขนาดสินค้า
        const sizesInput = prompt("กรุณากรอกขนาดสินค้า (เช่น S, M, L) แยกด้วยเครื่องหมายจุลภาค (,)");
        if (sizesInput) {
            const newSizes = sizesInput.split(",").map(size => size.trim()).filter(size => size);
            // กรองขนาดที่ซ้ำกัน
            const uniqueSizes = [...new Set([...productDetails.sizes, ...newSizes])];
            setProductDetails({ ...productDetails, sizes: uniqueSizes });
        }
    };

    const Add_Product = async () => {
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        try {
            const uploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error('โปรดอัปโหลดรูปสินค้า');
            }

            responseData = await uploadResponse.json();

            if (responseData.success) {
                product.image = responseData.image_url;

                const addProductResponse = await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });

                const data = await addProductResponse.json();

                if (data.success) {
                    handleSuccess("เพิ่มสินค้าสำเร็จ!");
                } else {
                    handleError("โปรดกรอกรายละเอียดสินค้า");
                }
            } else {
                handleError("โปรดอัปโหลดรูปสินค้า");
            }
        } catch (error) {
            handleError(error.message);
        }
    };


    return (
        <div className='add-product'>
            <h1>เพิ่มสินค้า</h1>
            <div className="addproduct-itemfield">
                <p>ชื่อสินค้า</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='กรอกรายละเอียด ชื่อสินค้า' />
            </div>
            <div className="addproduct-itemfield">
                <p>คำอธิบายสินค้า</p>
                <textarea name="description" placeholder='กรอกรายละเอียด คำอธิบายสินค้า' value={productDetails.description} onChange={changeHandler} />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>ราคา</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='กรอกรายละเอียด ราคา' />
                </div>
                <div className="addproduct-itemfield">
                    <p>ราคาจริง</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='กรอกรายละเอียด ราคาจริง' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>หมวดหมู่สินค้า</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="ผู้หญิง">ผู้หญิง</option>
                    <option value="ผู้ชาย">ผู้ชาย</option>
                    <option value="เสื้อช็อป">เสื้อช็อป</option>
                    <option value="เข็มขัด">เข็มขัด</option>
                    <option value="รองเท้า">รองเท้า</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
                </label>
                <input onClick={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <div className="addproduct-itemfield">
                <p>ขนาดสินค้า</p>
                <div className="size-list">
                    {productDetails.sizes.map((size, index) => (
                        <span key={index} className="size-item">{size}</span>
                    ))}
                </div>
                <button onClick={addSizes} className='add-size-btn'>เพิ่มขนาด</button>
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>เพิ่มสินค้า</button>
        </div>
    );
};

export default AddProduct;
