import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../../store/auth/auth.action";
import { selectCurrentUser } from "../../../store/auth/auth.selector";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../../utils/firebase/firebase.utils";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector(selectCurrentUser);

  useEffect(() => {
    const roleBasedRedirect = () => {
      if (user && user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user) {
        navigate("/user/history");
      }
    };
    roleBasedRedirect();
  }, [navigate, user]);

  const handleLoginUser = async (token) => {
    try {
      await dispatch(loginUser(token, { email }));
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithEmail = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      const { token } = await user.getIdTokenResult();
      handleLoginUser(token);
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithGooglePopup();
      const { email } = response.user;
      const { token } = await response.user.getIdTokenResult();
      await dispatch(loginUser(token, { email }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="me-3 ms-2 mt-5" onSubmit={signInWithEmail}>
        <h4>I already have an account.</h4>
        <p className="mb-5">Sign in with your email and password.</p>
        <div className="mb-3">
          <label htmlFor="login-email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="login-email"
            id="login-email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            to="/auth/forgot/password"
            style={{
              color: "#990000",

              textDecoration: "none",
            }}
          >
            Forgot password?
          </Link>
        </div>
        <div className="row mt-3">
          <div className="col d-grid gap-2 col-xs-12 col-lg-6">
            <button
              type="submit"
              className="btn btn-secondary"
              disabled={!email || !password || password.length < 6}
            >
              SIGN IN
            </button>
          </div>
          <div className="col d-grid gap-2 col-xs-12 col-lg-6">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={signInWithGoogle}
            >
              SIGN IN WITH GOOGLE
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
