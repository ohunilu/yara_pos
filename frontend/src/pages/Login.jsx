import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, FormControl, FormLabel, Input, Image, Heading, VStack, Flex,
} from "@chakra-ui/react";
import yara from "../img/yara_login.png";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5002/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        // Redirect to the dashboard or POS page
        navigate(data.redirect);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, blue.800, blue.700)"
    >
      <Box
        w={{ base: "90%", sm: "400px" }}
        bg="white"
        p={8}
        boxShadow="lg"
        borderRadius="lg"
      >
        <Center mb={6}>
          <Image src={yara} alt="Yàrá logo" boxSize="250px" />
        </Center>
        <Heading as="h3" size="lg" textAlign="center" mb={6}>
          Welcome to Yàrá POS
        </Heading>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="username">Email</FormLabel>
            <Input
              id="username"
              type="text"
              placeholder="Enter your email address"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              focusBorderColor="blue.500"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              focusBorderColor="blue.500"
            />
          </FormControl>
          <Button
            w="full"
            colorScheme="blue"
            size="lg"
            borderRadius="md"
            type="submit"
            onClick={(event) => handleSubmit(event)}
          >
            Log In
          </Button>
          {error && (
            <Box color="red.500" mt={4}>
              {error}
            </Box>
          )}
        </VStack>
      </Box>
    </Flex>
  );
}
