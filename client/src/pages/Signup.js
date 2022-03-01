import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import Layout from '../components/Layout';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form (notice the async!)
  const handleFormSubmit = async event => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      const { data } = await addUser({
        variables: { ...formState }
      });
    
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout>
      <main className='flex-row justify-center mb-4'>
        <div className='col-12 col-md-6'>
          <div className='card'>
            <h4 className='card-header'>Sign Up</h4>
            <div className='card-body'>
              <form onSubmit={handleFormSubmit}>
                <input
                  className='form-input'
                  placeholder='Your username'
                  name='username'
                  type='username'
                  id='username'
                  value={formState.username}
                  onChange={handleChange}
                />
                <input
                  className='form-input'
                  placeholder='Your email'
                  name='email'
                  type='email'
                  id='email'
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className='form-input'
                  placeholder='******'
                  name='password'
                  type='password'
                  id='password'
                  value={formState.password}
                  onChange={handleChange}
                />
                <button className='btn d-block w-100' type='submit'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Signup;

// import Layout from '../components/Layout';

// import {
//   Flex,
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   HStack,
//   InputRightElement,
//   Stack,
//   Button,
//   Heading,
//   Text,
//   useColorModeValue,
//   Link,
// } from '@chakra-ui/react';
// import { useState } from 'react';
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

// export default function Signup() {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <Layout>
//       <Flex
//         minH={'100vh'}
//         align={'center'}
//         justify={'center'}
//         bg={useColorModeValue('gray.50', 'gray.800')}>
//         <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
//           <Stack align={'center'}>
//             <Heading fontSize={'4xl'} textAlign={'center'}>
//               Sign up
//             </Heading>
//             <Text fontSize={'lg'} color={'gray.600'}>
//               to enjoy all of our cool features ✌️
//             </Text>
//           </Stack>
//           <Box
//             rounded={'lg'}
//             bg={useColorModeValue('white', 'gray.700')}
//             boxShadow={'lg'}
//             p={8}>
//             <Stack spacing={4}>
//               <HStack>
//                 <Box>
//                   <FormControl id="firstName" isRequired>
//                     <FormLabel>First Name</FormLabel>
//                     <Input type="text" />
//                   </FormControl>
//                 </Box>
//                 <Box>
//                   <FormControl id="lastName">
//                     <FormLabel>Last Name</FormLabel>
//                     <Input type="text" />
//                   </FormControl>
//                 </Box>
//               </HStack>
//               <FormControl id="email" isRequired>
//                 <FormLabel>Email address</FormLabel>
//                 <Input type="email" />
//               </FormControl>
//               <FormControl id="password" isRequired>
//                 <FormLabel>Password</FormLabel>
//                 <InputGroup>
//                   <Input type={showPassword ? 'text' : 'password'} />
//                   <InputRightElement h={'full'}>
//                     <Button
//                       variant={'ghost'}
//                       onClick={() =>
//                         setShowPassword((showPassword) => !showPassword)
//                       }>
//                       {showPassword ? <ViewIcon /> : <ViewOffIcon />}
//                     </Button>
//                   </InputRightElement>
//                 </InputGroup>
//               </FormControl>
//               <Stack spacing={10} pt={2}>
//                 <Button
//                   loadingText="Submitting"
//                   size="lg"
//                   bg={'blue.400'}
//                   color={'white'}
//                   _hover={{
//                     bg: 'blue.500',
//                   }}>
//                   Sign up
//                 </Button>
//               </Stack>
//               <Stack pt={6}>
//                 <Text align={'center'}>
//                   Already a user? <Link color={'blue.400'}>Login</Link>
//                 </Text>
//               </Stack>
//             </Stack>
//           </Box>
//         </Stack>
//       </Flex>
//     </Layout>
//   );
// }