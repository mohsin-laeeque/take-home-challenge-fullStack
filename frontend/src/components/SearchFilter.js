import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchSources } from "../services/articleService";
import { format } from "date-fns"; 

const SearchFilter = ({ onFilterChange }) => {
  const [keyword, setKeyword] = useState("");
  const [source, setSource] = useState("");
  const [sources, setSources] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    // Fetch unique sources when component loads
    const loadSources = async () => {
      try {
        const response = await fetchSources();
        setSources(response.data);
      } catch (error) {
        console.error("Failed to load sources");
      }
    };

    loadSources();
  }, []);

  const handleFilter = () => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    onFilterChange({ keyword, source, date: formattedDate });
  };

  return (
    <Card className="p-4 mb-4 shadow-sm">
      <h5 className="text-center mb-3">Filter Articles</h5>
      <Form>
        <Row className="gy-3">
          <Col md={4}>
            <Form.Control type="text" placeholder="🔍 Search by keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="form-control-lg" />
          </Col>
          <Col md={3}>
            <Form.Select value={source} onChange={(e) => setSource(e.target.value)} className="form-control-lg">
              <option value="">All Sources</option>
              {sources.map((src) => (
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
              className="form-control form-control-lg"
              calendarClassName="custom-calendar"
              placeholderText="Select a date"
              showPopperArrow={false}
            />
          </Col>
          <Col md={2}>
            <Button variant="primary" onClick={handleFilter} className="w-100 btn-lg">
              Apply Filters
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SearchFilter;
