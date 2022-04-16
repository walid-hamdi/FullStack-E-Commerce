import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile, updateUserProfile } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";

const Profile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userUpdateProfile);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrorMessage("Password not match");
    }

    // setErrorMessage("");
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  useEffect(() => {
    if (!userInfo) {
      return navigate("/");
    }

    if (!user.name) {
      dispatch(profile("profile"));
    } else {
      setName(user.name);
      setEmail(user.email);
      // setPassword(user.password);
      // setConfirmPassword(user.password);
    }
  }, [dispatch, user, userInfo, navigate]);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={3} xs={12}>
          <Form onSubmit={handleFormSubmit}>
            <h2 className="text-uppercase py-2">Update Profile</h2>

            {errorMessage && <Message variant="danger">{errorMessage}</Message>}
            {loading && <Loading />}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}

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
              Update
            </Button>
          </Form>
        </Col>

        <Col md={9} xs={12}>
          <h3>Order List</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
