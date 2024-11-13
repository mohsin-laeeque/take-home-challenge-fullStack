import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../services/articleService";
import { Card, Container, Row, Col, Spinner, Alert, Pagination } from "react-bootstrap";
import { format } from "date-fns"; // Install date-fns for formatting dates

const NewsFeed = ({ filters }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    if (isLoggedIn) {
      loadArticles(filters, currentPage);
    }
  }, [filters, currentPage]);

  const loadArticles = async (filters, page) => {
    setIsLoading(true);
    try {
      const response = await fetchArticles({ ...filters, page });
      setArticles(response.data.data);
      setTotalPages(response.data.last_page); // Set total pages based on API response
    } catch (error) {
      alert("Failed to load articles");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!isLoggedIn) {
    return (
      <Container className="text-center mt-4">
        <Alert variant="warning">
          Please{" "}
          <Link as={Link} to="/login">
            Login
          </Link>{" "}
          to view articles.
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      {isLoading ? (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Pagination className="justify-content-center my-4">
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
          <Row>
            {articles.length > 0 ? (
              articles.map((article) => (
                <Col md={12} className="mb-12 mt-2" key={article.id}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {article.title} <small className="text-muted"> - {article.source}</small>{" "}
                      </Card.Title>
                      <Card.Text dangerouslySetInnerHTML={{ __html: article.content }} />
                    </Card.Body>
                    <Card.Footer className="text-muted">
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
          <Pagination className="justify-content-center my-4">
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
    </Container>
  );
};

export default NewsFeed;
