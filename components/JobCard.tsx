import { Box, Button, Container, Stack, Text, Tag, Wrap, HStack, Icon } from '@chakra-ui/react'
import { GoCalendar, GoGlobe, GoPencil, GoPerson } from 'react-icons/go'


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
            <HStack fontSize="sm">
            <HStack fontSize="sm">
              <Icon as={GoGlobe} color="gray.500" />
              <Text>{city}</Text>
             
            </HStack>
                <Icon as={GoPerson} color="gray.500" />
                <Text fontSize="sm" color="muted">
                  {position}
                </Text>
            </HStack>
            
          </Stack>
          <Text fontWeight="semibold" mt="8" mb="2">
            Skills Required
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

