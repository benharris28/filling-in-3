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
    Text
  } from '@chakra-ui/react'
  import { FiMenu } from 'react-icons/fi'
  import { PopoverIcon } from './PopoverIcon'
  import { ResourcesSubmenu } from './ResourcesSubmenu'
  
  export default function Navbar() {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    const { onToggle, isOpen } = useDisclosure({ defaultIsOpen: true })
    return (
      <Box as="section" minH="md">
        <Box as="nav" bg="bg-surface">
          <Container py={{ base: '4', lg: '5' }}>
            <HStack spacing="10" justify="space-between">
              <Text>Filling In</Text>
              {isDesktop ? (
                <Flex justify="space-between" flex="1">
                  <ButtonGroup variant="link" spacing="8">
                    <Button>Product</Button>
                    <Button>Pricing</Button>
                    
                    <Button>Support</Button>
                  </ButtonGroup>
                  <HStack spacing="3">
                    <Button colorScheme="pink" variant='outline'>Sign in</Button>
                    <Button
                      onClick={onToggle}
                      colorScheme="pink"
                    >
                      Sign Up
                    </Button>
                  </HStack>
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
        {isOpen &&
        <ResourcesSubmenu isOpen={isDesktop && isOpen} />
  }
      </Box>
    )
  }