import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react'

type CenteredPageHeaderProps = {
    short_title: string;
    title: string;
    subtitle: string;
  };

export default function CenteredPageHeader({ short_title, title, subtitle}: CenteredPageHeaderProps ) {
    return (
  <Box as="section" bg="pink.500" py={{ base: '4', md: '6' }} borderRadius="8px">
    <Container>
      <Stack spacing={{ base: '4', md: '6' }} align="center" textAlign="center">
        <Stack spacing="3">
          <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="medium" color="pink.50">
            {short_title}
          </Text>
          <Heading size={{ base: 'md', md: 'lg' }} fontWeight="semibold" color="white">
            {title}
          </Heading>
        </Stack>
        <Text color="pink.50" fontSize={{ base: 'lg', md: 'xl' }} maxW="3xl">
          {subtitle}
        </Text>
      </Stack>
    </Container>
  </Box>
)
}