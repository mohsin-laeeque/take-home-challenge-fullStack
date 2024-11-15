import React from "react";
import { Pagination } from "react-bootstrap";

export const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => (
  <Pagination size="lg" className="custom-pagination">
    {[...Array(totalPages)].map((_, index) => (
      <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => onPageChange(index + 1)}>
        {index + 1}
      </Pagination.Item>
    ))}
  </Pagination>
);
