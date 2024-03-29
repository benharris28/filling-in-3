import Link from "next/link";
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  Img,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function HomepageHero() {
  return (
    <Box as="section" bg="bg-surface" paddingTop="60px">
      <Box position="relative" height={{ lg: "720px" }}>
        <Container py={{ base: "16", md: "24" }} height="full">
          <Stack
            direction={{ base: "column", lg: "row" }}
            spacing={{ base: "16" }}
            align={{ lg: "center" }}
            height="full"
          >
            <Stack spacing={{ base: "8", md: "12" }}>
              <Stack spacing="4">
                <Badge
                  colorScheme="pink"
                  alignSelf="start"
                  size={{ base: "md", md: "lg" }}
                >
                  New Shifts Available
                </Badge>
                <Stack
                  spacing={{ base: "4", md: "6" }}
                  maxW={{ md: "xl", lg: "md", xl: "xl" }}
                >
                  <Heading size={{ base: "md", md: "xl" }}>
                    Find a dental shift fast
                  </Heading>
                  <Text fontSize={{ base: "lg", md: "xl" }} color="muted">
                    Find a shift in your area using our useful app
                  </Text>
                </Stack>
              </Stack>
              <Stack direction={{ base: "column", md: "row" }} spacing="3">
                <Link href="/shifts">
                  <Button 
                    colorScheme="pink" 
                    size={{ base: "lg", md: "xl" }}
                    minWidth={{ base: '100%' }}
                    >
                    Find A Shift
                  </Button>
                </Link>
              
              </Stack>
            </Stack>
            <Box
              pos={{ lg: "absolute" }}
              right="0"
              bottom="0"
              w={{ base: "full", lg: "50%" }}
              height={{ base: "96", lg: "full" }}
              sx={{
                clipPath: { lg: "polygon(7% 0%, 100% 0%, 100% 100%, 0% 100%)" },
              }}
            >
              <Img
                boxSize="full"
                objectFit="cover"
                src="https://tinyurl.com/yeyjvptc"
                alt="Lady at work"
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
