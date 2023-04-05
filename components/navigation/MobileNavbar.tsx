import { Box, Button, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton, Link, Flex, Stack } from "@chakra-ui/react";
import { NavLogo } from "./NavLogo";
import { NavAccordion } from './NavAccordion'

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
          
          {/* Mobile menu content */}
          <Box p={4} textAlign="left">
            <NavAccordion onClickMenu={onClose} />
            {user ? (
              <>
                <Link href="/profile/dashboard">
                  <Button colorScheme="pink" variant="outline" onClick={onClose}>
                    Profile
                  </Button>
                </Link>
                <Link href="/api/auth/logout">
                  <Button colorScheme="pink" variant="outline" onClick={onClose}>
                    Logout
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/api/auth/login?returnTo=/profile/dashboard">
                  <Button colorScheme="pink" variant="outline" onClick={onClose}>
                    Sign in
                  </Button>
                </Link>
                <Button onClick={onClose} colorScheme="pink">
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default MobileNavbar;