import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../baseUrl'
import { Link } from 'react-router-dom'

function AdminOrders() {
    const [allOrders, setAllOrders] = useState([])
    const getAllOrder=()=>{
        axios.get(baseUrl + 'orders/getall',{
          headers: {
          "x-auth": localStorage.getItem('token'),
        },})
        .then(res=>setAllOrders(res.data.allOrders))
    }
    const convertDate = (date)=>{
      let glob = date.split('T').join(' ')
      let datee = glob.split(' ')[0]
      let time = glob.split(' ')[1].slice(0,5)
      return time + ' - ' + datee
    }
    useEffect(()=>{
        getAllOrder()
    },[])
  return (
    <div>
      <div className="user-profile-page mt-2">
        <h1>Admin Orders Control</h1>
      </div>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">customer</th>
      <th scope="col">Phone</th>
      <th scope="col">Status</th>
      <th scope="col">Price</th>
      <th scope="col">Date</th>
      <th scope="col">Update</th>

    </tr>
  </thead>
  <tbody>
   {
    allOrders.map((order,i)=>(
        <tr key={order.id}>
        <th scope="row">{i+1}</th>
        <td className='info-user '>{order.user?.firstName+' '+order.user?.lastName}</td>
        <td className='phone-user'>{order.user?.phoneNumber}</td>
        <td>
          <span className= {`badge rounded-pill ${
            order.status === 'pending'? 'bg-warning' : 
            order.status === 'processing'? 'bg-info' : 'bg-primary'
          }`}>
          {order.status}
          </span>
        </td>
        <td className='price-order'>{order.totalAmount}$</td>
        <td className=''>{convertDate(order?.orderDate)}</td>
        <td><Link to={`/admin/orders/${order._id}`} className='btn btn-outline-success'>{<i class="fa-solid fa-pen-to-square"></i>}</Link></td>
        
      </tr>
    ))
   }
  </tbody>
</table>
    </div>
  )
}

export default AdminOrders
