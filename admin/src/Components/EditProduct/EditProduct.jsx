import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';
import upload_area from '../../assets/upload_area.svg'

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        image: '',
        description: '',
        category: '',
        new_price: '',
        old_price: ''
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:4000/product/${id}`);
            const data = await response.json();
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    // Function to handle image upload and return the URL
    const handleImageUpload = async () => {
        if (!imageFile) return null;

        const formData = new FormData();
        formData.append('product', imageFile);

        try {
            const response = await fetch("http://localhost:4000/upload", {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                return data.image_url; // Return the image URL if upload is successful
            } else {
                alert('Image upload failed, please try again.');
                return null;
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('An error occurred while uploading the image.');
            return null;
        }
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.name || !product.category || !product.new_price || !product.old_price) {
            alert("Please fill all required fields.");
            return;
        }

        let imageUrl = product.image;
        if (imageFile) {
            imageUrl = await handleImageUpload(); // Upload image and get the URL
            if (!imageUrl) return; // Stop submission if image upload fails
        }

        const updatedProduct = { ...product, image: imageUrl };

        try {
            const response = await fetch(`http://localhost:4000/updateproduct/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            const result = await response.json();
            if (result.success) {
                navigate('/listproduct');
            } else {
                alert('Failed to update product.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('An error occurred while updating the product.');
        }
    };

    return (
        <div className="edit-product-container">
            <div className="edit-product-form">
                <h2>แก้ไขสินค้า</h2>
                <form onSubmit={handleSubmit}>
                    <label>ชื่อสินค้า</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} />

                    <label>คำอธิบายสินค้า</label>
                    <textarea name="description" value={product.description} onChange={handleChange} />

                    <label>หมวดหมู่สินค้า</label>
                    <div className="addproduct-itemfield">
                        <select value={product.category} onChange={handleChange} name="category" className='add-product-selector'>
                            <option value="ผู้หญิง">ผู้หญิง</option>
                            <option value="ผู้ชาย">ผู้ชาย</option>
                            <option value="เสื้อช็อป">เสื้อช็อป</option>
                            <option value="เข้มขัด">เข้มขัด</option>
                            <option value="รองเท้า">รองเท้า</option>
                        </select>
                    </div>
                    <div className="addproduct-price">
                        <div className="addproduct-itemfield">
                            <label>ราคา</label>
                            <input type="number" name="old_price" value={product.old_price} onChange={handleChange} />
                        </div>
                        <div className="addproduct-itemfield">
                            <label>ราคาจริง</label>
                            <input type="number" name="new_price" value={product.new_price} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='uploadimg'>
                        <label htmlFor="file-input">
                            <label>เลือกรูปภาพ</label>
                            <img src={imageFile ? URL.createObjectURL(imageFile) : upload_area} className='addproduct-thumnail-img' alt="" />
                        </label>
                        <input onChange={handleImageChange} onClick={imageFile} type="file" name='image' id='file-input' hidden />
                        {product.image && (
                            <div>
                                <p className='Current'>รูปภาพสินค้าปัจจุบัน</p>
                                <img src={product.image} alt="Product" className='image' />
                            </div>
                        )}
                    </div>
                    <div className='edit-btn'>
                        <button type="submit">บันทึกสินค้า</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
