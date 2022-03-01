//import Image from '../images/movie-popcorn.jpg';
import {
  Box,
  Center,
  Heading,
  Icon,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { RiMovie2Line } from 'react-icons/ri'

export default function ReviewCard({review}) {
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          {/* <Image
            layout={'fill'}
          /> */}
        </Box>
        <Stack>
          {/* <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            Blog
          </Text> */}
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            NAME OF MOVIE
          </Heading>
          <Text color={'gray.500'}>
            {review.reviewText}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Icon 
            as={RiMovie2Line}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={'gray.500'}>{review.createdAt}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}