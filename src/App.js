import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "./redux/slice/authSlice";
import Profile from "./pages/Profile";
import AdminProducts from "./pages/AdminProducts";
import UpdateProduct from "./pages/UpdateProduct";
import { getAllProducts } from "./redux/slice/productSlice";
import Cart from "./pages/Cart";
import AdminUsers from "./pages/AdminUsers";
import ProductDetails from "./pages/ProductDetails";
import AdminOrders from "./pages/AdminOrders";
import UserOrders from "./pages/UserOrders";
import AdminOneOrder from "./pages/AdminOneOrder";
import About from "./pages/About";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getProfile())
    dispatch(getAllProducts())
    
  },[])
  return (
    <div className="App">
      <ToastContainer position="bottom-center" autoClose={2500} />
      <Navbar />
      <div style={{minHeight:'95vh',marginTop:"70px"}}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin"  >
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="prod/:id" element={<UpdateProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<AdminOneOrder />} />
        </Route>
        <Route path="/cart" element={<  Cart />} />
        <Route path="/store/:id" element={<  ProductDetails />} />
        <Route path="/user/orders" element={<  UserOrders />} />
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
      </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
