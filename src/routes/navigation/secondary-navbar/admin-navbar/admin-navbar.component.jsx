import { Link } from "react-router-dom";

import "./admin-navbar.styles.css";

const AdminNavbar = ({ page }) => {
  return (
    <>
      <div className="sidebar">
        <Link
          className={page === "dashboard" ? "active" : ""}
          to="/admin/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className={page === "password" ? "active" : ""}
          to="/user/password"
        >
          Password
        </Link>
      </div>
    </>
  );
};

export default AdminNavbar;
