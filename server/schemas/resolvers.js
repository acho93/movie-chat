const { User, Review } = require('../models');
// import error handling function
const { AuthenticationError } = require('apollo-server-express');
// import authentication function
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id})
                    .select('-__v -password')
                    .populate('reviews')
                    .populate('friends');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
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
    }, 
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addReview: async (parent, args, context) => {
            if (context.user) {
                const review = await Review.create({ ...args, username: context.user.username });
                
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { reviews: review._id } },
                    { new: true }
                );

                return review;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addReaction: async (parent, { reviewId, reactionBody }, context) => {
            if (context.user) {
                const updatedReview = await Review.findOneAndUpdate(
                    { _id: reviewId },
                    { $push: { reactions: { reactionBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedReview;
            }

            throw new AuthenticationError('You need to be logged in');
        },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: friendId } },
                { new: true }
              ).populate('friends');
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          }
    }
};
  
  module.exports = resolvers;