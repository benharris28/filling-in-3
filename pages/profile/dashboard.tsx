// pages/id.tsx
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import ProfileShell from '../../components/profile/ProfileShell';

export default function dashboard() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    router.replace('/api/auth/login');
    return null;
  }

  return <ProfileShell />;
}