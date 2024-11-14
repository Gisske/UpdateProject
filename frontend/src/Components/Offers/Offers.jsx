import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/product_40.png'

export const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>ช็อปนักศึกษาออนไลน์</h1>
        <h1>ประสบการณ์ที่ดี</h1>
        <p>เติมเต็มความเป็นตัวคุณดีที่สุด</p>
        <button>
          <span>เลือกเลย</span>
        </button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}
