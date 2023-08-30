import {
  INVENTORY_ERROR,
  INVENTORY_LOADING,
  GET_INVENTORY,
  GET_MY_INVENTORY,
} from "./inventory.action-type";

const initialState = {
  loading: false,
  error: false,
  inventory: [],
  myInventory: [],
};

const inventoryReducer = (state = initialState, { type, payload }) => {
  console.log({ type, payload });
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

    default: {
      return {
        ...state,
      };
    }
  }
};

export default inventoryReducer;
