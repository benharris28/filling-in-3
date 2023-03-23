import { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    Stack,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react'
  import { FiDownloadCloud } from 'react-icons/fi'
  import { Navbar } from './Navbar'
  import Sidebar from './Sidebar'
  import { ShiftPostForm } from '../shiftpostform/ShiftPostForm'
  import ProfileShiftList from './ProfileShiftList'
  import { UserData, Shift, Application, Auth0User, AirtableUserData } from '../../utils/types';
  
  interface ShellProps {
    shifts: Shift[];
    airtableUser: AirtableUserData;
  }

  

  interface UserProps {
    user: Auth0User
  }

  export default function ProfileShell({ shifts, airtableUser }: ShellProps) {
    console.log(shifts)
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    const [selectedNavButton, setSelectedNavButton] = useState<string | null>(null); // track currently selected navbutton
    console.log(selectedNavButton)
    
    const renderSelectedComponent = () => {
      switch (selectedNavButton) {
        case 'Shifts':
        return <ProfileShiftList shifts={shifts.length > 0 ? shifts : []} />
        case 'Post Shift':
          return <ShiftPostForm />;
        // add cases for other navbutton components as needed
        default:
          return <ProfileShiftList shifts={shifts.length > 0 ? shifts : []} />; // default to the "Test" text if no navbutton is selected
      }
    };

    return (
      <Flex
        as="section"
        direction={{ base: 'column', lg: 'row' }}
        height="100vh"
        bg="bg-canvas"
        overflowY="auto"
      >
        {isDesktop ? <Sidebar onSelect={setSelectedNavButton} selectedNavButton={selectedNavButton} /> : <Navbar onSelect={setSelectedNavButton} selectedNavButton={selectedNavButton}/>}
        <Box bg="bg-surface" pt={{ base: '0', lg: '3' }} flex="1">
          <Box bg="bg-canvas" borderTopLeftRadius={{ base: 'none', lg: '2rem' }} height="full">
            <Container py="8" height="full">
              <Stack spacing={{ base: '8', lg: '6' }} height="full">
                <Stack
                  spacing="4"
                  direction={{ base: 'column', lg: 'row' }}
                  justify="space-between"
                  align={{ base: 'start', lg: 'center' }}
                >
                  <Stack spacing="1">
                    <Heading size={{ base: 'xs', lg: 'sm' }} fontWeight="medium">
                      {selectedNavButton}
                    </Heading>
                    <Text color="muted">All your profile info at a glance</Text>
                  </Stack>
                  <HStack spacing="3">
                 
                 {airtableUser && airtableUser.user_type === 'clinic' && 
                  <Button colorScheme='pink'>Post a Shift</Button>
                  }
                </HStack>
                </Stack>
                <Box bg="bg-surface" borderRadius="lg" borderWidth="1px" height="full">
                  {renderSelectedComponent()} {/* render selected component */}
                </Box>
             
              </Stack>
            </Container>
          </Box>
        </Box>
      </Flex>
    )
  }