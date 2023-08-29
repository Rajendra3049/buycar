import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventory } from "../redux/inventory/inventory.action";

const Home = () => {
  const dispatch = useDispatch();
  const { inventory } = useSelector((store) => store.inventoryManager);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getInventory());
    };

    fetchData();
  }, [dispatch]);
  return (
    <div>
      {inventory.map((item) => (
        <p key={item._id}>{item.title}</p>
      ))}
    </div>
  );
};

export default Home;
