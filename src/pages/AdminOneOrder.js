import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../baseUrl'
import {authConfig} from '../config/authConfig'
import { toast } from "react-toastify";




function AdminOneOrder() {
    const {id} = useParams()
    const [order, setOrder] = useState({})
    const [status,setStatus]= useState('pending')
    const getOneOrder = ()=>{
        axios.get(baseUrl + 'orders/'+ id,{ 
          headers: {
          "x-auth": localStorage.getItem('token'),
        },}  )
        .then(res => {
            setOrder(res.data.order)
            console.log(res.data.order)
          })
    }
    const updateOrderHandler=(status)=>{
      const action = status === 'pending'? 'processing' : 'delivered'
      axios.put(baseUrl + 'orders/' + id,{action}, { 
        headers: {
        "x-auth": localStorage.getItem('token'),
      },})
      .then(res=>{
        toast(res.data.message,{type:'success'})
        getOneOrder()
      })
      .catch(err=>console.log(err))
    }
    useEffect(() => {
        getOneOrder()
      }, []);

  return (   
    
  <div className="admin-order-details">
    <div className="user-profile-page mt-2">
        <h1>One Order Control</h1>
      </div>
  {/* User Info */}
  <div className="user-info">
    <h1>{order.user?.firstName}</h1>
    <p>Phone Number: {order.user?.phoneNumber}</p>
  </div>

  {/* Product Cards */}
  <div className="product-card-container ">
    {order.products?.map((prod) => (
      <div className="product-card " key={prod._id}>
        <h2>{prod.product.name}</h2>
        <img src={prod.product.image.secure_url} alt={prod.name} />
        <p>Price: {prod.product.price}$</p>
        <p>Quantity: {prod.quantity}</p>
      </div>
    ))}
  </div>

  {/* Order Status */}
  <div className="order-status">
    <h3>Status: {order.status}</h3>
    <button
      className='btn btn-info'
      disabled={order.status === 'delivered'}
      onClick={() => updateOrderHandler(order.status)}
    >
      {order.status === 'pending' ? "Processing" : "Delivered"}
    </button>
  </div>
</div>
);
}



export default AdminOneOrder
