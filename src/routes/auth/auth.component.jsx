import { Route, Routes } from "react-router-dom";
import Authentication from "../../components/authentication/auth/auth.component";
import RegisterComplete from "../../components/authentication/register-complete-form/register-complete-form.component";
import ForgotPassword from "../../components/authentication/forgot-password/forgot-password.component";

const Auth = () => {
  return (
    <Routes>
      <Route path="" element={<Authentication />} />
      <Route path="register/complete" element={<RegisterComplete />} />
      <Route path="forgot/password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default Auth;
