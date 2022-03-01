import { gql } from '@apollo/client';

export const QUERY_REVIEWS = gql`
    query reviews($username: String) {
        reviews(username: $username) {
            _id
            reviewText
            createdAt
            username
            reactionCount
            reactions {
                _id
                createdAt
                username
                reactionBody
            }
        }
    }
`;

export const QUERY_REVIEW = gql`
  query review($id: ID!) {
    review(_id: $id) {
      _id
      reviewText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      reviews {
        _id
        reviewText
        createdAt
        reactionCount
      }
    }
  }
`;
