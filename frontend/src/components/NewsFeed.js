import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../services/articleService";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";

const NewsFeed = ({ filters }) => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State to track loading status
    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        if (isLoggedIn) {
            loadArticles(filters);
        }
    }, [filters]);

    const loadArticles = async (filters) => {
        setIsLoading(true); // Show loader at the start of the API call
        try {
            const response = await fetchArticles(filters);
            setArticles(response.data.data);
        } catch (error) {
            alert("Failed to load articles");
        } finally {
            setIsLoading(false); // Hide loader after API call finishes
        }
    };

    // If the user is not logged in, prompt them to log in
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
            {isLoading ? ( // Show the loader while fetching articles
                <div className="d-flex justify-content-center my-4">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Row>
                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <Col md={4} className="mb-4" key={article.id}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{article.title}</Card.Title>
                                        <Card.Text>{article.content}</Card.Text>
                                        <Card.Footer>
                                            <small className="text-muted">
                                                By {article.author}
                                            </small>
                                        </Card.Footer>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <Alert variant="info" className="text-center">
                                No articles found. Try adjusting your search
                                filters.
                            </Alert>
                        </Col>
                    )}
                </Row>
            )}
        </Container>
    );
};

export default NewsFeed;
