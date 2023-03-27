import ShiftList from '../components/ShiftList'
import Navbar from '@/components/navigation/Navbar'
import { useAirtableUser } from '@/contexts/UserDataContext';

export default function Shifts() {
    const { airtableUser } = useAirtableUser();
    console.log('Airtable User Data:', airtableUser);

    return (
        <>
            <Navbar />
            <ShiftList />
        </>
        
    )
}