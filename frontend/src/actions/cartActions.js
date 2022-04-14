import axios from "axios";
import { ADD_CART_ITEM, REMOVE_CART_ITEM } from "../constants/productConstants";

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
