import {
  DEALER_ERROR,
  DEALER_LOADING,
  DEALER_LOGIN,
  DEALER_LOGIN_ERROR,
  DEALER_LOGOUT,
  DEALER_SIGNUP,
} from "./dealer.action-type";

const initialState = {
  loading: false,
  error: false,
  isAuth: false,
  name: null,
  msg: null,
};

const dealerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DEALER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case DEALER_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        msg: payload.msg,
      };
    }
    case DEALER_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        name: payload.name,
        msg: payload.msg,
      };
    }
    case DEALER_SIGNUP: {
      return {
        ...state,
        loading: false,
        msg: payload.msg,
      };
    }
    case DEALER_LOGIN: {
      return {
        ...state,
        loading: false,
        isAuth: true,
        token: payload.token,
        msg: payload.msg,
      };
    }

    case DEALER_LOGOUT: {
      return {
        ...state,
        loading: false,
        isAuth: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default dealerReducer;
