import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img onClick={window.scroll(0, 0)} src={props.image} alt="" /></Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          ${props.new_price} <span>-บาท</span>
        </div>
        <div className="item-price-old">
          ${props.old_price}<span>-บาท</span>
        </div>

      </div>
      <Link to={`/product/${props.id}`}><button className='item-button'>เลือกดูสินค้าได้เลย</button></Link>
    </div>
  );
}

export default Item;
