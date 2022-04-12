import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/product/" + productId);
      setProduct(data);
    };

    fetchData();
  }, [productId]);

  return (
    <>
      <Link to="/" className="py-2 m-3 btn btn-outline-secondary">
        Go Back
      </Link>

      <ListGroup variant="flush">
        <Row>
          <Col md={6}>
            <ListGroup.Item>
              <Image src={product.image} alt={product.name} fluid />
            </ListGroup.Item>
          </Col>
          <Col md={3}>
            <ListGroup.Item>
              <h4 className="text-uppercase">{product.name}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                text={`${product.numReviews} Reviews`}
                value={product.rating}
              />
            </ListGroup.Item>
            <ListGroup.Item>${product.price}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </Col>
          <Col md={3}>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>${product.price}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>{product.countInStock ? "In Stock" : "Out of Stock"}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Link to="#" className="btn btn-primary text-uppercase">
                  Add to cart
                </Link>
              </Row>
            </ListGroup.Item>
          </Col>
        </Row>
      </ListGroup>
    </>
  );
};

export default ProductDetails;
