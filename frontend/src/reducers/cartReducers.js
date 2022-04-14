import { ADD_CART_ITEM, REMOVE_CART_ITEM } from "../constants/productConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find(
        (cart) => cart.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cart) =>
            cart.product === existItem.product ? item : cart
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    default:
      return { ...state };
  }
};
