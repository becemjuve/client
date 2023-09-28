import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../redux/slice/productSlice";
import { addToCart } from "../redux/slice/shoppingCart";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getOneProduct(id));
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="product-details-container d-flex mt-5">
      <img className="ms-2" src={product?.image?.secure_url} alt={product?.name} />
      <div className="ms-3 mt-2 p-2">
        <h1 className="product-details-title">{product?.name}</h1>
        <p className="product-details-price">{product?.price}$</p>
        <div className="d-flex gap-2 align-items-center">
          <h4>avaibility:</h4>
          <p className="badge rounded-pill bg-success ">
            {product?.stock} in stock
          </p>
        </div>
        <h4>description:</h4>
        <p className="product-details-description">{product?.description}</p>
        <div className="text-center mt-5">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="mt-3 btn btn-dark"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
