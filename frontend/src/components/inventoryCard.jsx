import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Badge,
  Button,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCar } from "../redux/inventory/inventory.action";
import EditFormModal from "./editForm";

const InventoryCard = ({ car }) => {
  const { _id } = car;
  const dispatch = useDispatch();
  const toast = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditClick = () => {
    console.log(`Editing ${car.title}`);
  };

  const { isAuth } = useSelector((store) => store.dealerManager);
  const { myInventory, inventory, loading, msg } = useSelector(
    (store) => store.inventoryManager
  );
  function handleDeleteClick() {
    dispatch(deleteCar({ _id, inventory, myInventory }));
  }

  useEffect(() => {
    if (msg === "cars deleted successfully") {
      toast({
        title: "Success",
        description: msg ? msg : "An error occurred",
        status: "success",
        duration: 2000,
        position: "top-right",
        isClosable: true,
      });
    }
  }, [msg]);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.02)" }}
      height="100%"
      display="flex"
      flexDirection="column"
      width="700px">
      <Image src={car.image} alt={car.title} />
      <VStack align="start" spacing={2} mt={4} flex="1">
        <Text fontSize="lg" fontWeight="semibold">
          {car.title}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {car.description}
        </Text>
        <HStack justifyContent="space-between" w="100%">
          <Badge colorScheme="green">Mileage: {car.odometer}</Badge>
          <Badge colorScheme="blue">
            Registered in {car.registration_place}
          </Badge>
        </HStack>
        <HStack justifyContent="space-between" w="100%">
          <Badge colorScheme={car.major_scratch ? "red" : "green"}>
            Major Scratch: {car.major_scratch ? "Yes" : "No"}
          </Badge>
          <Badge colorScheme={car.original_paint ? "green" : "red"}>
            Original Paint: {car.original_paint ? "Yes" : "No"}
          </Badge>
        </HStack>
        <Text>Accidents: {car.accidents}</Text>
        {isAuth && (
          <HStack justifyContent="space-between" w="100%">
            <Button onClick={openEditModal}>Edit Car</Button>
            <EditFormModal
              isOpen={isEditModalOpen}
              onClose={closeEditModal}
              carData={car}
            />
            <Button colorScheme="red" onClick={handleDeleteClick}>
              Delete
            </Button>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default InventoryCard;
