import ShiftList from '../components/shiftlist/ShiftList'
import Navbar from '@/components/navigation/Navbar'
import { useAirtableUser } from '@/contexts/UserDataContext';
import { Box } from '@chakra-ui/react';

export default function Shifts() {
    const { airtableUser } = useAirtableUser();
    console.log('Airtable User Data:', airtableUser);

    return (
        <>
            <Navbar />
            <Box paddingTop="73px">
                <ShiftList />
            </Box>
            
        </>
        
    )
}