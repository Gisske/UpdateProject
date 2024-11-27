import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
const AddProduct = () => {

    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "ผู้หญิง",
        new_price: "",
        old_price: ""
    })
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
    const changehandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const Add_Product = async () => {
        console.log(productDetails)
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image)

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => { responseData = data })

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                data.success ? alert("Product Added") : alert("Failed")
            })
        }
    }

    return (
        <div className='add-product'>
            <h1>เพิ่มสินค้า</h1>
            <div className="addproduct-itemfield">
                <p>ชื่อสินค้า</p>
                <input value={productDetails.name} onChange={changehandler} type="text" name='name' placeholder='กรอกรายละเอียด ชื่อสินค้า' />
            </div>
            <div className="addproduct-itemfield">
                <p>คำอธิบายสินค้า</p>
                <textarea name="description" placeholder='กรอกรายละเอียด คำอธิบายสินค้า' value={productDetails.description} onChange={changehandler} />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>ราคา</p>
                    <input value={productDetails.old_price} onChange={changehandler} type="text" name='old_price' placeholder='กรอกรายละเอียด ราคา' />
                </div>
                <div className="addproduct-itemfield">
                    <p>ราคาจริง</p>
                    <input value={productDetails.new_price} onChange={changehandler} type="text" name='new_price' placeholder='กรอกรายละเอียด ราคาจริง' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>หมวดหมู่สินค้า</p>
                <select value={productDetails.category} onChange={changehandler} name="category" className='add-product-selector'>
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
            <button onClick={() => (Add_Product())} className='addproduct-btn'>เพิ่มสินค้า</button>
        </div>
    )
}

export default AddProduct
