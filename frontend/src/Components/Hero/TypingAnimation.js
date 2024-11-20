// TypingAnimation.js
import React, { useState, useEffect } from 'react';

const TypingAnimation = () => {
    const texts = ["ที่ดีทุกคน", "สินค้าคุณภาพ", "สำหรับตัวคุณ"]; // ข้อความที่จะพิมพ์และลบวนไปมา
    const [currentText, setCurrentText] = useState('');
    const [index, setIndex] = useState(0); // ตำแหน่งของข้อความใน texts
    const [charIndex, setCharIndex] = useState(0); // ตำแหน่งตัวอักษรที่พิมพ์ในข้อความ
    const [isDeleting, setIsDeleting] = useState(false); // สถานะการลบข้อความ
    const typingSpeed = 100; // ความเร็วในการพิมพ์ต่ออักษร
    const deletingSpeed = 50; // ความเร็วในการลบต่ออักษร

    useEffect(() => {
        const handleTyping = () => {
            const fullText = texts[index]; // ข้อความที่กำลังพิมพ์

            if (isDeleting) {
                // กำลังลบข้อความ
                setCurrentText(fullText.substring(0, charIndex - 1));
                setCharIndex(prev => prev - 1);
            } else {
                // กำลังพิมพ์ข้อความ
                setCurrentText(fullText.substring(0, charIndex + 1));
                setCharIndex(prev => prev + 1);
            }

            // หากข้อความพิมพ์ครบแล้ว ให้เริ่มลบ
            if (!isDeleting && charIndex === fullText.length) {
                setTimeout(() => setIsDeleting(true), 1000); // หน่วงเวลา 1 วินาทีก่อนเริ่มลบ
            }
            // หากข้อความลบจนหมดแล้ว ให้เริ่มข้อความถัดไป
            else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setIndex((index + 1) % texts.length); // เปลี่ยนไปข้อความถัดไป
            }
        };

        const speed = isDeleting ? deletingSpeed : typingSpeed;
        const timer = setTimeout(handleTyping, speed);

        return () => clearTimeout(timer); // ล้างการทำงานของ timer เมื่อ state เปลี่ยน
    }, [charIndex, isDeleting, index]);

    return ( <
        span style = {
            {
                fontSize: '',
                fontWeight: '300',
                borderRight: '2px solid black', // เคอร์เซอร์กระพริบ
                whiteSpace: 'nowrap',
                display: 'inline-block'
            }
        } > { currentText } <
        /span>
    );
};

export default TypingAnimation;