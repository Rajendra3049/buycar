import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Badge,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import BuyCarModal from "./buyCarModal";

const CarCard = ({ car }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      width="700px">
      <Image src={car.image} alt={car.title} />
      <Text fontSize="lg" fontWeight="semibold" mt={2}>
        {car.title}
      </Text>
      <Text fontSize="sm" color="gray.500" mt={1}>
        {car.description}
      </Text>
      <Flex alignItems="center" justifyContent="space-between" mt={2}>
        <Badge colorScheme="green">Mileage: {car.odometer}</Badge>
        <Badge colorScheme="blue">Registered in {car.registration_place}</Badge>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mt={2}>
        <Badge colorScheme={car.major_scratch ? "red" : "green"}>
          Major Scratch: {car.major_scratch ? "Yes" : "No"}
        </Badge>
        <Badge colorScheme={car.original_paint ? "green" : "red"}>
          Original Paint: {car.original_paint ? "Yes" : "No"}
        </Badge>
      </Flex>
      <Text mt={2}>Accidents: {car.accidents}</Text>
      <BuyCarModal />
    </Box>
  );
};

export default CarCard;
