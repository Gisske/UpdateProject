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
            <h1>Add Products</h1>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changehandler} type="text" name='name' placeholder='Type Here' />
            </div>
            <div className="addproduct-itemfield">
                <p>description</p>
                <input value={productDetails.description} onChange={changehandler} type="text" name='description' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changehandler} type="text" name='old_price' placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changehandler} type="text" name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changehandler} name="category" className='add-product-selector'>
                    <option value="ผู้หญิง">women</option>
                    <option value="ผู้ชาย">men</option>
                    <option value="เสื้อช็อป">shop</option>
                    <option value="เข้มขัด">line</option>
                    <option value="รองเท้า">shoes</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
                </label>
                <input onClick={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={() => (Add_Product())} className='addproduct-btn'>ADD</button>
        </div>
    )
}

export default AddProduct
