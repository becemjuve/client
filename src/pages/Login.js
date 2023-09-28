import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const loginHandler = (e) => {
    e.preventDefault();
    const user = { email, password };

    dispatch(login(user))
      .unwrap()
      .then((response) => {
        // Handle successful login here,
        console.log("Login successful", response);
      })
      .catch((error) => {
        toast(error.message, { type: "error" });
      });
  };
  const {isLoggedIn} = useSelector(state => state.auth)
  const navigate = useNavigate()
  useEffect(()=>{
    if (isLoggedIn) navigate('/')
  },)
  return (
    <form className="container mt-5">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary" onClick={loginHandler}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      <Link to="/register" className="ms-3">
        Register
      </Link>
    </form>
    
  );
}

export default Login;
