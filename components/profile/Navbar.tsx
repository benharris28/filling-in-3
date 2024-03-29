import { Box, Drawer, DrawerContent, DrawerOverlay, Flex, useDisclosure } from '@chakra-ui/react'
import Sidebar from './Sidebar'
import { ToggleButton } from './ToggleButton'

interface NavbarProps {
  onSelect?: (value: string) => void;
  selectedNavButton: string | null;
}
export const Navbar = ({ onSelect, selectedNavButton }: NavbarProps) => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  return (
    <Box width="full" py="4" px={{ base: '4', md: '8' }} bg="bg-surface" boxShadow="sm">
      <Flex justify="space-between">
       
        <ToggleButton isOpen={isOpen} aria-label="Open Menu" onClick={onToggle} />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          isFullHeight
          preserveScrollBarGap
          // Only disabled for showcase
          trapFocus={false}
        >
          <DrawerOverlay />
          <DrawerContent>
            <Sidebar onSelect={onSelect} selectedNavButton={selectedNavButton} />
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  )
}