import UserNavbar from "../../../routes/navigation/secondary-navbar/user-navbar/user-navbar.component";

import "./dashboard.component.css";

const Dashboard = () => {
  return (
    <>
      <div className="container mt-5">
        <UserNavbar page={"dashboard"} />
        <div className="content pt-2">
          <p>This is the user dashboard.</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
