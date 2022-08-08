import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../../store/auth/auth.selector";
import { forgotPasswordLinkInEmail } from "../../../utils/firebase/firebase.utils";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector(selectCurrentUser);

  useEffect(() => {
    if (user && user.token && user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user && user.token) {
      navigate("/user/dashboard");
    }
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGET_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await forgotPasswordLinkInEmail(email, config);
      setEmail("");
      setIsLoading(false);
      toast.success(`A link has been set to ${email} to reset password`);
    } catch (error) {
       toast.error(error.message);
       console.log("Error MSG IN FORGOT PASSWORD", error);
       setIsLoading(false);
    }
  };

  const forgotPasswordForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <h4>Forgot your password? </h4>

          <div className="mt-4 mb-3 col-xs-12 col-lg-6">
            <label htmlFor="password" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row mt-3">
            <div className="col d-grid gap-2 col-xs-12 col-lg-3">
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={!email}
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
      </>
    );
  };
  return (
    <>
      <div className="container mt-5">
        <div className="content">{forgotPasswordForm()}</div>{" "}
      </div>
    </>
  );
};

export default ForgotPassword;
