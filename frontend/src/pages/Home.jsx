import React from "react";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import TopProducts from "../components/TopProducts";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  );

  const { keyword, pageNumber } = useParams();

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber || 1));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta
        title="Welcome to our shop"
        description="home page display different products"
      />
      {!keyword ? (
        <TopProducts />
      ) : (
        <Link to="/" className="btn btn-secondary btn-block mt-5">
          Go Back
        </Link>
      )}
      <h1 className="pt-4">Latest Products</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products &&
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default Home;
