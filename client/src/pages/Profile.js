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
      <div>
        <div className="flex-row mb-3">
          <h2 className="bg-dark text-secondary p-3 display-inline-block">
            Viewing {userParam ? `${user.username}'s` : 'your'} profile.
          </h2>
          {userParam && (
            <button className="btn ml-auto" onClick={handleClick}>
              Add Friend
            </button>
          )}
        </div>

        <div className="flex-row justify-space-between mb-3">
          <div className="col-12 mb-3 col-lg-8">
            <ReviewList reviews={user.reviews} title={`${user.username}'s reviews...`} />
          </div>

          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={user.username}
              friendCount={user.friendCount}
              friends={user.friends}
            />
          </div>
        </div>
        <div className="mb-3">{!userParam && <ReviewForm />}</div>
      </div>
    </Layout>
  );
};

export default Profile;
