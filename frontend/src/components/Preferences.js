import React, { useState, useEffect } from "react";
import { getUserPreferences, updateUserPreferences } from "../services/authService";
import { fetchArticleAttributes } from "../services/articleService";
import { Form, Button, Card, Container, Row, Col, Spinner } from "react-bootstrap";

function Preferences() {
  const [sources, setSources] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [preferences, setPreferences] = useState({
    preferredSources: [],
    preferredAuthors: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch available article attributes and user preferences simultaneously
    Promise.all([fetchArticleAttributes(), getUserPreferences()])
      .then(([attributesData, preferencesData]) => {
        console.log("Fetched authors and sources:", attributesData); // Debug log for attributes
        console.log("Fetched user preferences:", preferencesData.data); // Debug log for preferences

        setAuthors(attributesData.authors);
        setSources(attributesData.sources);

        setPreferences({
          preferredSources: preferencesData.data.preferred_sources || [],
          preferredAuthors: preferencesData.data.preferred_authors || [],
        });
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleUpdatePreferences = () => {
    updateUserPreferences(preferences).then(() => {
      alert("Preferences updated successfully");
    });
  };

  if (loading) {
    // Display loading spinner while data is being fetched
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Card className="shadow-lg">
        <Card.Body>
          <Card.Title className="text-center mb-4">User Preferences</Card.Title>

          <Form>
            <h5 className="text-primary">Preferred Sources</h5>
            <Row className="mb-3">
              {sources.map((source) => (
                <Col md={6} key={source}>
                  <Form.Check
                    type="checkbox"
                    label={source}
                    checked={preferences.preferredSources.includes(source)}
                    onChange={(e) => {
                      const updatedSources = e.target.checked ? [...preferences.preferredSources, source] : preferences.preferredSources.filter((s) => s !== source);
                      setPreferences({ ...preferences, preferredSources: updatedSources });
                    }}
                  />
                </Col>
              ))}
            </Row>

            <h5 className="text-primary">Preferred Authors</h5>
            <Row className="mb-3">
              {authors.map((author) => (
                <Col md={6} key={author}>
                  <Form.Check
                    type="checkbox"
                    label={author}
                    checked={preferences.preferredAuthors.includes(author)}
                    onChange={(e) => {
                      const updatedAuthors = e.target.checked ? [...preferences.preferredAuthors, author] : preferences.preferredAuthors.filter((a) => a !== author);
                      setPreferences({ ...preferences, preferredAuthors: updatedAuthors });
                    }}
                  />
                </Col>
              ))}
            </Row>

            <div className="text-center mt-4">
              <Button variant="primary" onClick={handleUpdatePreferences}>
                Save Preferences
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Preferences;
