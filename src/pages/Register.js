import React, { useState , useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";


function Register() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { isLoading , isLoggedIn } = useSelector((state) => state.auth);
  const registerHandler = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password, confirm, phoneNumber:phone };

    if (password !== confirm)
      return toast("password do not match", { type: "error" });
    dispatch(register(user))
   
    
  };
  useEffect(()=>{
    if (isLoggedIn) navigate('/')
    window.scrollTo(0, 0);

  },[isLoggedIn])
  return (
    <form className="container mt-5">
      <div class="mb-3">
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            first name
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            last name
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <label for="exampleInputEmail1" class="form-label">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          onChange={(e) => setEmail(e.target.value)}
        />
         <label for="exampleInputEmail1" class="form-label">
          Phone Number
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          onChange={(e) => setPhone(+e.target.value)}
        />

        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          confirm password
        </label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>

      <button type="submit" class="btn btn-primary" onClick={registerHandler}>
        {isLoading ? "pending" : "submit"}
      </button>
    </form>
  );
}

export default Register;
