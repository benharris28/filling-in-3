import { Box, Button, Container, Stack, Text, Tag, Wrap } from '@chakra-ui/react'


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
    <Box as="section" py={{ base: '0', md: '0' }}>
    <Container maxW="3xl">
      <Box bg="bg-surface" boxShadow="sm" borderRadius="lg" p={{ base: '4', md: '4' }}>
        <Stack spacing="1">
          <Stack spacing="1">
            <Text fontSize="lg" fontWeight="medium">
              {shift_title}
            </Text>
            <Text fontSize="sm" color="muted">
              {position}
            </Text>
          </Stack>
          <Text fontWeight="semibold" mt="8" mb="2">
            Interests
          </Text>
          <Wrap shouldWrapChildren>
                      {skills_required.map((skill) => (
              <Tag key={skill}>
                {skill}
              </Tag>
            ))} 
          </Wrap>
          <Stack direction={{ base: 'column', md: 'row' }} spacing="3">
        


          </Stack>
          <Stack direction={{ base: 'column', md: 'row' }} spacing="3">
            <Button variant="secondary">Apply</Button>
          
          </Stack>
        </Stack>
      </Box>
    </Container>
  </Box>
  );
}

export default JobCard;

