import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../baseUrl';

function UserOrders() {
  const [userOrders, setUserOrders] = useState([]);
  
  const getUserOrders = () => {
    axios.get(baseUrl + 'orders/getOrderUser', {
      headers: {
        "x-auth": localStorage.getItem('token'),
      },
    }) 
    .then((res) => setUserOrders(res.data.orders))
    .catch(err=>console.log(err)) 
  };

  useEffect(() => {
    getUserOrders()
  }, []);

  return (
    <div className="container">
      
      <div className="user-profile-page mt-2">
        <h1>My Order</h1>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className='table-th' scope="col">#</th>
            <th className='table-th' scope="col">Products</th>
            <th className='table-th' scope="col">Price</th>
            <th className='table-th' scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {userOrders.map((order, i) => (
            <tr key={order.id}>
              <th scope="row">{i + 1}</th>
              <td>
                {order.products.map((prod, index) => (
                  <p className='product-details' key={index}>
                    {`${prod.product.name}`}
                    
                  </p>
                ))}
              </td>
              <td className='price'>{order.totalAmount}$</td>
              <td>
                {order.status === 'delivered' ? (
                  <span className='status-delivered'>Delivered</span>
                ) : order.status === 'pending' ? (
                  <span className='status-pending'>Pending</span>
                ) : order.status === 'processing' ? (
                  <span className='status-processing'>Processing</span>
                ) : (
                  <span className='status-default'>{order.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserOrders;
