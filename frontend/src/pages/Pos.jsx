import {
    Button,
    Flex,
    Heading,
    Input,
    Image,
    Text,
    Icon,
    IconButton,
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
    Divider,
  } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';
  import { DeleteIcon, RepeatIcon, CloseIcon, BellIcon } from '@chakra-ui/icons';
  import { useState, useEffect } from 'react';
  import yara from "../img/logo.png";
  
  function Pos() {

    const navigate = useNavigate();
    const [items, setItems] = useState([
        { id: 10002, description: 'Slice Bread', quantity: 2, price: 1500, vat: 0, amount: 3000 },
        { id: 10005, description: 'Butter', quantity: 1, price: 2500, vat: 0, amount: 2500 },
        { id: 10009, description: 'Mayonnaise', quantity: 1, price: 1100, vat: 0, amount: 1100 },
        { id: 10020, description: 'Biscuits', quantity: 24, price: 100, vat: 0, amount: 2400 },
        { id: 10009, description: 'Fruit Juice', quantity: 12, price: 650, vat: 0, amount: 7800 },
        { id: 10009, description: 'Wine', quantity: 1, price: 5500, vat: 0, amount: 5500 },
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

      const handleQuantityChange = (e, itemId) => {
        const updatedItems = items.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: parseInt(e.target.value) };
          }
          return item;
        });
        setItems(updatedItems);
        calculateTotals();
      };

      const handleAddItem = async (e) => {
        if (e.key === 'Enter') {
          try {
            const response = await fetch(`http://localhost:5000/products?name=${searchQuery}`);
            const data = await response.json();
            if (data.length > 0) {
              const newItem = {
                id: data[0].id,
                description: data[0].name,
                quantity: 1,
                price: data[0].price,
                vat: data[0].vat,
                amount: data[0].price,
              };
              setItems((prevItems) => [...prevItems, newItem]);
              setSearchQuery('');
            } else {
              alert('Product not found');
            }
          } catch (error) {
            console.error(error);
          }
        }
      };
    
      const handleRemoveItem = (itemId) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      };
  
    return (

    <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(6, 1fr)" }} bg="blue.900">
    <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 4 }} bg="gray.50" minHeight={{ lg: '100vh' }} p={{ base: '10px', lg: '20px' }}>
  <Flex flexDirection="column" justifyContent="space-between" overflowY="auto">
    <Flex as="nav" p="10px" alignItems="center">
      <Flex mb={3}>
        <Input
          placeholder="Search Products"
          width={{ base: '100%', lg: '500px' }}
          borderColor="blue.500"
          borderWidth="1px"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyPress={(e) => handleAddItem(e)}
        />
      </Flex>
      <Spacer />
      <Flex mb={4}>
        <HStack spacing="15px">
          <Text>Hello Cashier</Text>
          <Button colorScheme="blue" onClick={() => {
            navigate('/');}}>Logout</Button>
        </HStack>
      </Flex>
    </Flex>

    <Box height={{ base: '300px', lg: '600px' }} borderWidth='1px' borderRadius='lg' overflow='auto'>
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
              <Td>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(e, item.id)}
                />
              </Td>
              <Td>{item.price}</Td>
              <Td>{item.vat}</Td>
              <Td>{item.amount}</Td>
              <Td>
                <IconButton aria-label='Remove item' size="sm" icon={<DeleteIcon boxSize={8} />} onClick={() => handleRemoveItem(item.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  </Flex>
</GridItem>

    <GridItem as="aside" colSpan={{base: 6, lg: 2, xl: 2}} p="20px"> 
      <Flex justifyContent="flex-end" mt={0}>
      <Image src={yara} height="70px" width="70" objectFit="contain" />
      </Flex>
      <Divider />
        <Flex flexDirection="column" mt={2} mb={2}>
            <Flex justifyContent="space-between" height="100%" overflow="auto" p="5px">
                <Button colorScheme="blackAlpha" size="lg" height="50px" width="100px">
                    <Icon as={RepeatIcon} boxSize={6} />
                    <Text fontSize="sm">Quantity</Text>
                </Button>
                <Button colorScheme="blackAlpha" size="lg" height="50px" width="100px">
                    <Icon as={BellIcon} boxSize={6} p="2px" />
                    <Text fontSize="sm">Discount</Text>
                </Button>
                <Button colorScheme="blackAlpha" size="lg" height="50px" width="100px">
                    <Icon as={RepeatIcon} boxSize={6} p="2px"/>
                    <Text fontSize="sm">Reprint</Text>
                </Button>
            </Flex>
            <Flex justifyContent="space-between" height="100%" overflow="auto" p="5px">
                <Button colorScheme="blackAlpha" size="lg" height="50px" width="100px">
                    <Icon as={RepeatIcon} boxSize={6} p="2px"/>
                    <Text fontSize="sm">Hold</Text>
                </Button>
                <Button colorScheme="blackAlpha" size="lg" height="50px" width="100px">
                    <Icon as={BellIcon} boxSize={6} p="2px" />
                    <Text fontSize="sm">On-hold</Text>
                </Button>
                <Button colorScheme="blackAlpha" size="lg" height="50px" width="100px">
                    <Icon as={RepeatIcon} boxSize={6} p="2px"/>
                    <Text fontSize="xs">End of Day</Text>
                </Button>
            </Flex>
        </Flex>
        <Divider />
        <Flex justifyContent="space-between" mt={4}>
          <Flex flexDirection="column">
            <Text fontSize="lg" fontWeight="bold" color={'white'}>Subtotal:</Text>
            <Text fontSize="lg" fontWeight="bold" color={'white'}>Discount:</Text>
            <Text fontSize="lg" fontWeight="bold" color={'white'}>VAT:</Text>
            <Heading fontSize="xl" fontWeight="bold" mb={2} color={'white'}>Total Amount:</Heading>
          </Flex>
        <Flex flexDirection="column" alignItems="flex-end">
            <Text fontSize="lg" fontWeight="bold" color={'white'}>₦{totalSales}</Text>
            <Text fontSize="lg" fontWeight="bold" color={'white'}>₦{discount}</Text>
            <Text fontSize="lg" fontWeight="bold" color={'white'}>₦{vat}</Text>
            <Heading fontSize="xl" fontWeight="bold" mb={2} color={'white'}>₦{totalAmount}</Heading>
        </Flex>
      </Flex>
      <Divider />
        <Flex flexDirection="column" mt={4}>
            <Flex justifyContent="space-between">
            <Button colorScheme="red" size="lg" height="50px" width="1oopx">Cancel</Button>
              <Spacer />
                <Button colorScheme="green" size="lg" height="50px" width="1oopx">Payment</Button>
            </Flex>
        </Flex>
        

    </GridItem>
    </Grid>
    );
  }
  
  export default Pos;