import { Route, Routes } from "react-router-dom";

import AdminProtectedRoute from "../protected/admin/admin-protected-route.component";
import Dashboard from "../../components/admin/dashboard/dashboard.component";
import Password from "../../components/user/password/password.component";

const Admin = () => {
  return (
    <Routes>
      <Route path="" element={<AdminProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="password" element={<Password />} />
      </Route>
    </Routes>
  );
};

export default Admin;
