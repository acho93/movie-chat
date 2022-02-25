const { User, Review } = require('../models');

const resolvers = {
    Query: {
        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('reviews');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('reviews');
        },
        // get all reviews
        reviews: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Review.find(params).sort({ createdAt: -1 });
        },
        // get a review by id
        review: async (parent, { _id }) => {
            return Review.findOne({ _id });
        }
    }
};
  
  module.exports = resolvers;