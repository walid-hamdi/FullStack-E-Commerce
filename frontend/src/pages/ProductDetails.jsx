import axios from "axios";
import React, { useEffect } from "react";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const {
    loading,
    products: product,
    error,
  } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  return (
    <div>
      <Link to="/" className="py-2 m-3 btn btn-outline-secondary">
        Go Back
      </Link>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
                  <Col>
                    {product.countInStock ? "In Stock" : "Out of Stock"}
                  </Col>
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
      )}
    </div>
  );
};

export default ProductDetails;
