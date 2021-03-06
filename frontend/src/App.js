import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import UserList from "./pages/UserList";
import UserEdit from "./pages/UserEdit";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import OrderList from "./pages/OrderList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/search/:keyword" element={<Home />}>
              <Route path="page/:pageNumber" element={<Home />} />
            </Route>
            <Route path="/page/:pageNumber" element={<Home />} />

            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart">
              <Route index element={<Cart />} />
              <Route path=":id" element={<Cart />}>
                <Route path=":quantity" element={<Cart />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="admin/userlist" element={<UserList />} />
            <Route path="admin/productlist" element={<ProductList />} />
            <Route
              path="admin/productlist/:pageNumber"
              element={<ProductList />}
            />
            <Route path="admin/orderlist" element={<OrderList />} />
            <Route path="admin/user/:id/edit" element={<UserEdit />} />
            <Route path="admin/product/:id/edit" element={<ProductEdit />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/order/:id" element={<Order />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
