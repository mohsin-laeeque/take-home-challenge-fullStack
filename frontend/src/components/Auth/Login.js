import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authService";
import { Form, Button, Card, Container } from "react-bootstrap";
import { handleApiError } from "../../utils/errorHandler";

const Login = ({ setIsLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Form>
          <div className="text-center">
            <span>Don't have an account? </span>
            <Link to="/register">Create an Account</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
