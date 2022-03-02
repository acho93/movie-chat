import React from 'react';
import { Link } from 'react-router-dom';

import PopcornImage from '../../images/movie-popcorn.jpg';
import {
  Box,
  Center,
  Heading,
  Icon,
  Image,
  Text,
  SimpleGrid,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { RiMovie2Line } from 'react-icons/ri'

function ReviewCard(props) {
  return (
    <Center py={6}>
      <Box
        maxW={'400px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'250px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            src={PopcornImage}
            objectFit={'cover'}
          />
        </Box>
        <Stack>
          <Link to={`/review/${props._id}`}>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {props.movieTitle}
          </Heading>
          <Text color={'gray.500'}>
            {props.reviewText}
          </Text>
          </Link>{' '}
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} alignItems={'center'}>
          <Icon w={8} h={8}
            as={RiMovie2Line}
          />
          <Center>
          <Stack direction={'column'} spacing={0} fontSize={'sm'} justifyContent={'center'}>
            <Link
              to={`/profile/${props.username}`}
              style={{ fontWeight: 700 }}
              className="text-light">
              {props.username}
            </Link>{' '}
            <Text color={'gray.500'}>{props.createdAt}</Text>
            <Text>
              Comment(s): {props.commentCount}
            </Text>
          </Stack>
          </Center>
        </Stack>
      </Box>
    </Center>
  )
}

function Wrapper(props) {
  return <div>{props.children}</div>;
}

const ReviewList = ({ reviews, title }) => {
  if (!reviews.length) {
    return <h3>No Reviews Yet</h3>;
  }

  return (
      <div>
        <h3>{title}</h3>
        <Wrapper>
          <SimpleGrid columns={2} spacing={10}>
            {reviews.slice(0,10).map((review) => (
              <Box>
                <ReviewCard
                    _id={review._id}
                    username={review.username}
                    createdAt={review.createdAt}
                    movieTitle={review.movieTitle}
                    reviewText={review.reviewText}
                    commentCount={review.commentCount}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Wrapper>
      </div>
  );
};

export default ReviewList;