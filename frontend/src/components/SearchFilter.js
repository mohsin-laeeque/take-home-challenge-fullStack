import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const SearchFilter = ({ onFilterChange }) => {
    const [keyword, setKeyword] = useState("");
    const [source, setSource] = useState("");
    const [date, setDate] = useState("");

    const handleFilter = () => {
        onFilterChange({ keyword, source, date });
    };

    return (
        <Form className="mb-4">
            <Row>
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Search by keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <Form.Control
                        type="text"
                        placeholder="Source"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Col>
                <Col md={2}>
                    <Button
                        variant="primary"
                        onClick={handleFilter}
                        className="w-100"
                    >
                        Apply Filters
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchFilter;
