import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Spacer, Link, useColorModeValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { dealerLogout } from "../redux/dealer/dealer.action";

const Navbar = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const linkColor = useColorModeValue("gray.600", "gray.300");
  const linkHoverColor = useColorModeValue("teal.600", "teal.300");
  const { isAuth } = useSelector((store) => store.dealerManager);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(dealerLogout());
  };

  return (
    <Box
      bg={bgColor}
      p={4}
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="md">
      <Flex align="center">
        <Link
          as={RouterLink}
          to="/"
          fontSize="xl"
          fontWeight="bold"
          _hover={{ color: linkHoverColor }}>
          Buy Cars
        </Link>
        <Spacer />
        <Box>
          <Link
            as={RouterLink}
            to="/"
            mr={4}
            fontWeight="medium"
            color={linkColor}
            _hover={{ color: linkHoverColor }}>
            Home
          </Link>
          {isAuth ? (
            <Link
              as={RouterLink}
              to="/my-inventory"
              mr={4}
              fontWeight="medium"
              color={linkColor}
              _hover={{ color: linkHoverColor }}>
              My Inventory
            </Link>
          ) : null}
          {isAuth ? (
            <Link
              as={RouterLink}
              to="/oem-details"
              mr={4}
              fontWeight="medium"
              _hover={{ color: linkHoverColor }}>
              OEM Details
            </Link>
          ) : null}

          {/* {isAuth ? (
            <Link
              as={RouterLink}
              to="/my-buyer"
              mr={4}
              fontWeight="medium"
              color={linkColor}
              _hover={{ color: linkHoverColor }}>
              My Buyers
            </Link>
          ) : null} */}
          <Link
            as={RouterLink}
            to="/login"
            fontWeight="medium"
            color={linkColor}
            _hover={{ color: linkHoverColor }}
            onClick={isAuth ? handleLogout : null}>
            {isAuth ? "Logout" : "Dealer-Login"}
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
