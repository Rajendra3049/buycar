import {
  DEALER_ERROR,
  DEALER_LOADING,
  DEALER_LOGIN,
  DEALER_LOGIN_ERROR,
  DEALER_LOGOUT,
  DEALER_SIGNUP,
} from "./dealer.action-type";
import { baseUrl } from "../api";

export const dealerLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: DEALER_LOADING });

      const res = await fetch(`${baseUrl}/dealer/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.msg === "login successful") {
        localStorage.setItem("token", JSON.stringify(data.token));
        dispatch({ type: DEALER_LOGIN, payload: { msg: "wrong credentials" } });
      } else {
        dispatch({
          type: DEALER_LOGIN_ERROR,
          payload: { msg: "wrong credentials" },
        });
      }
    } catch (error) {
      dispatch({ type: DEALER_ERROR });
    }
  };

export const dealerSignup =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: DEALER_LOADING });

      const res = await fetch(`${baseUrl}/dealer/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.msg === "signup successful") {
        dispatch({
          type: DEALER_SIGNUP,
          payload: { msg: "wrong credentials" },
        });
      } else {
        dispatch({ type: DEALER_ERROR, payload: { msg: "wrong credentials" } });
      }
    } catch (error) {
      dispatch({ type: DEALER_ERROR });
    }
  };

export const dealerLogout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: DEALER_LOGOUT });
};
