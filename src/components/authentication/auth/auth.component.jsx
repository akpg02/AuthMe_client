import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../login-form/login-form.component";
import RegisterForm from "../register-form/register-form.component";

import { selectCurrentUser } from "../../../store/auth/auth.selector";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useSelector(selectCurrentUser);

  useEffect(() => {
    if (user && user.token && user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user && user.token) {
      navigate("/user/dashboard");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-xs-12 col-lg-6" xs={12} lg={6}>
            <LoginForm />
          </div>
          <div className="col-xs-12 col-lg-6">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
