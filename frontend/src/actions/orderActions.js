import axios from "axios";
import {
  DELIVERED_ORDER_FAIL,
  DELIVERED_ORDER_REQUEST,
  DELIVERED_ORDER_SUCCESS,
  DETAILS_ORDER_FAIL,
  DETAILS_ORDER_REQUEST,
  DETAILS_ORDER_SUCCESS,
  LIST_MY_ORDER_FAIL,
  LIST_MY_ORDER_REQUEST,
  LIST_MY_ORDER_SUCCESS,
  LIST_ORDER_TO_ADMIN_FAIL,
  LIST_ORDER_TO_ADMIN_REQUEST,
  LIST_ORDER_TO_ADMIN_SUCCESS,
  PAY_ORDER_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
} from "../constants/orderConstants";

export const placeOrder = (order) => async (dispatch, getStates) => {
  try {
    dispatch({
      type: PLACE_ORDER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getStates();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/order`, order, config);

    dispatch({
      type: PLACE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAIL,
      payload: "Error",
    });
  }
};
export const detailsOrder = (id) => async (dispatch, getStates) => {
  try {
    dispatch({
      type: DETAILS_ORDER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getStates();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/order/${id}`, config);

    dispatch({
      type: DETAILS_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAILS_ORDER_FAIL,
      payload: "Error",
    });
  }
};
export const payOrder =
  (orderId, paymentResult) => async (dispatch, getStates) => {
    try {
      dispatch({
        type: PAY_ORDER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getStates();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/order/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: PAY_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PAY_ORDER_FAIL,
        payload: "Error",
      });
    }
  };

export const getMyOrdersList = () => async (dispatch, getStates) => {
  try {
    dispatch({
      type: LIST_MY_ORDER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getStates();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/order/myorders`, config);

    dispatch({
      type: LIST_MY_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_MY_ORDER_FAIL,
      payload: "Error",
    });
  }
};
export const getListOrder = () => async (dispatch, getStates) => {
  try {
    dispatch({
      type: LIST_ORDER_TO_ADMIN_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getStates();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/order`, config);

    dispatch({
      type: LIST_ORDER_TO_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_ORDER_TO_ADMIN_FAIL,
      payload: "Error",
    });
  }
};

export const deliveredOrder = (order) => async (dispatch, getStates) => {
  try {
    dispatch({
      type: DELIVERED_ORDER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getStates();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/order/${order._id}/delivered`,
      config
    );

    dispatch({
      type: DELIVERED_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELIVERED_ORDER_FAIL,
      payload: "Error",
    });
  }
};
