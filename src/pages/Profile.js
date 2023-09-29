import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile } from "../redux/slice/authSlice";
import Spinner from "../components/Spinner";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
    window.scrollTo(0, 0);

  }, [user]);

  const updateHandler = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, password };
    if ((password.trim() !== "" || confirm.trim() !== "") && password !== confirm) {
      return toast("Password does not match", { type: "error" });
    }
    if (password === confirm) dispatch(updateProfile(user));
  };

  return (
    <div>
      <div className="user-profile-page mt-2">
        <h1>My Profile</h1>
      </div>
      <form className="container mt-5 form-page-s">
        <div className="mb-3">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label-p">
                First Name
              </label>
              <input
                type="text"
                className="form-control profile-input"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label-p">
                Last Name
              </label>
              <input
                type="text"
                className="form-control profile-input"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label-p">
            Password
          </label>
          <input
            type="password"
            className="form-control profile-input"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label-p">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control profile-input"
            id="confirmPassword"
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary profile-button"
          onClick={updateHandler}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Update"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
