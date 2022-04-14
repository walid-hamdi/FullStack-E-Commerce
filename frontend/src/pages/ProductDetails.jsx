import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  const addToCart = () => {
    navigate(`/cart/${id}/${quantity}`);
  };

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

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
                  value={product.rating || 0}
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

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((val) => (
                          <option key={val + 1} value={val + 1}>
                            {val + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Row>
                  <Button
                    onClick={addToCart}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add to cart
                  </Button>
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
