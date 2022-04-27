import axios from "axios";
import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/productConstants";

export const addToCart = (id, quantity) => async (dispatch, getStates) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: ADD_CART_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getStates().cart.cartItems));
};
export const removeFromCart = (id) => (dispatch, getStates) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.removeItem(
    "cartItems",
    JSON.stringify(getStates().cart.cartItems)
  );
};
export const addAddressCart = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("cartAddress", JSON.stringify(data));
};
export const addPaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
