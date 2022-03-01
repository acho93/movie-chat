import React from 'react';
import { Link } from 'react-router-dom';

//import ReviewCard from './ReviewCard'

// //import Image from '../images/movie-popcorn.jpg';
// import {
//   Box,
//   Center,
//   Heading,
//   Icon,
//   Text,
//   SimpleGrid,
//   Stack,
//   useColorModeValue,
// } from '@chakra-ui/react';
// import { RiMovie2Line } from 'react-icons/ri'

// function ReviewCard(review) {
//   return (
//     <Center py={6}>
//       <Box
//         maxW={'200px'}
//         w={'full'}
//         bg={useColorModeValue('white', 'gray.900')}
//         boxShadow={'2xl'}
//         rounded={'md'}
//         p={6}
//         overflow={'hidden'}>
//         <Box
//           h={'210px'}
//           bg={'gray.100'}
//           mt={-6}
//           mx={-6}
//           mb={6}
//           pos={'relative'}>
//           {/* <Image
//             layout={'fill'}
//           /> */}
//         </Box>
//         <Stack>
//           {/* <Text
//             color={'green.500'}
//             textTransform={'uppercase'}
//             fontWeight={800}
//             fontSize={'sm'}
//             letterSpacing={1.1}>
//             Blog
//           </Text> */}
//           <Heading
//             color={useColorModeValue('gray.700', 'white')}
//             fontSize={'2xl'}
//             fontFamily={'body'}>
//             NAME OF MOVIE
//           </Heading>
//           <Text color={'gray.500'}>
//             {review.reviewText}
//           </Text>
//         </Stack>
//         <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
//           <Icon 
//             as={RiMovie2Line}
//           />
//           <Stack direction={'column'} spacing={0} fontSize={'sm'}>
//             <Text fontWeight={600}>{review.username}</Text>
//             <Text color={'gray.500'}>{review.createdAt}</Text>
//             <Text>
//               Comment: {review.commentCount} || Click to{' '}
//               {review.commentCount ? 'see' : 'start'} the discussion!
//             </Text>
//           </Stack>
//         </Stack>
//       </Box>
//     </Center>
//   )
// }

const ReviewList = ({ reviews, title }) => {
  if (!reviews.length) {
    return <h3>No Reviews Yet</h3>;
  }

  return (
      <div>
        <h3>{title}</h3>
        {reviews &&
          reviews.map(review => (
            <div key={review._id} className="card mb-3">
              <p className="card-header">
                <Link
                  to={`/profile/${review.username}`}
                  style={{ fontWeight: 700 }}
                  className="text-light"
                >
                  {review.username}
                </Link>{' '}
                 review on {review.createdAt}
              </p>
              <div className="card-body">
                <Link to={`/review/${review._id}`}>
                  <p>{review.reviewText}</p>
                  <p className="mb-0">
                    Comments: {review.commentCount} || Click to{' '}
                    {review.commentCount ? 'see' : 'start'} the discussion!
                  </p>
                </Link>
              </div>
            </div>
          ))}
      </div>
  );
};

export default ReviewList;