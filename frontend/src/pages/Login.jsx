import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Image,
  Heading,
  VStack,
  Flex,
} from "@chakra-ui/react";
import yara from "../img/yara_login.png";

export default function Login() {
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
              focusBorderColor="blue.500"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              focusBorderColor="blue.500"
            />
          </FormControl>
          <Button
            w="full"
            colorScheme="blue"
            size="lg"
            borderRadius="md"
            type="submit"
          >
            Log In
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
