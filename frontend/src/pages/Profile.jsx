import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile, updateUserProfile } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { getMyOrdersList } from "../actions/orderActions";

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

  const {
    loading: loadingOrders,
    error: errorOrders,
    orders: myOrders,
  } = useSelector((state) => state.orderMyList);

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
      dispatch(getMyOrdersList());
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
          <h2 className="text-uppercase py-2">Order List</h2>

          {loadingOrders ? (
            <Loading />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
