import { Flex, Text, Heading, Spacer, HStack, Image, Button, Avatar, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import yara from "../img/logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Flex as="nav" p="10px" alignItems="center" justifyContent="space-between">
      {/* Logo on the left */}
      <Image src={yara} height="6
      0px" width="auto" objectFit="contain" />
      <Spacer />

      {/* Avatar and Logout button on the right */}
      <HStack spacing="15px">
        <Flex alignItems="center">
          <Avatar src="https://bit.ly/sage-adebayo" />
          <Box ml="3">
            <Text fontWeight="bold">Hi, Mrs Adebayo</Text>
            <Text fontSize="sm" color="gray.500">
              Owner
            </Text>
          </Box>
        </Flex>
        <Button
          colorScheme="blue"
          onClick={() => {
            navigate("/");
          }}
          variant="ghost"
        >
          Logout
        </Button>
      </HStack>
    </Flex>
  );
}
