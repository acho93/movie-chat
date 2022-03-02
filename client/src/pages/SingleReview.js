import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEW } from '../utils/queries';

import Layout from '../components/Layout';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Auth from '../utils/auth';

import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';

const SingleReviewContent = ({ children }) => {
  return (
      <Stack
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'lg'}
          p={8}
          rounded={'xl'}
          align={'center'}
          pos={'relative'}
          _after={{
              content: `""`,
              w: 0,
              h: 0,
              borderLeft: 'solid transparent',
              borderLeftWidth: 16,
              borderRight: 'solid transparent',
              borderRightWidth: 16,
              borderTop: 'solid',
              borderTopWidth: 16,
              borderTopColor: useColorModeValue('white', 'gray.800'),
              pos: 'absolute',
              bottom: '-16px',
              left: '50%',
              transform: 'translateX(-50%)',
          }}>
          {children}
      </Stack>
  );
};

function SingleReviewCard(props) {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
        <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={{ base: 10, md: 4, lg: 10 }}>
                    <SingleReviewContent>
                        <Text>{props.reviewText}</Text>
                        <Link
                            to={`/profile/${props.username}`}>
                            {props.username} reviewed on {props.createdAt}
                          </Link>
                    </SingleReviewContent>
            </Stack>
        </Container>
    </Box>
  );
}

const SingleReview = ({ reviews }) => {
  const { id: reviewId } = useParams();

  const { loading, data } = useQuery(QUERY_REVIEW, {
    variables: { id: reviewId }
  });

  const review = data?.review || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div>
        <Heading>MOVIE REVIEW</Heading>
        <SingleReviewCard
          username={review.username}
          createdAt={review.createdAt}
          reviewText={review.reviewText}
        ></SingleReviewCard>
        <Text>COMMENT(S)</Text>
        {review.commentCount > 0 && <CommentList comments={review.comments} />}
      {Auth.loggedIn() && <CommentForm reviewId={review._id} />}
      </div>
    </Layout>
  );
};

export default SingleReview;
