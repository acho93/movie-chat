import React from 'react';
import { Link } from 'react-router-dom';

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

const CommentContent = ({ children }) => {
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

function CommentCard(props) {
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.700')}>
            <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    spacing={{ base: 10, md: 4, lg: 10 }}>
                        <CommentContent>
                            <Text>{props.commentBody}</Text>
                            <Link
                                to={`/profile/${props.username}`}>
                                {props.username} commented on {props.createdAt}
                            </Link>
                        </CommentContent>
                </Stack>
            </Container>
        </Box>
    )
}

function Wrapper(props) {
    return <div>{props.children}</div>;
}

const CommentList = ({ comments }) => {
    return (
        <Box>
            <Wrapper>
                <SimpleGrid columns={1} spacing={10}>
                    {comments.map((comment) => (
                        <Box>
                            <CommentCard
                                username={comment.username}
                                createdAt={comment.createdAt}
                                commentBody={comment.commentBody}
                            />
                        </Box>
                    ))}
                </SimpleGrid>
            </Wrapper>
        </Box>
    );
};

export default CommentList;