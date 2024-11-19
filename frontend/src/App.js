import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NewsFeed from "./components/NewsFeed";
import SearchFilter from "./components/SearchFilter";
import Preferences from "./components/Preferences";
import ProtectedRoute from "./components/ProtectedRoute";
import { Container, Navbar, Nav } from "react-bootstrap";
import { logout } from "./services/authService";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedIn } from "./redux/store/isLoggedIn/isLoggedInSlice";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
  const [filters, setFilters] = useState({}); // Add state for filters
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoggedIn(!!localStorage.getItem("token")));
  }, [isLoggedIn, dispatch]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); // Update filters when changed in SearchFilter
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            📰 News Feed
          </Navbar.Brand>
          <Nav className="ml-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/">
                  🏠 Home
                </Nav.Link>
                <Nav.Link as={Link} to="/preferences">
                  🛠 Preferences
                </Nav.Link>{" "}
                {/* Link to Preferences */}
                <LogoutButton />
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Container className="my-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <SearchFilter onFilterChange={handleFilterChange} />
                  <NewsFeed filters={filters} />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/preferences"
            element={
              <ProtectedRoute>
                <>
                  <Preferences />
                </>
              </ProtectedRoute>
            }
          />{" "}
          {/* Add Preferences route */}
        </Routes>
      </Container>
    </Router>
  );
}

function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      dispatch(setIsLoggedIn(false));
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
      🔐 Logout
    </Nav.Link>
  );
}

export default App;
