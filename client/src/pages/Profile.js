import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Layout from '../components/Layout';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import FriendList from '../components/FriendList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

import {
  Box,
  Button,
  Stack
} from '@chakra-ui/react';

import { BsFillPersonPlusFill } from 'react-icons/bs'

const Profile = () => {
  const [addFriend] = useMutation(ADD_FRIEND);
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate replace to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout>
      <Box>
        <Stack direction={'row'}>
          <ReviewList reviews={user.reviews} title={`${user.username}'s reviews...`} />
          <Stack direction={'column'}>
            <Box>{!userParam && <ReviewForm />}</Box>
            <Box>
              <FriendList
                username={user.username}
                friendCount={user.friendCount}
                friends={user.friends}
              />
              {userParam && (
              <Button
                type='submit'
                leftIcon={<BsFillPersonPlusFill />}
                colorScheme='yellow'
                variant='solid'
                w={150}
                onClick={handleClick}>
                Add Friend
              </Button>
              )}
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
};

export default Profile;
