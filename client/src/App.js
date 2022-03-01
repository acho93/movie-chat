import React from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
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

const client = new ApolloClient({
  link: httpLink,
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
              <Route path='/profile' element={<Profile />} />
              {/* <Route path='/reviewlist' element={<ReviewList />} /> */}
            </Routes>

          </Grid>
        </Box>
      </ChakraProvider>
    </ApolloProvider>
  );
}

// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <ChakraProvider theme={theme}>
//         <Box textAlign="center" fontSize="xl">
//         <Grid minH="100vh" p={3}>
//         <Router>
//           <div className="flex-column justify-flex-start min-100-vh">
//             <Header />
//             <div className="container">
//               <Route path='/' element={<Home />} />
//               <Route path='/login' element={<Login />} />
//               <Route path='/signup' element={<Signup />} />
//               <Route exact path="/login" component={Login} />
//               <Route exact path="/signup" component={Signup} />
//               <Route exact path="/profile" component={Profile} />
//               <Route exact path="/thought" component={SingleThought} />

//               <Route component={NoMatch} />
//             </div>
//             <Footer />
//           </div>
//         </Router>
//         </Grid>
//         </Box>
//       </ChakraProvider>
//     </ApolloProvider>
//   );
// }

export default App;
