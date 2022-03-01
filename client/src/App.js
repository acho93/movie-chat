import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleReview from './pages/SingleReview';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/profile/:username?" element={<Profile />} /> */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/review/:id" element={<SingleReview />} />

              <Route element={<NoMatch />} />
            </Routes>

          </Grid>
        </Box>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
