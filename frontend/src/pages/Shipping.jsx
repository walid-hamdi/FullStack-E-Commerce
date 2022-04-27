import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAddressCart } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const Shipping = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postCode, setPostCode] = useState(shippingAddress.postCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) return navigate("/login");
  }, [navigate, userInfo]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    //   DISPATCH
    dispatch(addAddressCart({ address, city, postCode, country }));

    navigate("/payment");
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6} xs={12}>
          <CheckoutSteps step1 step2 />

          <Form onSubmit={handleFormSubmit} className="mt-5">
            <h2 className="text-uppercase py-2">Shipping</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                required
                placeholder="Enter address"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>City</Form.Label>
              <Form.Control
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                required
                placeholder="Enter city"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Code Postal</Form.Label>
              <Form.Control
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
                type="text"
                required
                placeholder="Enter code postal"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Country</Form.Label>
              <Form.Control
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                required
                placeholder="Enter country"
              />
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

export default Shipping;
