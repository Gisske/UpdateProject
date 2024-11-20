import React, { useEffect, useState } from 'react';
import './PopularMen.css';
import Item from '../Item/Item'; // ใช้ default import

export const PopularMen = () => {

    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/popularinmen')
            .then((response) => response.json())
            .then((data) => setPopularProducts(data))
    }, [])

    return (
        <div className='popular'>
            <h1 className='titleborder'>สำหรับนักศึกษาชาย</h1>
            <div className="popular-item">
                {popularProducts.map((item, i) => (
                    <Item
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>
        </div>
    );
}
