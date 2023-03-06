import { Box, Button, Container, Heading, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { FiBriefcase, FiDollarSign, FiMapPin } from 'react-icons/fi'

export default function PageHeader() {
    return (
  <Box as="section" bg="gray.50" pt={{ base: '4', md: '8' }} pb={{ base: '12', md: '24' }}>
    <Container>
      <Stack spacing="4" direction={{ base: 'column', md: 'row' }} justify="space-between">
        <Stack spacing="1">
          <Heading size={{ base: 'xs', md: 'sm' }} fontWeight="medium">
            Christoph Winston
          </Heading>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={{ base: '2', sm: '6' }}
            color="muted"
          >
            <HStack>
              <Icon as={FiBriefcase} boxSize={{ base: '4', sm: '5' }} />
              <Text>Software Engineer</Text>
            </HStack>
            <HStack>
              <Icon as={FiMapPin} boxSize={{ base: '4', sm: '5' }} />
              <Text>Berlin, Germany</Text>
            </HStack>
            <HStack>
              <Icon as={FiDollarSign} boxSize={{ base: '4', sm: '5' }} />
              <Text>80.000 - 90.000</Text>
            </HStack>
          </Stack>
        </Stack>
        <Stack direction="row" spacing="3">
          <Button variant="secondary">Share</Button>
          <Button colorScheme='pink'>Apply</Button>
        </Stack>
      </Stack>
    </Container>
  </Box>
)
    }