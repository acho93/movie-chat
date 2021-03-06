import React from 'react';
import Auth from '../../utils/auth';

import {
    Box,
    Flex,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuDivider,
    MenuList,
    useDisclosure,
    useColorModeValue,
} from '@chakra-ui/react';
import { BiHomeAlt, BiCameraMovie } from 'react-icons/bi'

export default function Navigation() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <>
            <Box bg={useColorModeValue('#564d4d', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        as={Link}
                        href="/"
                        size={'lg'}
                        icon={<BiHomeAlt />}
                        onClick={isOpen ? onClose : onOpen}
                        colorScheme={'red'}
                    />
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                variant={'link', 'solid'}
                                colorScheme={'red'}
                                cursor={'pointer'}
                                size={'sm'}
                                mr={4}
                                leftIcon={<BiCameraMovie />}>
                                Movie Chat
                            </MenuButton>
                            <MenuList>
                                {Auth.loggedIn() ? (
                                <>
                                    <Link href="/profile">My Profile</Link>
                                    <MenuDivider></MenuDivider>
                                 <a href="/" onClick={logout}>Logout</a>
                                </>
                                ) : (
                                <>
                                    <Link href="/login">Login</Link>
                                    <MenuDivider></MenuDivider>
                                    <Link href="/signup">Signup</Link>
                                </>
                                )}
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}