// import {
//     Box,
//     Button,
//     Container,
//     Flex,
//     Avatar,
//     HStack,
//     Link,
//     IconButton,
//     Menu,
//     useDisclosure,
//     useColorModeValue,
//     Stack,
//   } from '@chakra-ui/react';
//   import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
  
//   const Links = ['About', 'Portfolio', 'Resume', 'Contact'];
  
//   const NavLink = ({ children, src }) => (
//     <Link
//       px={2}
//       py={1}
//       rounded={'md'}
//       _hover={{
//         textDecoration: 'none',
//         bg: useColorModeValue('gray.200', 'gray.700'),
//       }}
//       href={src}>
//       {children}
//     </Link>
//   );
  
//   export default function Navigation() {
//     const { isOpen, onOpen, onClose } = useDisclosure();
  
//     return (
//       <>
//         <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
//           <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
//             <IconButton
//               size={'md'}
//               icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
//               aria-label={'Open Menu'}
//               display={{ md: 'none' }}
//               onClick={isOpen ? onClose : onOpen}
//             />
//             <HStack spacing={1} justify={{ base: 'center', md: 'space-between' }} alignItems={'center'}>
//               <Container>
//                 <Flex alignItems={'center'}>
//                   <Menu>
//                     <Button
//                       as={Link}
//                       href="/about"
//                       rounded={'full'}
//                       variant={'link'}
//                       cursor={'pointer'}
//                       minW={0}>
//                       <Avatar
//                         size={'sm'}
//                         // src={
//                         //   AshleyPic
//                         // }
//                       />
//                     </Button>
//                   </Menu>
//                 </Flex>
//               </Container>
  
//               <Container>
//                 <HStack
//                   as={'nav'}
//                   spacing={4}
//                   display={{ base: 'none', md: 'flex' }}>
//                   {Links.map((link) => (
//                     <NavLink key={link} src={`/${link.toLocaleLowerCase()}`}>{link}</NavLink>
//                   ))}
//                 </HStack>
//               </Container>
//             </HStack>
//           </Flex>
  
//           {isOpen ? (
//             <Box pb={4} display={{ md: 'none' }}>
//               <Stack as={'nav'} spacing={4}>
//                 {Links.map((link) => (
//                   <NavLink key={link}>{link}</NavLink>
//                 ))}
//               </Stack>
//             </Box>
//           ) : null}
//         </Box>
//       </>
//     );
//   }

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
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { BiCameraMovie } from 'react-icons/bi'

const Links = ['Profile', 'Reviews', 'Friends'];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
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
            size={'md'}
            icon={<BiCameraMovie />}
            text={"MovieChat"}
            // aria-label={'Open Menu'}
            // display={{ md: 'none' }}
            // onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
            <Avatar
                  size={'sm'}
                  src={
                    BiCameraMovie
                  }
                />
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}>
              Action
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                {/* <Avatar
                  size={'sm'}
                  src={
                    
                  }
                /> */}
              </MenuButton>
              <MenuList>
                <MenuItem>Log In</MenuItem>
                <MenuDivider />
                <MenuItem>Sign Up</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>Main Content Here</Box>
    </>
  );
}