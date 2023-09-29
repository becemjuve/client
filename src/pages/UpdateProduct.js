import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneProduct, updateProduct } from "../redux/slice/productSlice";
import Spinner from "../components/Spinner";

function UpdateProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getOneProduct(id));
    window.scrollTo(0, 0);

  }, [id]);

  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
    setStock(product.stock);
  }, [product]);

  // updateProductHandler
  const updateProductHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        id,
        name,
        description,
        price,
        category,
        stock,
      })
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="user-profile-page mb-4">Update Product</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label ">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="productDescription"
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="productPrice"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="productCategory" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="productCategory"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="productStock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="productStock"
            onChange={(e) => setStock(e.target.value)}
            value={stock}
          />
        </div>
        <button className="btn btn-primary" onClick={updateProductHandler}>
          {isLoading ? <Spinner /> : "Update"}
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
