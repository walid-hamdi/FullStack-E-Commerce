import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, createReview } from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const dispatch = useDispatch();

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    success: successReviewed,
    error: errorReviewed,
    loading: loadingReview,
  } = useSelector((state) => state.productCreatedReview);

  const addToCart = () => {
    navigate(`/cart/${id}/${quantity}`);
  };

  const submitReviewsHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(id, { rating, comment }));
  };

  useEffect(() => {
    if (successReviewed) {
      setRating(0);
      setComment("");
      alert("Product review submitted");
    }

    dispatch(listProductDetails(id));
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
  }, [dispatch, id, successReviewed]);

  return (
    <div>
      <Meta title={product.name} description={product.description} />
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

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating
                        text={`${product.numReviews} reviews`}
                        value={review.rating || 0}
                      />
                      {/* <p>{review.createdAt.substring(0, 10)}</p> */}
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successReviewed && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingReview && <Loading />}
                  {errorReviewed && (
                    <Message variant="danger">{errorReviewed}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitReviewsHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingReview}
                        type="submit"
                        variant="primary mt-3"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </ListGroup>
      )}
    </div>
  );
};

export default ProductDetails;
