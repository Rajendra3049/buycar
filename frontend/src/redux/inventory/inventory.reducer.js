import {
  INVENTORY_ERROR,
  INVENTORY_LOADING,
  GET_INVENTORY,
} from "./inventory.action-type";

const initialState = {
  loading: false,
  error: false,
  inventory: [],
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

    default: {
      return {
        ...state,
      };
    }
  }
};

export default inventoryReducer;
