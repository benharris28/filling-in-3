import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";

export default function PageHeaderCentered() {
  return (
    <Box as="section" bg="bg-surface" py={{ base: "16", md: "24" }}>
      <Container>
        <Stack
          spacing={{ base: "4", md: "6" }}
          align="center"
          textAlign="center"
        >
          <Stack spacing="3">
            <Text
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="medium"
              color="accent"
            >
              Shifts
            </Text>
            <Heading size={{ base: "md", md: "lg" }} fontWeight="semibold">
              Post a shift here
            </Heading>
          </Stack>
          <Text color="muted" fontSize={{ base: "lg", md: "xl" }} maxW="3xl">
            Tell us about your shift and we'll get it online
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
