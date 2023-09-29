import React, { useEffect, useState } from "react";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
} from "../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AdminProducts() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { isLoading, products } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProducts());
    window.scrollTo(0, 0);

  }, []);

  const dispatch = useDispatch();

  const addProductHandler = () => {
    const product = { name, description, price, category, stock, image };
    dispatch(addProduct(product))
      .then(() => setShow(false))
      .then(() => dispatch(getAllProducts()));
  };
  // uploadImageHandler
  const uploadImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };
  return (
    <div className="admin-products-container">
    <button className="add-product-btn" onClick={handleShow}>
      Add New Product
    </button>

    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Product Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div class="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Image
            </label>
            <input
              type="file"
              accept="image/"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={uploadImageHandler}
            />
            {image && (
              <img
                style={{ width: "70px", height: "70px" }}
                src={image}
                alt="mypic"
              />
            )}
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Stock
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={addProductHandler}>
          {isLoading ? <Spinner /> : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>

    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
          
            <td className="text-center">
              <img
                src={product.image.secure_url}
                alt={product.name}
                className="product-image"
              />
            </td>
            <td>${parseFloat(product.price).toFixed(2)}</td>
            <td>{product.category}</td>
            <td>{product.stock}</td>
            <td>
              <Link
                to={`/admin/prod/${product._id}`}
                className="btn btn-info"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
              <button
                className="btn btn-danger "
                onClick={() =>
                  dispatch(deleteProduct(product._id)).then(() =>
                    dispatch(getAllProducts())
                  )
                }
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default AdminProducts;
