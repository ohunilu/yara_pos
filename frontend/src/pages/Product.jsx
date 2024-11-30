import {useState,useEffect} from 'react';
import { NumericFormat } from 'react-number-format';
import { Table, Thead, Tbody, Tr, Th, Td, Box, SkeletonText, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, useDisclosure, } from '@chakra-ui/react';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newProduct, setNewProduct] = useState({
    product_decrip: '',
    category: '',
    cost_price: '',
    sales_price: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]);
        onClose();
        alert('Product added successfully!');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Box overflow="auto" maxWidth="100%" width="100%">
      <Button colorScheme="blue" onClick={onOpen} mb={4}>
        Add Product
      </Button>

      {/* Add Product Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Product Name"
              name="product_decrip"
              value={newProduct.product_decrip}
              onChange={handleInputChange}
              mb={2}
            />
            <Input
              placeholder="Category"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              mb={2}
            />
            <Input
              placeholder="Cost Price"
              name="cost_price"
              value={newProduct.cost_price}
              onChange={handleInputChange}
              mb={2}
            />
            <Input
              placeholder="Sales Price"
              name="sales_price"
              value={newProduct.sales_price}
              onChange={handleInputChange}
              mb={2}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddProduct}>
              Submit
            </Button>
            <Button ml={2} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Table
        variant="simple"
        border="2px"
        borderColor="blue.700"
        borderCollapse="collapse"
      >
        <Thead bgColor="blue.700">
          <Tr>
            <Th color="white">Product ID</Th>
            <Th color="white">Product Name</Th>
            <Th color="white">Cost Price</Th>
            <Th color="white">Sales Price</Th>
            <Th color="white">Category</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={8}>
                <SkeletonText />
              </Td>
            </Tr>
          ) : (
            currentProducts.map((product) => (
              <Tr key={product.product_id}>
                <Td>{product.product_id}</Td>
                <Td>{product.product_decrip}</Td>
                <Td>{product.cost_price}</Td>
                <Td>{product.sales_price}</Td>
                <Td>{product.category}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <div display="flex" justifyContent="center" marginTop={4}>
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            colorScheme={currentPage === page ? 'blue' : 'gray'}
            variant={currentPage === page ? 'solid' : 'outline'}
            marginX={1}
          >
            {page}
          </Button>
        ))}
      </div>
    </Box>
  );
}