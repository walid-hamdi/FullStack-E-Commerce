import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      return navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <Container>
      <Meta
        title="Login"
        description="Login to have access to other features"
      />

      <Row className="justify-content-md-center mt-5">
        <Col md={6} xs={12}>
          {loading && <Loading />}
          {error && <Message variant="danger">{error}</Message>}
          <Form onSubmit={handleFormSubmit}>
            <h2 className="text-uppercase py-2">Sign In</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="Password"
              />
            </Form.Group>

            <Button variant="primary mb-3" type="submit">
              Login
            </Button>
          </Form>
          New Customer?{" "}
          <Link to="/register" className="text-decoration-none">
            Create Account
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
