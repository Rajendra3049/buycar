import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventory } from "../redux/inventory/inventory.action";
import { VStack } from "@chakra-ui/react";
import CarCard from "../components/carCard";

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
      <VStack spacing={4} p={4}>
        {inventory.length &&
          inventory.map((car) => <CarCard key={car._id} car={car} />)}
      </VStack>
    </div>
  );
};

export default Home;
