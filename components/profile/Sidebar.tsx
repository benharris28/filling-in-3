import { useUser } from '@auth0/nextjs-auth0/client';
import { Auth0User } from '../../utils/types';
import { Icon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react'
import {
  FiBarChart2,
  FiBookmark,
  FiCheckSquare,
  FiHelpCircle,
  FiHome,
  FiSearch,
  FiSettings,
  FiUsers,
} from 'react-icons/fi'
import { NavButton } from './NavButton'
import { UserProfile } from './UserProfile'

interface SidebarProps {
  onSelect?: (value: string) => void;
  selectedNavButton: string | null;
}



export default function Sidebar({ onSelect, selectedNavButton }: SidebarProps) {
  const { user, isLoading } = useUser() as { user: Auth0User | undefined; isLoading: boolean };
  
  return (
  <>
  {isLoading && <Box>Loading...</Box>}
  {user && 
  <Flex as="section" minH="100vh" bg="bg-canvas">
    <Flex
      flex="1"
      bg="bg-surface"
      overflowY="auto"
      boxShadow="md"
      maxW={{ base: 'full', sm: 'xs' }}
      py={{ base: '6', sm: '8' }}
      px={{ base: '4', sm: '6' }}
    >
      <Stack justify="space-between" spacing="1">
        <Stack spacing={{ base: '5', sm: '6' }} shouldWrapChildren>
          
         
          <Stack spacing="1">
            <NavButton label="Home" icon={FiHome} isSelected={selectedNavButton === 'Home'} onClick={() => onSelect?.('Home')} />
            <NavButton label="Post Shift" icon={FiBarChart2} isSelected={selectedNavButton === 'Post Shift'} onClick={() => onSelect?.('Post Shift')} />
            <NavButton label="Applications" icon={FiCheckSquare} isSelected={selectedNavButton === 'Applications'} onClick={() => onSelect?.('Applications')} />
            
          </Stack>
        </Stack>
        <Stack spacing={{ base: '5', sm: '6' }}>
          <Stack spacing="1">
            <NavButton label="Help" icon={FiHelpCircle} />
            <NavButton label="Settings" icon={FiSettings} />
          </Stack>
          <Box bg="bg-subtle" px="4" py="5" borderRadius="lg">
            <Stack spacing="4">
              <Stack spacing="1">
                <Text fontSize="sm" fontWeight="medium">
                  Almost there
                </Text>
                <Text fontSize="sm" color="muted">
                  Fill in some more information about you and your person.
                </Text>
              </Stack>
              <Progress value={80} size="sm" aria-label="Profile Update Progress" />
              <HStack spacing="3">
                <Button variant="link" size="sm">
                  Dismiss
                </Button>
                <Button variant="link" size="sm" colorScheme="pink">
                  Update profile
                </Button>
              </HStack>
            </Stack>
          </Box>
          <Divider />
          <UserProfile
            name={user.given_name}
            image={user.picture}
            email={user.email}
          />
        </Stack>
      </Stack>
    </Flex>
  </Flex>
  }
  </>
)
}