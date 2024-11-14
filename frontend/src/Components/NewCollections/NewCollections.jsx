import React from 'react';
import './NewCollections.css';
import data_product from '../Assets/new_collections';
import Item from '../Item/Item'; // ใช้ default import

export const NewCollections = () => {
    return (
        <div className='new-collections'>
            <h1>สำหรับทุกคน</h1>
            <hr />
            <div className="collections">
                {data_product.map((item, i) => (
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
