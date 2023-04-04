import { Box, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, Link } from "@chakra-ui/react";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    user: any; // Replace "any" with the appropriate user type in your application
  }

const MobileNavbar: React.FC<MobileMenuProps> = ({ isOpen, onClose, user }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          {/* Mobile menu content */}
          <Box p={4}>
            <Button as="a" href="/shifts" variant="link" onClick={onClose}>
              Shifts
            </Button>
            <Button onClick={onClose}>Pricing</Button>
            <Button onClick={onClose}>Support</Button>
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