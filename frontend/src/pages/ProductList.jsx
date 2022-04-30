import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import {
  createProduct,
  listProducts,
  removeProduct,
} from "../actions/productActions";

import { useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const { success: successRemoved } = useSelector(
    (state) => state.productRemoved
  );
  const {
    success: successCreated,
    loading: loadingCreated,
    products: productCreated,
  } = useSelector((state) => state.productCreated);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      return navigate("/login");
    } else {
      if (successCreated) {
        return navigate(`/admin/product/${productCreated._id}/edit`);
      } else {
        dispatch(listProducts());
      }
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreated,
    productCreated,
    successRemoved,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(removeProduct(id));
    }
  };

  const addProduct = () => {
    dispatch(createProduct());
  };

  return (
    <Container>
      <Row className="align-items-center  mt-5">
        <h2>Products</h2>
        <Col>
          <Button className="btn btn-primary mt-2" onClick={addProduct}>
            <i className="fas fa-plus"></i> Add Product
          </Button>
        </Col>
        {loadingCreated && <Loading />}
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col>
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>

                      <td>
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit`}
                        >
                          <Button className="btn-sm" variant="light">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
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

export default ProductList;
