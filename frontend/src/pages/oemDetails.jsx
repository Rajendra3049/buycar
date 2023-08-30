import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Center,
  Badge,
  Input,
  Button,
} from "@chakra-ui/react";

import { baseUrl } from "../redux/api";

const OEM_Details = () => {
  const [oemData, setOEMData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/oem/all`)
      .then((response) => response.json())
      .then((data) => {
        setOEMData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = async () => {
    try {
      const response = await fetch(`${baseUrl}/oem?search=${searchQuery}`);
      const searchData = await response.json();
      setOEMData(searchData);
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      p={4}>
      <Flex>
        <Input
          placeholder="Search OEM data"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mr={2}
        />
        <Button colorScheme="blue" onClick={handleSearch}>
          Search
        </Button>
      </Flex>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minHeight="100vh"
        p={4}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          All OEM Data
        </Text>
        <VStack align="center" spacing={4}>
          {loading ? (
            <Text>Loading...</Text>
          ) : oemData.length > 0 ? (
            oemData.map((oem) => (
              <Box
                key={oem._id}
                borderWidth="1px"
                p={4}
                rounded="md"
                boxShadow="md"
                width="100%"
                maxWidth="400px">
                <Text fontSize="lg" fontWeight="bold">
                  {oem.model} - {oem.year}
                </Text>
                <Text>Price: {oem.price}</Text>
                <Text>Mileage: {oem.mileage} km/l</Text>
                <Text>Max Speed: {oem.max_speed} km/h</Text>
                <Text>Power: {oem.power} hp</Text>
                <Text>Colors:</Text>
                <VStack align="start" pl={4} spacing={0}>
                  {oem.colors.map((color, index) => (
                    <Badge key={index} colorScheme="blue">
                      {color}
                    </Badge>
                  ))}
                </VStack>
              </Box>
            ))
          ) : (
            <Text>No OEM data available.</Text>
          )}
        </VStack>
      </Flex>
    </Flex>
  );
};

export default OEM_Details;
