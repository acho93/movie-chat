import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/queries';

import Layout from '../components/Layout';
import ReviewList from '../components/ReviewList';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_REVIEWS);
  const reviews = data?.reviews || [];
  console.log(reviews);

  return (
    <Layout>
      <main>
        <div className="flex-row justify-space-between">
          <div className="col-12 mb-3">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ReviewList reviews={reviews} title="Let the movie discussions... Begin!" />
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
