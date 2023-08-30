import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Badge,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const InventoryCard = ({ car }) => {
  const handleEditClick = () => {
    console.log(`Editing ${car.title}`);
  };

  const handleDeleteClick = () => {
    console.log(`Deleting ${car.title}`);
  };

  const { isAuth } = useSelector((store) => store.dealerManager);

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
            <Button colorScheme="teal" onClick={handleEditClick}>
              Edit
            </Button>
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
