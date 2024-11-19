import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../services/articleService";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { format } from "date-fns";
import { PaginationComponent } from "./PaginationComponent";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const NewsFeed = ({ filters }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true); // New state to handle login verification loading
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);

  useEffect(() => {
    // Check login status
    // const token = localStorage.getItem("token");
    setIsCheckingLogin(false); // Set login check to false after verifying token
  }, []);

  const loadArticles = useCallback(
    async (filters, page) => {
      setIsLoading(true);
      try {
        if (isLoggedIn) {
          const response = await fetchArticles({ ...filters, page });
          setArticles(response.data.data);
          setTotalPages(response.data.last_page);
        }
      } catch (error) {
        console.log("error", error);
        toast("Failed to load articles");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoggedIn]
  );

  useEffect(() => {
    if (isLoggedIn) {
      loadArticles(filters, currentPage);
    }
  }, [filters, currentPage, isLoggedIn, loadArticles]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isCheckingLogin) {
    return (
      <Container className="d-flex justify-content-center align-items-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Checking login status...</span>
        </Spinner>
      </Container>
    );
  }

  if (!isLoggedIn) {
    return (
      <Container className="text-center mt-4">
        <Alert variant="warning">
          Please <Link to="/login">Login</Link> to view articles.
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center my-4" style={{ minHeight: "60vh" }}>
          <Spinner animation="grow" role="status" style={{ color: "#0d6efd" }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Row className="justify-content-center my-4">
            <PaginationComponent totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          </Row>
          <Row>
            {articles.length > 0 ? (
              articles.map((article) => (
                <Col md={6} lg={4} className="mb-4" key={article.id}>
                  <Card className="h-100 shadow border-0 rounded-3" style={{ backgroundColor: "#f8f9fa" }}>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-dark fw-bold">{article.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        <small>Source: {article.source}</small>
                      </Card.Subtitle>
                      <Card.Text
                        dangerouslySetInnerHTML={{ __html: article.content }}
                        className="flex-grow-1 text-secondary"
                        style={{ fontSize: "0.9rem", lineHeight: "1.5rem" }}
                      />
                    </Card.Body>
                    <Card.Footer className="text-muted" style={{ fontSize: "0.8rem" }}>
                      <small>
                        By {article.author} | Published on {article.published_at ? format(new Date(article.published_at), "MMMM dd, yyyy") : "Unknown Date"}
                      </small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <Alert variant="info" className="text-center">
                  No articles found. Try adjusting your search filters.
                </Alert>
              </Col>
            )}
          </Row>
        </>
      )}
    </Container>
  );
};

export default NewsFeed;
