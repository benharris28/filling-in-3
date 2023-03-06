import { Box, Button, Container, Heading, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { FiBriefcase, FiDollarSign, FiMapPin } from 'react-icons/fi'

interface Shift {
  uuid: string;
  shift_title: string;
  position: string;
  clinic_name: string;
  skills_required: string[];
  city: string;
  start_date: string;
  hours: number;
  total_pay: number;
  shift_overview: string;
  requirements: string;
}

interface ShiftProps {
  shift: Shift;
}

export default function ShiftPageBody({shift} : ShiftProps) {
    return (
  <Box as="section" bg="gray.50" pt={{ base: '4', md: '8' }} pb={{ base: '12', md: '12' }}>
    <Container>
      <Stack spacing="4" direction={{ base: 'column', md: 'row' }} justify="space-between">
        <Stack spacing="1">
          <Heading size={{ base: 'xs', md: 'sm' }} fontWeight="medium">
            Shift Overview
          </Heading>
          <Text>
          {shift.shift_overview}
          </Text>
         
        </Stack>
      
      </Stack>
    </Container>
  </Box>
)
    }