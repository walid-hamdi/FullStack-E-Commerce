import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import {
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Image,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";

const Cart = () => {
  const { id, quantity } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutProcess = () => {
    // if not login redirect to login
    if (!userInfo) return navigate("/login");

    navigate("/shipping");
  };

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, Number(quantity)));
    }
  }, [id, dispatch, quantity]);

  return (
    <Row className="mt-4">
      <Meta title="Product Cart List" description="Cart shopping" />

      <h1 className="text-uppercase pb-3">Shopping Cart</h1>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      className="text-decoration-none"
                      to={`/product/${item.product}`}
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>

                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((val) => (
                        <option key={val + 1} value={val + 1}>
                          {val + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="ligh"
                      onClick={() => removeItemFromCart(item.product)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </h3>
              <h4>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className="btn-block text-uppercase"
                onClick={checkoutProcess}
                disabled={cartItems.length === 0}
                type="button"
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
