// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    reviews: [Review]
    friends: [User]
}

type Review {
    _id: ID
    reviewText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
}

type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
}

  type Query {
    users: [User]
    user(username: String!): User
    reviews(username: String): [Review]
    review(_id: ID!): Review
  }
`;

// export the typeDefs
module.exports = typeDefs;