import {
  INVENTORY_ERROR,
  INVENTORY_LOADING,
  GET_INVENTORY,
} from "./inventory.action-type";
import { baseUrl } from "../api";

export const getInventory = () => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY_LOADING });

    const res = await fetch(`${baseUrl}/inventory`);
    const data = await res.json();
    console.log(data);
    dispatch({ type: GET_INVENTORY, payload: data });
  } catch (error) {
    dispatch({ type: INVENTORY_ERROR });
  }
};
