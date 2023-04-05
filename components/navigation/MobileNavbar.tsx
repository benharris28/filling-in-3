import { Box, Button, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, Link, Flex, HStack, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { NavLogo } from "./NavLogo";
import { NavAccordion } from './NavAccordion'
import { ResourcesSubmenu } from "./ResourcesSubmenu";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    user: any; // Replace "any" with the appropriate user type in your application
  }

const MobileNavbar: React.FC<MobileMenuProps> = ({ isOpen, onClose, user }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="full">
      <DrawerOverlay>
        <DrawerContent>
        <DrawerHeader padding="0">
        <Flex height="16" align="center" justify="space-between" px="5">
            <NavLogo />
            <DrawerCloseButton />
        </Flex>
        </DrawerHeader>
        <DrawerBody>
          {/* Mobile menu content */}
          <Box p={4} textAlign="left">
            <NavAccordion onClickMenu={onClose} />
            {user ? (
              <HStack mt="6">
                <LinkBox flex="1">
                      <LinkOverlay href="/profile/dashboard">
                      <Button width="100%" colorScheme="pink"  onClick={onClose}>
                        Profile
                      </Button>
                      </LinkOverlay>
                      
                    </LinkBox>
                    <LinkBox flex="1">
                      <LinkOverlay href="/api/auth/logout">
                      <Button width="100%" colorScheme="pink" variant="outline" onClick={onClose}>
                        Logout
                      </Button>
                      </LinkOverlay>
                      
                    </LinkBox>
                
                
               
              </HStack>
            ) : (
                <HStack mt="6">
                 <LinkBox flex="1">
                      <LinkOverlay href="/api/auth/login?returnTo=/profile/dashboard">
                      <Button width="100%" colorScheme="pink" variant="outline">
                        Sign in
                      </Button>
                      </LinkOverlay>
                      
                    </LinkBox>
                    <LinkBox flex="1">
                      <LinkOverlay href="/api/auth/login?returnTo=/profile/dashboard">
                      <Button width="100%" colorScheme="pink" variant="outline">
                        Sign up
                      </Button>
                      </LinkOverlay>
                      
                    </LinkBox>
              </HStack>
            )}
          </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default MobileNavbar;