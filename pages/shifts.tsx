import ShiftList from '../components/shiftlist/ShiftList'
import Navbar from '@/components/navigation/Navbar'
import { useAirtableUser } from '@/contexts/UserDataContext';
import { Box } from '@chakra-ui/react';
import CenteredPageHeader from '@/components/CenteredPageHeader';

export default function Shifts() {
    const { airtableUser } = useAirtableUser();
    console.log('Airtable User Data:', airtableUser);

    return (
        <>
            <Navbar />
            <Box paddingTop="72px">
            <CenteredPageHeader short_title="Shifts" title="Available Shifts" subtitle="These are the available shifts" />
            </Box>
            <ShiftList />
           
            
        </>
        
    )
}