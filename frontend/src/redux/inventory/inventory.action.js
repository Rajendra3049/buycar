import {
  INVENTORY_ERROR,
  INVENTORY_LOADING,
  GET_INVENTORY,
  GET_MY_INVENTORY,
  DELETE_MY_INVENTORY,
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
export const deleteCar =
  ({ _id, inventory, myInventory }) =>
  async (dispatch) => {
    try {
      dispatch({ type: INVENTORY_LOADING });

      const res = await fetch(`${baseUrl}/inventory/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      const data = await res.json();

      if (data) {
        let updatedInventory = inventory.filter((car) => car._id !== _id);
        let updatedMyInventory = myInventory.filter((car) => car._id !== _id);
        dispatch({
          type: DELETE_MY_INVENTORY,
          payload: {
            inventory: updatedInventory,
            myInventory: updatedMyInventory,
            msg: data.msg,
          },
        });
      } else {
        dispatch({ type: INVENTORY_ERROR });
      }
    } catch (error) {
      dispatch({ type: INVENTORY_ERROR });
    }
  };
export const EditCar =
  ({ _id, inventory, myInventory, editedData }) =>
  async (dispatch) => {
    try {
      dispatch({ type: INVENTORY_LOADING });

      const res = await fetch(`${baseUrl}/inventory/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
        body: JSON.stringify(editedData),
      });
      const data = await res.json();

      if (data) {
        let updatedInventory = inventory.map((car) => {
          if (car._id === data.car._id) {
            return data.car;
          }
          return car;
        });
        let updatedMyInventory = myInventory.map((car) => {
          if (car._id === data.car._id) {
            return data.car;
          }
          return car;
        });
        dispatch({
          type: DELETE_MY_INVENTORY,
          payload: {
            inventory: updatedInventory,
            myInventory: updatedMyInventory,
            msg: data.msg,
          },
        });
      } else {
        dispatch({ type: INVENTORY_ERROR });
      }
    } catch (error) {
      dispatch({ type: INVENTORY_ERROR });
    }
  };

export const addNewCar =
  ({ newCarData, Inventory, myInventory }) =>
  async (dispatch) => {
    try {
      dispatch({ type: INVENTORY_LOADING });

      const res = await fetch(`${baseUrl}/inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
        body: JSON.stringify(newCarData),
      });
      const data = await res.json();
      if (data.data) {
        let updatedInventory = [...Inventory, data.data];
        let updatedMyInventory = [...myInventory, data.data];
        dispatch({ type: GET_INVENTORY, payload: updatedInventory });
        dispatch({ type: GET_MY_INVENTORY, payload: updatedMyInventory });
      }
    } catch (error) {
      dispatch({ type: INVENTORY_ERROR });
    }
  };
