import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($movieTitle: String!, $reviewText: String!) {
    addReview(movieTitle: $movieTitle, reviewText: $reviewText) {
      _id
      movieTitle
      reviewText
      createdAt
      username
      commentCount
      comments {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($reviewId: ID!, $commentBody: String!) {
    addComment(reviewId: $reviewId, commentBody: $commentBody) {
      _id
      commentCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;