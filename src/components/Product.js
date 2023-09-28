import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slice/shoppingCart";
import { Link } from "react-router-dom";


function Product({ product }) {
  const dispatch = useDispatch();

  return (
  
    <div className="container product-home col-2">    
      <Link to={`store/${product._id}`} className="image">
        {" "}
        <img className="image-product"
          style={{ width: "200px", height: "200px" }}
          src={product.image.secure_url}
          alt={product.name}
        />{" "}
      </Link>
      <div className="product-info">
      <h3 className="product-title">
        <Link to={`store/${product._id}`}>{product.name.slice(0,9)}...</Link>
      </h3>
      <p className="product-description">{product.description.slice(0,15)}...</p>

      <div className="d-flex justify-content-between">
      <h5 className=" ">Price: ${product.price}</h5>
      <i class="fa-solid fa-cart-shopping cur-p" 
        onClick={() => {
          dispatch(addToCart(product));
        }}
        ></i>
      </div>
      </div>
    </div>
   
  );
}

export default Product;





