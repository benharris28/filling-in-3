import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  Text,
  Link,
  LinkBox,
  LinkOverlay
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { PopoverIcon } from "./PopoverIcon";
import { ResourcesSubmenu } from "./ResourcesSubmenu";
import { useUser } from "@auth0/nextjs-auth0/client";
import { NavLogo } from "./NavLogo";

export default function Navbar() {
  const { user } = useUser();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { onToggle, isOpen } = useDisclosure({ defaultIsOpen: false });
  return (
    <Box as="section">
      <Box as="nav" bg="red.100">
        <Container py={{ base: "4", lg: "5" }}>
          <HStack spacing="10" justify="space-between">
            <NavLogo />
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                <ButtonGroup variant="link" spacing="8">
                  <Button>Shifts</Button>
                  <Button>Pricing</Button>

                  <Button>Support</Button>
                </ButtonGroup>
                {user ? (
                  <HStack spacing="3">
                    <Link href="/profile/dashboard">
                      <Button colorScheme="pink" variant="outline">
                        Profile
                      </Button>
                    </Link>
                    <Link href="/api/auth/logout">
                      <Button colorScheme="pink" variant="outline">
                        Logout
                      </Button>
                    </Link>
                  </HStack>
                ) : (
                  <HStack spacing="3">
                    <LinkBox>
                      <LinkOverlay href="/api/auth/login?returnTo=/profile/dashboard">
                      <Button colorScheme="pink" variant="outline">
                        Sign in
                      </Button>
                      </LinkOverlay>
                      
                    </LinkBox>

                    <Button onClick={onToggle} colorScheme="pink">
                      Sign Up
                    </Button>
                  </HStack>
                )}
              </Flex>
            ) : (
              <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
          </HStack>
        </Container>
        <Divider />
      </Box>
      {isOpen && <ResourcesSubmenu isOpen={isDesktop && isOpen} />}
    </Box>
  );
}
