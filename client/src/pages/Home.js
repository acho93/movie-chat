import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';

import Layout from '../components/Layout';
import ReviewList from '../components/ReviewList';
import FriendList from '../components/FriendList';
import ReviewForm from '../components/ReviewForm';

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react';

const Home = () => {
  const { loading, data } = useQuery(QUERY_REVIEWS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const reviews = data?.reviews || [];
  console.log(reviews);

  const loggedIn = Auth.loggedIn();

  return (
    <Layout>
      <Box>
        <Stack direction={'row'}>
          
          <Box className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ReviewList reviews={reviews} title="View the latest movie reviews!" />
            )}
          </Box>
          {loggedIn && (
            <Box className="col-12 mb-3">
              <ReviewForm />
            </Box>
          )}
          {loggedIn && userData ? (
            <Box className="col-12 col-lg-3 mb-3">
              <FriendList
                username={userData.me.username}
                friendCount={userData.me.friendCount}
                friends={userData.me.friends}
              />
            </Box>
          ) : null}
        </Stack>
      </Box>
    </Layout>
  );
};

export default Home;
