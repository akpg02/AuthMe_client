import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";

import { signOutUser } from "../../../utils/firebase/firebase.utils";
import { selectCurrentUser } from "../../../store/auth/auth.selector";
import { logoutUser } from "../../../store/auth/auth.action";

const PrimaryNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(selectCurrentUser);

  const handleLogout = async () => {
    await signOutUser();
    dispatch(logoutUser());
    navigate("/auth");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">AuthMe</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {!user && (
                <Nav.Link eventKey={2} href="/auth">
                  Login
                </Nav.Link>
              )}
              {user && (
                <>
                  <NavDropdown
                    title={`Hello, ${user.name}`}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="/user/dashboard">
                      My Dashboard
                    </NavDropdown.Item>
                    {user.role === "admin" && (
                      <NavDropdown.Item href="/admin/dashboard">
                        Admin Dashboard
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Divider />
                    <Nav.Link eventKey={2} href="/auth" onClick={handleLogout}>
                      Logout
                    </Nav.Link>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default PrimaryNavbar;
