import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  signInWithLinkInEmail,
  updateUserPassword,
  getCurrentUser,
} from "../../../utils/firebase/firebase.utils";

import { registerUser } from "../../../store/auth/auth.action";

const RegisterCompleteForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const { name, email } = JSON.parse(
      window.localStorage.getItem("emailForRegistration")
    );
    setEmail(email);
    setName(name);
  }, []);

  const handleRegisterUser = async (token) => {
    try {
      const userObj = { name, email };
      await dispatch(registerUser(token, userObj));
      toast.success("Registration successful");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistration = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords must match");
      return;
    }
    try {
      const response = await signInWithLinkInEmail(email, window.location.href);
      if (response.user.emailVerified) {
        // remove user name and email from local storage
        window.localStorage.removeItem("emailForRegistration");

        // update current user's password
        const user = await getCurrentUser();

        await updateUserPassword(user, password);

        // get user token
        let { token } = await user.getIdTokenResult();

        // added new user to database
        handleRegisterUser(token);

        // redirect
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="container col-xs-6 col-lg-4">
        <form className="me-3 ms-2 mt-5" onSubmit={completeRegistration}>
          <h4>Don't have an account?</h4>
          <p className="mb-5">Let's begin with your name and email.</p>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              className="form-control"
              placeholder="Enter name"
              value={name}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="register-password"
              id="register-password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Confirm password
            </label>
            <input
              type="password"
              name="confirm-password"
              id="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="row mt-4">
            <div className="col d-grid gap-2 col-xs-12 col-lg-6">
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={
                  !password ||
                  password.length < 6 ||
                  !confirmPassword ||
                  confirmPassword.length < 6
                }
              >
                REGISTER
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterCompleteForm;
