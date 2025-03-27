import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const Loading = () => {
  const { loading } = useSelector((state) => state.loadingAlert);

  return (
    loading && (
      <div className="d-flex justify-content-center my-3">
        <Spinner animation="border" variant="success" />
        <span className="ms-2">Loading products...</span>
      </div>
    )
  );
};

export default Loading;
