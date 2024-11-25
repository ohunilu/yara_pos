import {
    Button,
    Flex,
    Heading,
    Input,
    Image,
    Text,
    Icon,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Grid, 
    GridItem,
    Spacer, 
    HStack,
    Box,
  } from '@chakra-ui/react';
  import { DeleteIcon, RepeatIcon, CloseIcon } from '@chakra-ui/icons';
  import { useState, useEffect } from 'react';
  import yara from "../img/logo.png";
  
  function Pos() {

    const [items, setItems] = useState([
        { id: 10002, description: 'Veguit Bread', quantity: 2, price: 1500, vat: 0, amount: 1500 },
        // Add more items here...
      ]);
      const [searchQuery, setSearchQuery] = useState('');
      const [totalSales, setTotalSales] = useState(0);
      const [discount, setDiscount] = useState(0);
      const [vat, setVat] = useState(0);
      const [totalAmount, setTotalAmount] = useState(0);
    
      useEffect(() => {
        calculateTotals();
      }, [items, discount, vat]);
    
      const calculateTotals = () => {
        const totalSales = items.reduce((acc, item) => acc + item.amount, 0);
        const totalAmount = totalSales - discount - vat;
        setTotalSales(totalSales);
        setTotalAmount(totalAmount);
      };
    
      const handleSearch = (query) => {
        setSearchQuery(query);
        // Call API to search for items
      };
    
      const handleAddItem = (item) => {
        setItems((prevItems) => [...prevItems, item]);
      };
    
      const handleRemoveItem = (itemId) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      };
  
    return (

    <Grid templateColumns="repeat(6,1fr)" bg="blue.900">
    <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 4 }} bg="white" minHeight={{ lg: '100vh' }} p="20px">
      <Flex as="nav" p="10px" alignItems="center">
        <Flex mb={3}>
          <Input
            placeholder="Search Products"
            width="500px"
            borderColor="blue.500"
            borderWidth="1px"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Flex>
        <Spacer />
        <Flex mb={4}>
          <HStack spacing="15px">
            <Text>Hello Idris</Text>
            <Button colorScheme="blue">Logout</Button>
          </HStack>
        </Flex>
      </Flex>

    <Box height="400px" borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Product ID</Th>
            <Th>Description</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
            <Th>VAT</Th>
            <Th>Amount</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, index) => (
            <Tr key={index}>
              <Td>{item.id}</Td>
              <Td>{item.description}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.price}</Td>
              <Td>{item.vat}</Td>
              <Td>{item.amount}</Td>
              <Td>
                <Button size="sm" colorScheme="red" onClick={() => handleRemoveItem(item.id)}>Remove</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </Box>

      <Flex justifyContent="flex-end" mt={4}>
        <Flex flexDirection="column" alignItems="flex-end">
          <Text fontSize="lg" fontWeight="bold">Subtotal: ₦{totalSales}</Text>
          <Text fontSize="lg" fontWeight="bold">Discount: ₦{discount}</Text>
          <Text fontSize="lg" fontWeight="bold">VAT: ₦{vat}</Text>
          <Heading fontSize="xl" fontWeight="bold" mb={2}>Total Amount: ₦{totalAmount}</Heading>
        </Flex>
      </Flex>
    </GridItem>

        <GridItem as="aside" colSpan={{base: 6, lg: 2, xl: 2}} p="10px"> 
        <Flex flexDirection="column" mt={4}>
            <Flex justifyContent="space-between" height="100%" overflow="auto">
                <Button colorScheme="red" size="lg" height="100px" width="100px" border="1px solid white" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)" flexDirection="column">
                    <Icon as={DeleteIcon} boxSize={8} />
                    <Text fontSize="sm">Delete Item</Text>
                </Button>
                <Button colorScheme="blackAlpha" size="lg" height="100px" width="100px" border="1px solid white" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)" flexDirection="column">
                    <Icon as={RepeatIcon} boxSize={8} />
                    <Text fontSize="sm">Quantity</Text>
                </Button>
                <Button colorScheme="blackAlpha" size="lg" height="100px" width="100px" border="1px solid white" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)" flexDirection="column">
                    <Icon as={RepeatIcon} boxSize={8} />
                    <Text fontSize="sm">Discount</Text>
                </Button>
                <Button colorScheme="blackAlpha" size="lg" height="100px" width="100px" border="1px solid white" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)" flexDirection="column">
                    <Icon as={CloseIcon} boxSize={8} />
                    <Text fontSize="sm">History</Text>
                </Button>
            </Flex>
            <Flex justifyContent="space-between" mt={4}>
                <Button colorScheme="whiteAlpha" size="lg" height="50px" width="100px" border="1px solid white" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)" flex="1" mr={2}>Hold</Button>
                <Button colorScheme="cyan" size="lg" height="50px" width="100px" border="1px solid white" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)" flex="1" mr={2}>Start of Day</Button>
                <Button colorScheme="blue" size="lg" height="50px" width="100px" border="1px solid white" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)" flex="1">End of Day</Button>
            </Flex>
        </Flex>
        <Image src={yara} height="210px" width="100%" objectFit="contain" mt={2} p="20px" />

        <Flex flexDirection="column" mt={4}>
            <Flex justifyContent="space-between">
                <Button colorScheme="red" size="lg" height="195px" width="195px" border="1px solid white" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)">Cancel</Button>
                <Button colorScheme="green" size="lg" height="195px" width="195px" border="1px solid white" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)">Payment</Button>
            </Flex>
        </Flex>
        </GridItem>
      </Grid>
    );
  }
  
  export default Pos;