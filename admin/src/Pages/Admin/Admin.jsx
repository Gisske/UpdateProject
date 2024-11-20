import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import EditProduct from '../../Components/EditProduct/EditProduct'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
        {/* เส้นทางสำหรับเพิ่มสินค้า */}
        <Route path='/addproduct' element={<AddProduct />} />

        {/* เส้นทางสำหรับแสดงรายการสินค้า */}
        <Route path='/listproduct' element={<ListProduct />} />

        {/* เส้นทางสำหรับแก้ไขสินค้า */}
        {/* ใช้ :id เพื่อรับค่า id ของสินค้าที่จะแก้ไข */}
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </div>
  )
}

export default Admin
