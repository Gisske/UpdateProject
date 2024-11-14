// src\Pages\Shop.jsx
import React from 'react';
import { Hero } from '../Components/Hero/Hero';
import { Popular } from '../Components/Popular/Popular';
import { Offers } from '../Components/Offers/Offers';
import { NewCollections } from '../Components/NewCollections/NewCollections';
import './CSS/shop.css'

// ประกาศ Shop คอมโพเนนต์เพียงครั้งเดียว
const Shop = () => {
    return (
        <div>
            <Hero />
            <Popular />
            <Offers />
            <NewCollections />
        </div>
    );
}

export default Shop;
