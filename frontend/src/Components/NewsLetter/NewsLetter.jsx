import React from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>ส่งข้อเสนอแนะมาที่นี้</h1>
        <p>โปรดติดตามเราเพื่อรอประสบการณ์ที่ดีจากเรา</p>
        <div>
            <input type="email" placeholder='Your Email id' />
            <button>Submit</button>
        </div>
    </div>
  )
}
