import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={`${product.image}`} variant="top" />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          className="text-decoration-none text-white"
        >
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Title as="div">
          <div className="my-3">
            <Rating
              text={`${product.numReviews} reviews`}
              value={product.rating}
            />
          </div>
        </Card.Title>
        <Card.Title as="h3">${product.price}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Product;
