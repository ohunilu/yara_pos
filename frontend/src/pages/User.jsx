import {
  useState,
  useEffect
} from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  SkeletonText,
  Button
} from '@chakra-ui/react';


export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5002/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Received data:', data);
        setUsers(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const currentUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );
  const totalPages = Math.ceil(users.length / usersPerPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Box overflow="auto" maxWidth="100%" width="100%">
      <Table
        variant="simple"
        border="2px"
        borderColor="blue.700"
        borderCollapse="collapse"
      >
        <Thead bgColor="blue.700">
          <Tr>
            <Th color="white">Email</Th>
            <Th color="white">User Name</Th>
            <Th color="white">Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={3}>
                <SkeletonText />
              </Td>
            </Tr>
          ) : (
            currentUsers.map((user) => (
              <Tr key={user.email}>
                <Td>{user.email}</Td>
                <Td>{user.user_name}</Td>
                <Td>{user.role.role_name}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <div
        display="flex"
        justifyContent="center"
        marginTop={4}
      >
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            colorScheme={currentPage === page ? "blue" : "gray"}
            variant={currentPage === page ? "solid" : "outline"}
            marginX={1}
          >
            {page}
          </Button>
        ))}
      </div>
    </Box>
  );
}