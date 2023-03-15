// pages/id.tsx
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ProfileShell from '../../components/profile/ProfileShell';
import { getShiftsForUser, getApplicationsForUser, getUserData } from '../../services/airtable';
import { UserData, Shift, Application } from '../../utils/types';

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  console.log('User object:', user);
  console.log('User.sub:', user?.sub);

  useEffect(() => {
    if (user && user.sub) {
      const fetchData = async () => {
        const fetchedShifts = await getShiftsForUser(user?.sub);
        const fetchedApplications = await getApplicationsForUser(user.sub);
        const fetchedUserData = await getUserData(user.sub);
        setShifts(fetchedShifts);
        setApplications(fetchedApplications);
        setUserData(fetchedUserData);
      };

      fetchData();
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    router.replace('/api/auth/login');
    return null;
  }

  return <ProfileShell userData={userData} shifts={shifts} applications={applications} />;
}