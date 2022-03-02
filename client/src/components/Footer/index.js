import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { RiNetflixFill } from 'react-icons/ri';
import { SiHbo, SiHulu } from 'react-icons/si';

const SocialButton = ({
  children,
  label,
  href,
  color,
}) => {
  return (
      <chakra.button
          bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
          rounded={'full'}
          w={8}
          h={8}
          cursor={'pointer'}
          as={'a'}
          href={href}
          target={'_blank'}
          display={'inline-flex'}
          alignItems={'center'}
          justifyContent={'center'}
          transition={'background 0.3s ease'}
          _hover={{
              bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
          }}
          color={color}
          >
          <VisuallyHidden>{label}</VisuallyHidden>
          {children}
      </chakra.button>
  );
};

export default function Footer() {
  return (
      <Box
          bg={useColorModeValue('#564D4D', 'gray.900')}
          color={useColorModeValue('white', 'gray.200')}>
          <Container
              as={Stack}
              maxW={'6xl'}
              py={4}
              direction={{ base: 'column', md: 'row' }}
              spacing={4}
              justify={{ base: 'center', md: 'space-between' }}
              align={{ base: 'center', md: 'center' }}>
              <Text>© 2022 Adam Menkes, Ashley Cho, Marcus Hale, Samuel Hagos</Text>
              <Stack direction={'row'} spacing={6}>
                  <SocialButton label={'Netflix'} href={'https://www.netflix.com'}>
                      <RiNetflixFill />
                  </SocialButton>
                  <SocialButton label={'HBO'} href={'https://www.hbo.com'}>
                      <SiHbo />
                  </SocialButton>
                  <SocialButton label={'Hulu'} href={'https://www.hulu.com'}>
                      <SiHulu />
                  </SocialButton>
              </Stack>
          </Container>
      </Box>
  );
}