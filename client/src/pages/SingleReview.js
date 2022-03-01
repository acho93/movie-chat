import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_REVIEW } from '../utils/queries';

const SingleReview = props => {

  const { id: reviewId } = useParams();
  
  const { loading, data } = useQuery(QUERY_REVIEW, {
    variables: { id: reviewId }
  });

  const review = data?.review || {};

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
     <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {review.username}
          </span>{' '}
          review on {review.createdAt}
        </p>
        <div className="card-body">
          <p>{review.reviewText}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SingleReview;
