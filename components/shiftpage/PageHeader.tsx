import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiBriefcase, FiDollarSign, FiMapPin } from "react-icons/fi";
import { useRouter } from "next/router";

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

export default function PageHeader({ shift }: ShiftProps) {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.push("/shifts");
  };

  return (
    <Box
      as="section"
      bg="gray.50"
      pt={{ base: "4", md: "8" }}
      pb={{ base: "12", md: "24" }}
    >
      <Container>
        <Stack>
          <Box>
            <Button onClick={handleBackButtonClick} mb="4">
              Back
            </Button>
          </Box>

          <Stack
            spacing="4"
            direction={{ base: "column", md: "row" }}
            justify="space-between"
          >
            <Stack spacing="1">
              <Heading size={{ base: "xs", md: "sm" }} fontWeight="medium">
                {shift.shift_title}
              </Heading>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={{ base: "2", sm: "6" }}
                color="muted"
              >
                <HStack>
                  <Icon as={FiBriefcase} boxSize={{ base: "4", sm: "5" }} />
                  <Text>{shift.position}</Text>
                </HStack>
                <HStack>
                  <Icon as={FiMapPin} boxSize={{ base: "4", sm: "5" }} />
                  <Text>{shift.city}</Text>
                </HStack>
                <HStack>
                  <Icon as={FiDollarSign} boxSize={{ base: "4", sm: "5" }} />
                  <Text>{shift.total_pay}</Text>
                </HStack>
              </Stack>
            </Stack>
            <Stack direction="row" spacing="3">
              <Button variant="secondary">Share</Button>
              <Button colorScheme="pink">Apply</Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
