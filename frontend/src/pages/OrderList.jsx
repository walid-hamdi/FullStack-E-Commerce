import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getListOrder } from "../actions/orderActions";
import Meta from "../components/Meta";

function OrderList() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { orders, loading, error } = useSelector((state) => state.orderList);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getListOrder());
    } else {
      return navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <Container>
      <Meta title="List of orders" description="The list of existing orders" />

      <Row className="justify-content-md-center mt-5">
        <Col>
          <h2 className="text-uppercase py-2">Order List</h2>

          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user && order.user.name}</td>
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
}

export default OrderList;
