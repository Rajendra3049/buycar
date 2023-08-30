import {
  INVENTORY_ERROR,
  INVENTORY_LOADING,
  GET_INVENTORY,
  GET_MY_INVENTORY,
} from "./inventory.action-type";
import { baseUrl } from "../api";

export const getInventory = () => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY_LOADING });

    const res = await fetch(`${baseUrl}/inventory`);
    const data = await res.json();

    dispatch({ type: GET_INVENTORY, payload: data });
  } catch (error) {
    dispatch({ type: INVENTORY_ERROR });
  }
};

export const getMyInventory = () => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY_LOADING });

    const res = await fetch(`${baseUrl}/my-inventory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    const data = await res.json();
    localStorage.setItem("dealerId", JSON.stringify(data.dealerId));

    let newData = data.cars.filter((item) => item.dealer_Id === data.dealerId);

    dispatch({ type: GET_MY_INVENTORY, payload: newData });
  } catch (error) {
    dispatch({ type: INVENTORY_ERROR });
  }
};
