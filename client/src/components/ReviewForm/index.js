import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../utils/mutations';
import { QUERY_REVIEWS, QUERY_ME } from '../../utils/queries';

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react';

import { MdLocalMovies } from 'react-icons/md'
import { BsPencil } from 'react-icons/bs'

const ReviewForm = () => {
  const [movieTitle, setTitle] = useState('');
  const [reviewText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addReview, { error }] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      try {
        // could potentially not exist yet, so wrap in a try...catch
        const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });
        cache.writeQuery({
          query: QUERY_REVIEWS,
          data: { reviews: [addReview, ...reviews] }
        });
      } catch (e) {
        console.error(e);
      }
  
      // update me object's cache, appending new review to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, reviews: [...me.reviews, addReview] } }
      });
    }
  });

  const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
      // add review to database
      await addReview({
        variables: { movieTitle, reviewText }
      });
  
      // clear form value
      setTitle('');
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      border='solid'
      borderColor='red'
      h={300}
      w={300}
      m={30}>
      <Box
        as='form'
        onSubmit={handleFormSubmit}>
      <Stack m={3}>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<MdLocalMovies color='gray.300' />}
          />
          <Input
            type='text'
            placeholder='Movie Title'
            onChange={(event) => setTitle(event.target.value)}
            value={movieTitle}
          />
        </InputGroup>

        <InputGroup>
          <Textarea
            type='text'
            placeholder='Write your review here'
            onChange={(event) => {setText(event.target.value); setCharacterCount(event.target.value.length)}}
            value={reviewText}
            />
        </InputGroup>
        <Text>
          {characterCount === 280 || error ? 'text-error' : ''}
          Character Count: {characterCount}/280
        </Text>
        <Button
          type='submit'
          leftIcon={<BsPencil />}
          colorScheme='yellow'
          variant='solid'
          w={100}>
          Submit
        </Button>
      </Stack>
      </Box>
    </Box>
  );
};

export default ReviewForm;