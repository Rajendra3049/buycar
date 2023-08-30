import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { dealerLogin, dealerSignup } from "../redux/dealer/dealer.action";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { isAuth, loading, error, msg } = useSelector(
    (store) => store.dealerManager
  );

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async () => {
    if (isLogin) {
      await dispatch(dealerLogin({ email, password }));
      if (isAuth) {
        navigate("/my-inventory");
      }
    } else {
      await dispatch(dealerSignup({ name, email, password }));
      toggleForm();
    }
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  useEffect(() => {
    if (error) {
      toast({
        title: "error",
        description: msg ? msg : "An error occurred",
        status: "error",
        duration: 2000,
        position: "top-right",
        isClosable: true,
      });
    }
  }, [error]);

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center">
      <Heading mb={4}>
        {isLogin ? "Login as Dealer" : "Sign Up as Dealer"}
      </Heading>
      <Box width="300px">
        <Stack spacing={3}>
          {!isLogin && (
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          )}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            size="lg"
            width="100%"
            onClick={handleLogin}
            isLoading={loading}
            isDisabled={
              isLogin
                ? email === "" || password === ""
                : email === "" || password === "" || name === ""
            }>
            {isLogin ? "Login" : "Sign Up"}
          </Button>
          <Text textAlign="center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Button
              variant="link"
              colorScheme="blue"
              onClick={toggleForm}
              isDisabled={isAuth}
              ml={1}>
              {isLogin ? "Sign up" : "Login"}
            </Button>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginPage;
