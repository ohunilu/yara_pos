import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  Grid,
  GridItem,
  Box,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function RootLayout() {
  const { isOpen, onToggle } = useDisclosure(); // For sidebar visibility

  return (
    <Grid
      templateColumns={{
        base: "1fr", // Full width on small screens
        lg: "auto 1fr", // Sidebar and main on larger screens
      }}
      bg="blue.700"
      minHeight="100vh"
    >
      {/* Navbar */}
      <GridItem
        as="nav"
        colSpan={6}
        bg="white"
        h="60px"
        px={{ base: "20px", lg: "30px" }}
        display="flex"
        alignItems="center"
        boxShadow="md"
      >

          {/* Sidebar Toggle Button */}
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            display={{ base: "flex", lg: "none" }}
            onClick={onToggle}
            aria-label="Toggle Sidebar"
            mr="20px" // Add margin to separate it from the Navbar
          />
      <Box flex="1"> {/* Ensure Navbar spans the remaining space */}
          <Navbar />
      </Box>
      </GridItem>

      {/* Sidebar */}
      <GridItem
        as="aside"
        bg="blue.900"
        display={{ base: isOpen ? "block" : "none", lg: "block" }}
        minHeight={{ base: "auto", lg: "100vh" }}
        w={{ base: "100%", lg: "120px" }} // Adjusted to fit text links
        p={{ base: "5px", lg: "5px" }}
        overflow="hidden"
        textAlign="center" // Center text links
        boxShadow={{ lg: "lg" }}
        zIndex={10}
        position={{ base: "absolute", lg: "static" }} // Sidebar as overlay for small screens
      >
        <Sidebar />
      </GridItem>

      {/* Main Content */}
      <GridItem
        as="main"
        p={{ base: "20px", lg: "40px" }}
        bg="gray.100"
        overflow="auto"
      >
        <Outlet />
      </GridItem>
    </Grid>
  );
}
