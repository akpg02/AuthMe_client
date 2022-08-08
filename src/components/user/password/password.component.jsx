import { useState } from "react";
import { toast } from "react-toastify";

import {
  getCurrentUser,
  updateUserPassword,
} from "../../../utils/firebase/firebase.utils";

import UserNavbar from "../../../routes/navigation/secondary-navbar/user-navbar/user-navbar.component";
import "./password.component.css";

const Password = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
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
      setIsLoading(true);
      const currentUser = await getCurrentUser();
      await updateUserPassword(currentUser, password);
      toast.success("Password updated");
      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast(error.message);
      console.log(error.message);
    }
  };

  const passwordUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <h4>Update password</h4>

        <div className="mt-4 mb-3 col-xs-12 col-lg-6">
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
        <div className="mb-3 col-xs-12 col-lg-6">
          <label htmlFor="password" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="form-control"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="row mt-3">
          <div className="col d-grid gap-2 col-xs-12 col-lg-3">
            <button
              type="submit"
              className="btn btn-secondary"
              disabled={!password || password.length < 6 || !confirmPassword}
            >
              {isLoading ? (
                <>
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </>
              ) : (
                "UPDATE PASSWORD"
              )}
            </button>
          </div>
        </div>
      </form>
    );
  };
  return (
    <>
      <div className="container mt-5">
        <UserNavbar page={"password"} />
        <div className="content pt-2">{passwordUpdateForm()}</div>
      </div>
    </>
  );
};

export default Password;
