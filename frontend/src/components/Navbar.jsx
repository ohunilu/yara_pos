import { Flex, Text, Heading, Spacer, HStack, Button } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    
    return (
        <Flex as="nav" p="10px" alignItems="Center">
            <Heading as="h3"> Demo </Heading>
            <Spacer />

            <HStack spacing="10px">
            <Text>Hello Admin</Text>
            <Button colorScheme="blue" onClick={() => {
            navigate('/');}}>Logout</Button>
            </HStack>
        </Flex>
    )
}