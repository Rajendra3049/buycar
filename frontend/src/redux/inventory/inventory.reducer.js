import {
  INVENTORY_ERROR,
  INVENTORY_LOADING,
  GET_INVENTORY,
  GET_MY_INVENTORY,
  DELETE_MY_INVENTORY,
} from "./inventory.action-type";

const initialState = {
  loading: false,
  error: false,
  inventory: [],
  myInventory: [],
  msg: null,
};

const inventoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INVENTORY_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case INVENTORY_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case GET_INVENTORY: {
      return {
        ...state,
        loading: false,
        error: true,
        inventory: payload,
      };
    }
    case GET_MY_INVENTORY: {
      return {
        ...state,
        loading: false,
        error: true,
        myInventory: payload,
      };
    }
    case DELETE_MY_INVENTORY: {
      return {
        ...state,
        loading: false,
        error: true,
        myInventory: payload.myInventory,
        inventory: payload.inventory,
        msg: payload.msg,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default inventoryReducer;
