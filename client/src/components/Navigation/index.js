import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { BiHomeAlt, BiCameraMovie } from 'react-icons/bi'

const Links = ['Profile', 'Reviews', 'Friends'];
const ActionLinks = ['Login', 'Signup'];

const NavLink = ({ children, src }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={src}>
        {children}
    </Link>
);

export default function Navigation() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        as={Link}
                        href="/Profile"
                        size={'lg'}
                        icon={<BiHomeAlt />}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link} src={`/${link.toLocaleLowerCase()}`}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                variant={'link', 'solid'}
                                colorScheme={'teal'}
                                cursor={'pointer'}
                                size={'sm'}
                                mr={4}
                                leftIcon={<BiCameraMovie />}>
                                Movie Chat
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Log In</MenuItem>
                                <MenuItem>Sign Up</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {ActionLinks.map((link) => (
                                <NavLink key={link} src={`/${link.toLocaleLowerCase()}`}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <Box p={4}>Main Content Here</Box>
        </>
    );
}