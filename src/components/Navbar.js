import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/authSlice";
import { getAllProducts, searchProduct } from "../redux/slice/productSlice";


// import { useEffect } from "react";

function Navbar() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { cartProducts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(
      getAllProducts()
    ).then(() => dispatch(searchProduct(e.target.value)));
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          Game-Shop
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>



      <form class="d-flex">
        <input className="search-form input button " onChange={searchHandler} class="form-control me-2" type="search" placeholder="Search Product " aria-label="Search"/>
      </form>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
              <i class="fa-solid fa-house"></i>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/cart">
              <i class="fa-solid fa-cart-shopping"></i>
                <span class="badge bg-danger rounded-pill">
                  {cartProducts.length}
                </span>
              </Link>
            </li>
            {isLoggedIn ? (
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.lastName}
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="/profile" class="dropdown-item" href="/#">
                    <i class="fa-solid fa-user me-2"></i>
                      Profile
                    </Link>
                  </li>
                  <li>
                  <Link to="/user/orders" class="dropdown-item">
                  <i class="fa-solid fa-pen me-2"></i>
                      Order
                    </Link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li
                    onClick={() => {
                      dispatch(logout());
                      navigate("/login");
                    }}
                  >
                    <Link class="dropdown-item">
                    <i class="fa-solid fa-right-from-bracket me-2"></i>
                      Logout</Link>
                  </li>
                </ul>
              </li>
            ) : (
              <li class="nav-item">
                <Link class="nav-link" to="/login">
                <i class="fa-solid fa-user"></i>
                </Link>
              </li>
            )}

            {user?.isAdmin ? (
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fa-solid fa-lock me-2"></i>
                  Admin
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="/admin/products" class="dropdown-item">
                      <i className='fa-solid fa-sitemap me-2'></i>
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/admin/users">
                    <i class="fa-solid fa-users me-2"></i>
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/orders" class="dropdown-item">
                    <i class="fa-solid fa-pen me-2"></i>
                      Orders
                    </Link>
                  </li>


                </ul>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
