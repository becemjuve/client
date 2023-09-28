import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decCount,
  deleteFromCart,
  getTotal,
  incCount,
} from "../redux/slice/shoppingCart";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const { cartProducts, total } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotal());
  }, []);

  // checkout handler
  const checkOutHandler = () => {
    axios
      .post(
        baseUrl + "orders/new",
        { cartProducts, total },
        {
          headers: {
            "x-auth": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => toast(res.data.message, { type: "success" }))
      .then(() => {
        dispatch(clearCart());
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
     
      cartProducts.length === 0 ? 
      <div className="about mt-5">
        <h1 className="font-family">Your cart is Empty</h1> 
      </div> :
      <>
       <div className="cart-prod-title mt-3">
        <h1>My Cart Products</h1>
      </div>
      {/* <div className="cart-container">
        <ul className="list-group">
          {cartProducts.map((product) => (
            <li className="cart-item">
              <h3 className="prod-name">{product.name.slice(0,9)}...</h3>
              <p className="prod-price">{product.price}$</p>
              <p className="prod-category">{product.category}</p>
              <div className="count-container">
                <button
                  className="count-button"
                  onClick={() => dispatch(decCount(product))}
                >
                  -
                </button>
                <p className="product-count">{product.count}</p>
                <button
                  className="count-button"
                  onClick={() => dispatch(incCount(product))}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => dispatch(deleteFromCart(product))}
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      </div> */}
      <div className="cart-container">
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name.slice(0, 20)}...</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>
                <div className="count-container">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => dispatch(decCount(product))}
                  >
                    -
                  </button>
                  <span className="product-count">{product.count}</span>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => dispatch(incCount(product))}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => dispatch(deleteFromCart(product))}
                >
                  <i class="fa-solid fa-trash"></i>
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <div className='checkout-container'>
        <h4 className="cart-total">{total.toFixed(2)}$</h4>
        {cartProducts.length !== 0 && (
          <button
            className="clear-cart-button"
            onClick={() => dispatch(clearCart())}
          >
            Clear cart
          </button>
        )}
        {cartProducts.length > 0 &&
          (isLoggedIn ? (
            <button className="checkout-button" onClick={checkOutHandler}>
              Check Out
            </button>
          ) : (
            <div className="alert alert-danger">
              please
              <Link to="/login" className="mx-2">
                login
              </Link>
              to make a checkout
            </div>
          ))}
      </div>
    </>
    
  );
}

export default Cart;
