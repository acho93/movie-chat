import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';

import Layout from '../components/Layout';
import ReviewList from '../components/ReviewList';
import FriendList from '../components/FriendList';
import ReviewForm from '../components/ReviewForm';

const Home = () => {
  const { loading, data } = useQuery(QUERY_REVIEWS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const reviews = data?.reviews || [];
  console.log(reviews);

  const loggedIn = Auth.loggedIn();

  return (
    <Layout>
      <main>
        <div className="flex-row justify-space-between">
          {loggedIn && (
            <div className="col-12 mb-3">
              <ReviewForm />
            </div>
          )}
          <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ReviewList reviews={reviews} title="View the latest movie reviews!" />
            )}
          </div>
          {loggedIn && userData ? (
            <div className="col-12 col-lg-3 mb-3">
              <FriendList
                username={userData.me.username}
                friendCount={userData.me.friendCount}
                friends={userData.me.friends}
              />
            </div>
          ) : null}
        </div>
      </main>
    </Layout>
  );
};

export default Home;
