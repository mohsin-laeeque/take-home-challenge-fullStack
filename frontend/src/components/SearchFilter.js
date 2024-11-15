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
  const [date, setDate] = useState(null); // Changed to `null` for better date handling
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSourcesAndPreferences = async () => {
      try {
        const [sourcesResponse, preferencesResponse] = await Promise.all([fetchSources(), getUserPreferences()]);
        setSources(sourcesResponse.data || []);
        setPreferredSources(preferencesResponse.data.preferred_sources || []);
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

  const handleFilter = () => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    onFilterChange({ keyword, source, date: formattedDate });
  };

  const handleClearFilters = () => {
    setKeyword("");
    setSource("");
    setDate(null);
    onFilterChange({ keyword: "", source: "", date: null });
  };

  if (loading) {
    return (
      <Card className="p-4 mb-4 rounded-3 border-1 bg-light text-center shadow">
        <span>Loading filters...</span>
      </Card>
    );
  }

  return (
    <Card className="p-4 mb-4 rounded-3 border-1 bg-light shadow">
      <h5 className="text-center mb-4 text-primary fw-bold">Filter Articles</h5>
      <Form>
        <Row className="gy-3 align-items-center">
          <Col xs={12} sm={6} md={4} lg={4}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="🔍 Search by keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="form-control-lg border-0 shadow-sm rounded-2"
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={4} lg={3}>
            <Form.Group>
              <Form.Select value={source} onChange={(e) => setSource(e.target.value)} className="form-control-lg border-0 shadow-sm rounded-2">
                <option value="">All Sources</option>
                {filteredSources.map((src) => (
                  <option key={src} value={src}>
                    {src}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={4} lg={3}>
            <Form.Group>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control form-control-lg border-0 shadow-sm rounded-2"
                calendarClassName="custom-calendar"
                placeholderText="Select a date"
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={6} lg={2} className="d-flex gap-2 justify-content-end">
            <Button variant="primary" onClick={handleFilter} className="btn-lg fw-bold shadow-sm w-100">
              Apply
            </Button>
            <Button variant="outline-secondary" onClick={handleClearFilters} className="btn-lg fw-bold shadow-sm w-100">
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SearchFilter;
