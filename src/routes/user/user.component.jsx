import { Route, Routes } from "react-router-dom";

import UserProtectedRoute from "../../routes/protected/user/user-protected-route.component";
import Dashboard from "../../components/user/dashboard/dashboard.component";
import Password from "../../components/user/password/password.component";

const User = () => {
  return (
    <Routes>
      <Route path="" element={<UserProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="password" element={<Password />} />
      </Route>
    </Routes>
  );
};

export default User;
