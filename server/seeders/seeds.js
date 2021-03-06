const faker = require('faker');

const db = require('../config/connection');
const { Review, User } = require('../models');

db.once('open', async () => {
  await Review.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create reviews
  let createdReviews = [];
  for (let i = 0; i < 100; i += 1) {
    const movieTitle = faker.lorem.words(Math.round(Math.random() * 3) + 1);
    const reviewText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdReview = await Review.create({ movieTitle, reviewText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { reviews: createdReview._id } }
    );

    createdReviews.push(createdReview);
  }

  // create comments
  for (let i = 0; i < 100; i += 1) {
    const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomReviewIndex = Math.floor(Math.random() * createdReviews.length);
    const { _id: reviewId } = createdReviews[randomReviewIndex];

    await Review.updateOne(
      { _id: reviewId },
      { $push: { comments: { commentBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
