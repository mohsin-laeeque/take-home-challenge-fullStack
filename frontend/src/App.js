import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NewsFeed from "./components/NewsFeed";
import SearchFilter from "./components/SearchFilter";
import { Container, Navbar, Nav } from "react-bootstrap";
import { logout } from "./services/authService";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );
    const [filters, setFilters] = useState({}); // Add state for filters

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
    }, [isLoggedIn]);

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
                            <LogoutButton setIsLoggedIn={setIsLoggedIn} />
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
                    <Route
                        path="/login"
                        element={<Login setIsLoggedIn={setIsLoggedIn} />}
                    />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={
                            <>
                                <SearchFilter
                                    onFilterChange={handleFilterChange}
                                />
                                <NewsFeed filters={filters} />{" "}
                                {/* Pass filters to NewsFeed */}
                            </>
                        }
                    />
                </Routes>
            </Container>
        </Router>
    );
}

function LogoutButton({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
        </Nav.Link>
    );
}

export default App;
