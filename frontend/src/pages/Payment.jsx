import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { addPaymentMethod } from "../actions/cartActions";

const Payment = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    //   DISPATCH
    dispatch(addPaymentMethod(paymentMethod));

    navigate("/placeorder");
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6} xs={12}>
          <CheckoutSteps step1 step2 step3 />

          <h2 className="text-uppercase py-2">Payment</h2>
          <Form onSubmit={handleFormSubmit} className="mt-5">
            <Form.Group className="mb-3">
              <Form.Label as="legend">Select Method</Form.Label>

              <Col>
                <Form.Check
                  type="radio"
                  checked
                  label="PayPal or Credit Card"
                  id="paypal"
                  name="paymentMethod"
                  value="PayPal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
                {/* <Form.Check
                  type="radio"
                  label="Strip or Credit Card"
                  id="stripe"
                  name="paymentMethod"
                  value="Stripe"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check> */}
              </Col>
            </Form.Group>
            <Button variant="primary mb-3" type="submit">
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
