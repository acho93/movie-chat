import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

import {
  Box,
  Button,
  InputGroup,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react';

import { BsPencil } from 'react-icons/bs'

const CommentForm = ({ reviewId }) => {
  const [commentBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addComment({
        variables: { commentBody, reviewId },
      });

      // clear form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      border='solid'
      borderColor='black'
      h={200}
      w={300}
      m={30}>
      <Box
        as='form'
        onSubmit={handleFormSubmit}>
      <Stack m={3} align={'center'}>
        <InputGroup>
          <Textarea
            type='text'
            placeholder='Write your comment here'
            onChange={(event) => {setBody(event.target.value); setCharacterCount(event.target.value.length)}}
            value={commentBody}
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

export default CommentForm;