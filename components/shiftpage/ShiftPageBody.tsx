import { Box, Button, Container, Heading, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { FiBriefcase, FiDollarSign, FiMapPin } from 'react-icons/fi'

export default function ShiftPageBody() {
    return (
  <Box as="section" bg="gray.50" pt={{ base: '4', md: '8' }} pb={{ base: '12', md: '12' }}>
    <Container>
      <Stack spacing="4" direction={{ base: 'column', md: 'row' }} justify="space-between">
        <Stack spacing="1">
          <Heading size={{ base: 'xs', md: 'sm' }} fontWeight="medium">
            Overview
          </Heading>
          <Text>
            Here is the job that you will be asked to do
          </Text>
         
        </Stack>
      
      </Stack>
    </Container>
  </Box>
)
    }