import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrorMessage("Password not match");
    }

    dispatch(register(name, email, password));
  };

  useEffect(() => {
    if (userInfo) {
      return navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6} xs={12}>
          {errorMessage && <Message variant="danger">{errorMessage}</Message>}
          {loading && <Loading />}
          {error && <Message variant="danger">{error}</Message>}
          <Form onSubmit={handleFormSubmit}>
            <h2 className="text-uppercase py-2">Sign Up</h2>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
                placeholder="Enter Name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                required
                placeholder="Confirm Password"
              />
            </Form.Group>

            <Button variant="primary mb-3" type="submit">
              Login
            </Button>
          </Form>
          Have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
