import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { ApplicationReady } from '../../utils/types';

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
  can_apply: boolean;
  onApplyClick: () => void;
}

export default function CallToAction({shift, can_apply, onApplyClick } : ShiftProps) {
  const applyButton = !can_apply 
  console.log(applyButton)

    return (
  <Container py={{ base: '16', md: '24' }}>
    <Box
      bg="bg-surface"
      boxShadow="sm"
      borderRadius="xl"
      px={{ base: '6', lg: '16' }}
      py={{ base: '10', lg: '12' }}
    >
      <Stack spacing="8" direction={{ base: 'column', lg: 'row' }} justify="space-between">
        <Stack spacing="4" maxW="2xl">
          <Heading size="xs">Ready to Apply?</Heading>
          <Text color="muted" fontSize={{ base: 'lg', lg: 'xl' }}>
            Sign up for this shift with a few clicks
          </Text>
        </Stack>
        
        <Stack spacing="3" direction={{ base: 'column', sm: 'row' }} justify={{ base: 'start' }}>
          <Button isDisabled={applyButton} colorScheme="pink" size="lg" onClick={onApplyClick}>
            Apply
          </Button>
         
        </Stack>

      </Stack>
    </Box>
  </Container>
)
    }