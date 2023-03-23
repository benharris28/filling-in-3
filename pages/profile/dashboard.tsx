// pages/id.tsx
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ProfileShell from '../../components/profile/ProfileShell';
import { getShiftsForUser, getApplicationsForUser, getUserData, fetchUserFromAirtable } from '../../services/airtable';
import { UserData, Shift, Application, AirtableUserData } from '../../utils/types';
import Navbar from '@/components/navigation/Navbar'



export default function Dashboard() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [airtableUser, setAirtableUser] = useState<AirtableUserData>({
    user_id: null,
    first_name: null,
    last_name: null,
    status: null,
    user_type: null,
    clinic_name: null,
    email: null
  });



  console.log('User object:', user);
  console.log('User.sub:', user?.sub);
  console.log(airtableUser)

  useEffect(() => {
    const userId = user?.sub;

    if (userId) {
      const fetchData = async () => {
        console.log(userId)
        const fetchedShifts = await getShiftsForUser(userId) as Shift[];;
        const fetchedApplications = await getApplicationsForUser(userId);
        const fetchedUser = await fetchUserFromAirtable(userId);
        
        
        console.log(fetchedShifts)

        if (fetchedUser) {
          setAirtableUser(fetchedUser.fields as unknown as AirtableUserData);
        } else {
          setAirtableUser({
            user_id: null,
            first_name: null,
            last_name: null,
            status: null,
            user_type: null,
            clinic_name: null,
            email: null,
          });
        }
    
        if (fetchedShifts.length === 0 || (fetchedShifts.length > 0 && !fetchedShifts[0].hasOwnProperty("uuid"))) {
          setShifts([]);
        } else {
          setShifts(fetchedShifts);
        }
      };

      fetchData();
    }
  }, [user, isLoading]);

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    router.replace('/api/auth/login');
    return null;
  }

  return (
    <>
      <Navbar />
      <ProfileShell airtableUser={airtableUser} shifts={shifts} />
    </>
    
  );
}