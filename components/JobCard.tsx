import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  Tag,
  Wrap,
  HStack,
  Icon,
  Flex,
  LinkBox,
  LinkOverlay
} from "@chakra-ui/react";
import { GoCalendar, GoGlobe, GoClock, GoPerson } from "react-icons/go";

type JobCardProps = {
  id: string | null;
  uuid?: string | null;
  shift_title: string | null;
  position: string | null;
  clinic_name: string | null;
  skills_required: string[] | null;
  city: string | null
  start_date: string | null;
  hours: number | null;
  total_pay: number | null;
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
  hours,
  total_pay,
}: JobCardProps) {
  return (
    <Box py={{ base: "0", md: "0" }}>
      <Container maxW='3xl' px='0'>
        <LinkBox
          bg="bg-surface"
          boxShadow="sm"
          borderRadius="lg"
          p={{ base: "4", md: "4" }}
  
        >
          <Stack spacing="2">
            <Stack spacing="1">
              <Flex justifyContent="space-between" alignItems="center">
              
              <Text fontSize="lg" fontWeight="medium">
              <LinkOverlay href={`/shifts/${uuid}`}>
                {shift_title}
                </LinkOverlay>
              </Text>
              
              <Button variant="secondary">Apply</Button>

              </Flex>
              
              <Wrap shouldWrapChildren my="4" spacing="4">
                <HStack fontSize="sm" spacing='2'>
                  <Icon as={GoGlobe} color="gray.500" />
                  <Text>{city}</Text>
                </HStack>
                <HStack spacing='2'>
                <Icon as={GoPerson} color="gray.500" />
                <Text fontSize="sm" color="muted">
                  {position}
                </Text>
                </HStack>
              </Wrap>
              <Wrap shouldWrapChildren my="4" spacing="4">
                <HStack fontSize="sm">
                  <Icon as={GoCalendar} color="gray.500" />
                  <Text>{start_date}</Text>
                </HStack>
                <HStack>
                  <Icon as={GoClock} color="gray.500" />
                  <Text>{hours}</Text>
                </HStack>
              </Wrap>
            </Stack>

            <Wrap shouldWrapChildren>
              {skills_required && skills_required.map((skill) => (
                <Tag bg='pink.100' key={skill}>{skill}</Tag>
              ))}
            </Wrap>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing="3"
            ></Stack>
            <Stack direction={{ base: "column", md: "row" }} spacing="3">
              
            </Stack>
          </Stack>
        </LinkBox>
      </Container>
    </Box>
  );
}

export default JobCard;
