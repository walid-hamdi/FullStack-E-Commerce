import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  createProductReducer,
  productDetailsReducer,
  productListReducer,
  removeProductReducer,
  updateProductReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  removeUserReducer,
  updateUserByAdminReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
  orderReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderMyListReducer,
  listOrderReducer,
  orderDeliveredReducer,
} from "./reducers/orderReducers";

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productRemoved: removeProductReducer,
  productCreated: createProductReducer,
  productUpdated: updateProductReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userRemoved: removeUserReducer,
  userUpdate: updateUserByAdminReducer,
  createOrder: orderReducer,
  detailsOrder: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer,
  orderList: listOrderReducer,
  orderDelivered: orderDeliveredReducer,
});

const localCartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const localCartAddress = localStorage.getItem("cartAddress")
  ? JSON.parse(localStorage.getItem("cartAddress"))
  : [];

const localUserInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialStates = {
  cart: { cartItems: localCartItems, shippingAddress: localCartAddress },
  userLogin: { userInfo: localUserInfo },
};

const middleWare = [thunk];

const store = createStore(
  reducers,
  initialStates,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
