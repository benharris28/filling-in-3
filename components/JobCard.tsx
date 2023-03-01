import { Box, Text } from "@chakra-ui/react"

type JobCardProps = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  location: string;
  startDate: string;
  clinic: string;
}

function JobCard({ id, title, description, skills, location, startDate, clinic }: JobCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
  <Box p="6">
    <Box display="flex" alignItems="baseline">
      <Text fontWeight="semibold" fontSize="xl" mb="2">
        {title}
      </Text>
      <Text fontSize="sm" color="gray.500" ml="2">
        {startDate}
      </Text>
    </Box>
    <Text color="gray.500" mb="4">
      {clinic} - {location}
    </Text>
    <Text>{description}</Text>
    <Box mt="4">
      {skills.map((skill) => (
        <Box key={skill} mr="2" display="inline-block" color="gray.500">
          {skill}
        </Box>
      ))}
    </Box>
  </Box>
</Box>
  )
}

export default JobCard