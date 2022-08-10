import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth/auth.selector";

import "./home.css";

const Home = () => {
  const { user } = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token && user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user && user.token) {
      navigate("/user/dashboard");
    }
  }, [navigate, user]);

  const handleCallToAction = () => {
    navigate("/auth");
  };

  return (
    <>
      <div className="container">
        <div className="mt-5 ms-auto">
          <h1 className="mt-5 text-center">Welcome to AuthMe!</h1>
          <p className="lead text-center mt-5">
            Your authentication destination
          </p>
        </div>
      </div>
      <div className="container text-center mt-3 mb-4">
        <button className="btn btn-danger" onClick={handleCallToAction}>
          Get Started
        </button>
      </div>
      <div className="container">
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
          </div>
          <div className="carousel-inner" style={{ height: "650px" }}>
            <div className="carousel-item active" data-bs-interval="10000">
              <img
                src={require("../../assets/images/geometric.jpg")}
                className="w-100 img-fluid"
                alt="cyber security world"
              />
              <div className="carousel-caption d-none d-md-block center-text">
                <h2>Sign Into an Account</h2>
                <p>
                  Users can sign into their accounts using an email and password
                  combination or sign in with Google.
                </p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img
                src={require("../../assets/images/abstract.jpg")}
                className="img-fluid w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block center-text">
                <h2>Sign Up for an Account</h2>
                <p>
                  Users can register using an email and password combination.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={require("../../assets/images/security.jpg")}
                className="img-fluid w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block center-text">
                <h2>Password Reset</h2>
                <p>
                  Users who happen to forget their password have the opportunity
                  to reset their password.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={require("../../assets/images/binary.png")}
                className="img-fluid w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block center-text">
                <h2>Protected Routes</h2>
                <p>
                  Routes can be protected. A user who is an administrator has
                  access to the standard user routes as well as the admin
                  routes. Users who are not designated as an administrator can
                  only access the user routes.
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <p className="text-center mt-5">Copyright &copy; AuthMe Corporation </p>
      </div>
    </>
  );
};

export default Home;
