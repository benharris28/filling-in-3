import { Box, Text } from "@chakra-ui/react";

type JobCardProps = {
  id: string;
  uuid: string;
  shift_title: string;
  skills_required: string[];
  city: string;
  start_date: string;
  clinic_name: string;
  position: string;
};

function JobCard({
  id,
  uuid,
  shift_title,
  skills_required,
  city,
  start_date,
  clinic_name,
  position
}: JobCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Text fontWeight="semibold" fontSize="xl" mb="2">
            {shift_title}
          </Text>
          <Text fontSize="sm" color="gray.500" ml="2">
            {start_date}
          </Text>
        </Box>
        <Text color="gray.500" mb="4">
          {clinic_name} - {city}
        </Text>
       
        <Box mt="4">
          {skills_required.map((skill) => (
            <Box key={skill} mr="2" display="inline-block" color="gray.500">
              {skill}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default JobCard;