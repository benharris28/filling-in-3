import { Box, Button, Container, Stack, Text } from '@chakra-ui/react'


type JobCardProps = {
  id: string;
  uuid?: string;
  shift_title: string;
  position: string;
  clinic_name: string;
  skills_required: string[];
  city: string;
  start_date: string;
};

function JobCard({
  id,
  uuid,
  shift_title,
  position,
  clinic_name,
  skills_required,
  city,
  start_date,
  
}: JobCardProps) {
  return (
    <Box as="section" py={{ base: '4', md: '8' }}>
    <Container maxW="3xl">
      <Box bg="bg-surface" boxShadow="sm" borderRadius="lg" p={{ base: '4', md: '6' }}>
        <Stack spacing="5">
          <Stack spacing="1">
            <Text fontSize="lg" fontWeight="medium">
              Updates Available
            </Text>
            <Text fontSize="sm" color="muted">
              A new version is available. Please upgrade for the best experience.
            </Text>
          </Stack>
          <Stack direction={{ base: 'column', md: 'row' }} spacing="3">
          <Box mt="4">
{skills_required.map((skill) => (
  <Box key={skill} mr="2" display="inline-block" color="gray.500">
    {skill}
  </Box>
))}
</Box>
          </Stack>
          <Stack direction={{ base: 'column', md: 'row' }} spacing="3">
            <Button variant="secondary">Skip</Button>
            <Button variant="primary">Download</Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  </Box>
  );
}

export default JobCard;

