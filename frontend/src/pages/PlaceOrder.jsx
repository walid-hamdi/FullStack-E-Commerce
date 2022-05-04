import React, { useEffect } from "react";
import { Button, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { placeOrder } from "../actions/orderActions";
import Meta from "../components/Meta";

const PlaceOrder = () => {
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );
  const { orderInfo, success, error } = useSelector(
    (state) => state.createOrder
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  cartItems.itemPrice = Number(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  cartItems.shippingPrice = cartItems.itemPrice > 100 ? 0 : 100;
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cartItems.taxPrice = addDecimals(
    Number((0.15 * cartItems.itemPrice).toFixed(2))
  );

  cartItems.totalPrice = (
    cartItems.itemPrice +
    Number(cartItems.shippingPrice) +
    Number(cartItems.taxPrice)
  ).toFixed(2);

  const placeOrderHandler = () => {
    dispatch(
      placeOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: cartItems.itemPrice,
        shippingPrice: cartItems.shippingPrice,
        taxPrice: cartItems.taxPrice,
        totalPrice: cartItems.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      return navigate(`/order/${orderInfo._id}`, { replace: true });
    }
  }, [navigate, success, orderInfo]);

  return (
    <Container>
      <Meta
        title="Placing the order"
        description="Placing the order of products"
      />
      <Row className="justify-content-md-center align-items-center mt-5">
        <CheckoutSteps step1 step2 step3 step4 />

        <Col md={8} className="mt-5">
          <ListGroup variant="flush">
            <h2 className="text-uppercase">Shipping</h2>
            <ListGroup.Item>
              <strong>Address:</strong> {shippingAddress.address},
              {shippingAddress.city}, {shippingAddress.postalCode},
              {shippingAddress.country}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <h2 className="mt-2 text-uppercase">Payment Method</h2>

            <ListGroup.Item>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup>
            <h2 className="mt-2 text-uppercase">Order Items</h2>
            {cartItems.length === 0 && <Message>Your cart is empty!</Message>}
            {cartItems &&
              cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link
                        className="text-decoration-none"
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </Col>

                    <Col md={4}>
                      {item.quantity} X ${item.price} = $
                      {(item.quantity * item.price).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>

        <Col md={4} className="mt-5">
          <ListGroup variant="flush">
            <h2 className="text-uppercase">Order Summary</h2>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${cartItems.itemPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${cartItems.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax Price</Col>
                <Col>${cartItems.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${cartItems.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrder;
