import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const submitSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) navigate(`/search/${keyword}`);
    else navigate("/");
  };

  return (
    <Form className="mx-4 d-flex" onSubmit={submitSearch}>
      <Form.Group controlId="search">
        <Form.Control
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Product..."
        />
      </Form.Group>
      <Button className="bg-info" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
