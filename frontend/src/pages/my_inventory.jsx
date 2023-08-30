import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyInventory } from "../redux/inventory/inventory.action";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";

import InventoryCard from "../components/inventoryCard";

const MyInventory = () => {
  const dispatch = useDispatch();
  const { myInventory } = useSelector((store) => store.inventoryManager);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getMyInventory());
    };

    fetchData();
  }, [dispatch]);
  return (
    <Flex width="100%">
      <Box
        width="200px"
        position="sticky"
        top="20px"
        padding="4"
        textAlign="center"
        bg="white"
        boxShadow="md"
        zIndex="1">
        <VStack spacing={4} align="stretch">
          <Button
            colorScheme="blue"
            variant="outline"
            size="lg"
            width="100%"
            _hover={{ color: "white", background: "blue.500" }}>
            Add New Car
          </Button>
          <Button
            colorScheme="purple"
            variant="outline"
            size="lg"
            width="100%"
            _hover={{ color: "white", background: "purple.500" }}>
            My Buyers
          </Button>
        </VStack>
      </Box>
      <VStack spacing={4} p={4} width="100%">
        {myInventory.length > 0 ? (
          myInventory.map((car) => <InventoryCard key={car._id} car={car} />)
        ) : (
          <Text fontSize="lg" fontWeight="bold">
            No cars available in your inventory.
          </Text>
        )}
      </VStack>
    </Flex>
  );
};

export default MyInventory;
