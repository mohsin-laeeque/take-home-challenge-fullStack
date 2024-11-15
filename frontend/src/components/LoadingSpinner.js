import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
    <Spinner animation="border" role="status" style={{ color: "#0d6efd" }}>
      <span className="visually-hidden">{message}</span>
    </Spinner>
  </div>
);

export default LoadingSpinner;
