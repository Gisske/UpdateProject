import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);
    const navigate = useNavigate();

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
        await fetchInfo();
    };

    const editProduct = (id) => {
        navigate(`/edit-product/${id}`);
    };

    return (
        <div className="list-product">
            <h1>All Product List</h1>
            <div className="listproduct-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>EditProduct</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                {allproducts.map((product, index) => (
                    <div key={index} className="listproduct-format-main listproduct-format">
                        <img src={product.image} alt="" className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
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
