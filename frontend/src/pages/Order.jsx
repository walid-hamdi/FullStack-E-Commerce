import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailsOrder, payOrder } from "../actions/orderActions";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { PAY_ORDER_RESET } from "../constants/orderConstants";

const Order = () => {
  const { loading, error, orderDetails } = useSelector(
    (state) => state.detailsOrder
  );
  if (orderDetails) {
    orderDetails.itemPrice = Number(
      orderDetails.orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    );
  }

  const amount = orderDetails.totalPrice;
  const currency = "USD";
  const style = { layout: "vertical" };

  const [sdkReady, setSdkReady] = useState(false);

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const addPaypal = async () => {
      const { data: clientId } = await axios.get("api/config/paypal");
      console.log(clientId);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onLoad = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (successPay || !orderDetails || orderDetails._id !== id) {
      dispatch({ type: PAY_ORDER_RESET });
      dispatch(detailsOrder(id));
    } else if (!orderDetails.isPaid) {
      if (!window.paypal) {
        addPaypal();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderDetails, id, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      {orderDetails && (
        <Row className="justify-content-md-center align-items-center mt-5">
          <Col md={8} className="mt-5">
            <ListGroup>
              <h2 className="text-uppercase">Shipping Order</h2>
              <ListGroup.Item>
                <p>
                  User ID: <strong> {orderDetails.user._id}</strong>
                </p>
                <p>
                  User Name: <strong> {orderDetails.user.name}</strong>
                </p>
                <p>
                  User Email: <strong> {orderDetails.user.email}</strong>
                </p>
                <p>
                  User Address:
                  <strong> {orderDetails.shippingAddress.address}</strong>
                </p>
              </ListGroup.Item>
              <h2 className="text-uppercase">Order Items</h2>
              {orderDetails.length === 0 && (
                <Message>Your cart is empty!</Message>
              )}
              {orderDetails.orderItems.map((item, index) => (
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
              <ListGroup>
                <h2 className="mt-2 text-uppercase">Payment Method</h2>

                <ListGroup.Item>
                  <strong>Method: </strong>
                  {orderDetails.paymentMethod}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup.Item>
                <p>
                  <strong>
                    {!orderDetails.isPaid && (
                      <Message variant="danger">Not Paid</Message>
                    )}
                  </strong>
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4} className="mt-5">
            <ListGroup variant="flush">
              <h2 className="text-uppercase">Order Summary</h2>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${orderDetails.itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${orderDetails.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax Price</Col>
                  <Col>${orderDetails.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${orderDetails.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <p>
                  <strong>
                    {!orderDetails.isDelivered && (
                      <Message variant="danger">Not Delivered</Message>
                    )}
                  </strong>
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              {!orderDetails.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loading />}
                  {!sdkReady ? (
                    <Loading />
                  ) : (
                    <PayPalButtons
                      style={style}
                      disabled={false}
                      forceReRender={[amount, currency, style]}
                      createOrder={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Order;
