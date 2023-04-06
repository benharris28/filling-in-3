import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react'

type CenteredPageHeaderProps = {
    short_title: string;
    title: string;
    subtitle: string;
  };

export default function CenteredPageHeader({ short_title, title, subtitle}: CenteredPageHeaderProps ) {
    return (
  <Box as="section" bgColor="pink.100" py={{ base: '4', md: '6' }}>
    <Container>
      <Stack spacing={{ base: '2', md: '3' }} align="center" textAlign="center">
        <Stack spacing="1">
          <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="medium" color="pink.300">
            {short_title}
          </Text>
          <Heading size={{ base: 'md', md: 'lg' }} fontWeight="semibold" color="pink.500">
            {title}
          </Heading>
        </Stack>
        <Text color="pink.500" fontSize={{ base: 'lg', md: 'xl' }} maxW="3xl">
          {subtitle}
        </Text>
      </Stack>
    </Container>
  </Box>
)
}