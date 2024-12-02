import { AttachmentIcon, CalendarIcon, LockIcon, RepeatIcon, SettingsIcon, Divider } from '@chakra-ui/icons'
import { List, ListIcon, ListItem, Flex, Text, Button } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <List color="white" fontSize="1.3em" spacing={2}>
        <ListItem>
        <NavLink to="/Dashboard">
            <Flex alignItems="center">
            <Button colorScheme="white" size="lg" height="60px" width="120px" variant="link"
                _hover={{
                 bg: "blue.700",
                 color: "white",
                }}
                transition="all 0.2s ease-in-out"
                justifyContent="flex-start"
                p="8px"
                >
                <ListIcon as={CalendarIcon} color="white" fontSize="sm" />
                <Text fontSize="sm" fontWeight="semibold">Dashboard</Text>
            </Button>
            </Flex>
        </NavLink>
        </ListItem>
        <ListItem>
            <NavLink to="/Dashboard/order">
            <Flex alignItems="center">
            <Button colorScheme="white" size="lg" height="60px" width="120px" variant="link"
                _hover={{
                 bg: "blue.700",
                 color: "white",
                }}
                transition="all 0.2s ease-in-out"
                justifyContent="flex-start"
                p="8px"
                >
                <ListIcon as={AttachmentIcon} color="white" fontSize="sm"/>
                <Text fontSize="sm" fontWeight="semibold">Order</Text>
            </Button>
            </Flex>
            </NavLink>
        </ListItem>
        <ListItem>
            <NavLink to="/Dashboard/product">
            <Flex alignItems="center">
            <Button colorScheme="white" size="lg" height="60px" width="120px" variant="link"
                _hover={{
                 bg: "blue.700",
                 color: "white",
                }}
                transition="all 0.2s ease-in-out"
                justifyContent="flex-start"
                p="8px"
                >
                <ListIcon as={RepeatIcon} color="white" fontSize="sm"/>
                <Text fontSize="sm" fontWeight="semibold">Product</Text>
            </Button>
            </Flex>
            </NavLink>
        </ListItem>
        <ListItem>
            <NavLink to="/Dashboard/stock">
            <Flex alignItems="center">
            <Button colorScheme="white" size="lg" height="60px" width="120px" variant="link"
                _hover={{
                 bg: "blue.700",
                 color: "white",
                }}
                transition="all 0.2s ease-in-out"
                justifyContent="flex-start"
                p="8px"
                >
                <ListIcon as={LockIcon} color="white" fontSize="sm"/>
                <Text fontSize="sm" fontWeight="semibold">Categories</Text>
            </Button>
            </Flex>
            </NavLink>
        </ListItem>
        <ListItem>
            <NavLink to="/Dashboard/user">
            <Flex alignItems="center">
            <Button colorScheme="white" size="lg" height="60px" width="120px" variant="link"
                _hover={{
                 bg: "blue.700",
                 color: "white",
                }}
                transition="all 0.2s ease-in-out"
                justifyContent="flex-start"
                p="8px"
                >
                <ListIcon as={LockIcon} color="white" fontSize="sm"/>
                <Text fontSize="sm" fontWeight="semibold">Users</Text>
            </Button>
            </Flex>
            </NavLink>
        </ListItem>
        <ListItem>
            <NavLink to="/Dashboard/setting">
            <Flex alignItems="center">
            <Button colorScheme="white" size="lg" height="60px" width="120px" variant="link"
                _hover={{
                 bg: "blue.700",
                 color: "white",
                }}
                transition="all 0.2s ease-in-out"
                justifyContent="flex-start"
                p="8px"
                >
                <ListIcon as={SettingsIcon} color="white" fontSize="sm"/>
                <Text fontSize="sm" fontWeight="semibold" >Settings</Text>
            </Button>
            </Flex>           
            </NavLink>
        </ListItem>
    </List>
  )
}
