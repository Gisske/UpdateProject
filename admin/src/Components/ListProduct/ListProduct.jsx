import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = ({ triggerSuccess }) => {
    const [allproducts, setAllProducts] = useState([]);
    const navigate = useNavigate();

    const handleSuccess = (message) => {
        triggerSuccess(message); // เรียก Error Popup พร้อมข้อความที่ส่งมา
    };

    const fetchInfo = async () => {
        const response = await fetch('http://localhost:4000/allproducts');
        const data = await response.json();
        setAllProducts(data);
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });
        handleSuccess('ลบสินค้าสำเร็จ')
        await fetchInfo();
    };

    const editProduct = (id) => {
        navigate(`/edit-product/${id}`);
    };

    return (
        <div className="list-product">
            <h1>แสดงสินค้าทั้งหมด</h1>
            <div className="listproduct-format-main">
                <p>สินค้า</p>
                <p>ชื่อ</p>
                <p>ราคา</p>
                <p>หมวดหมู่</p>
                <p>แก้ไข</p>
                <p>ลบ</p>
            </div>
            <div className="listproduct-allproducts">
                {allproducts.map((product, index) => (
                    <div key={index} className="listproduct-format-main listproduct-format">
                        <img src={product.image} alt="" className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <div className="actions">
                            <button onClick={() => editProduct(product.id)}>Edit</button>
                        </div>
                        <img onClick={() => removeProduct(product.id)} src={cross_icon} alt="" className="listproduct-remove-icon" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListProduct;
