import { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listTopProducts } from "../actions/productActions";
import Loading from "./Loading";
import Message from "./Message";

const TopProducts = () => {
  const dispatch = useDispatch();

  const { products, error, loading } = useSelector(
    (state) => state.topProducts
  );

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark my-3">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              className="mt-5 "
              src={product.image}
              alt={product.name}
              fluid
            />
            <Carousel.Caption className="carousel-caption">
              <h2 className="mb-3 pb-4">
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TopProducts;
