import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchSources } from "../services/articleService";
import { getUserPreferences } from "../services/userService";
import { format } from "date-fns";

const SearchFilter = ({ onFilterChange }) => {
  const [keyword, setKeyword] = useState("");
  const [source, setSource] = useState("");
  const [sources, setSources] = useState([]);
  const [preferredSources, setPreferredSources] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSourcesAndPreferences = async () => {
      try {
        // Fetch available sources and user preferences concurrently
        const [sourcesResponse, preferencesResponse] = await Promise.all([fetchSources(), getUserPreferences()]);

        setSources(sourcesResponse.data || []); // Set all available sources
        setPreferredSources(preferencesResponse.data.preferred_sources || []); // Set preferred sources
        setLoading(false);
      } catch (error) {
        console.error("Failed to load sources or preferences", error);
        setLoading(false);
      }
    };

    loadSourcesAndPreferences();
  }, []);

  // Determine whether to display preferred sources or all sources
  const filteredSources = preferredSources.length > 0 ? preferredSources : sources;

  // Pre-select the first preferred source if available
  useEffect(() => {
    if (preferredSources.length > 0) {
      setSource(preferredSources[0]); // Set first preferred source as selected by default
    }
  }, [preferredSources]);

  const handleFilter = () => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    onFilterChange({ keyword, source, date: formattedDate });
  };

  if (loading) {
    return (
      <Card className="p-4 mb-4 rounded-3 border-1 bg-light text-center">
        <span>Loading filters...</span>
      </Card>
    );
  }

  return (
    <Card className="p-4 mb-4 rounded-3 border-1 bg-light">
      <h5 className="text-center mb-4 text-primary fw-bold">Filter Articles</h5>
      <Form>
        <Row className="gy-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="🔍 Search by keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="form-control-lg border-0 shadow-sm rounded-2"
              style={{ backgroundColor: "#f8f9fa" }}
            />
          </Col>
          <Col md={3}>
            <Form.Select value={source} onChange={(e) => setSource(e.target.value)} className="form-control-lg border-0 shadow-sm rounded-2" style={{ backgroundColor: "#f8f9fa" }}>
              <option value="">All Sources</option>
              {filteredSources.map((src) => (
                <option key={src} value={src}>
                  {src}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control form-control-lg border-0 shadow-sm rounded-2"
              calendarClassName="custom-calendar"
              placeholderText="Select a date"
              showPopperArrow={false}
              style={{ backgroundColor: "#f8f9fa" }}
            />
          </Col>
          <Col md={2}>
            <Button variant="primary" onClick={handleFilter} className="w-100 btn-lg fw-bold shadow-sm" style={{ backgroundColor: "#0d6efd", borderColor: "#0d6efd" }}>
              Apply Filters
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SearchFilter;
