import AdminNavbar from "../../../routes/navigation/secondary-navbar/admin-navbar/admin-navbar.component";

import "./dashboard.component.css";
const Dashboard = () => {
  return (
    <>
      <div className="container mt-5">
        <AdminNavbar page={"dashboard"} />
        <div className="content pt-2">
          <p>This is the admin dashboard.</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
