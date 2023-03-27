// AirtableUserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { fetchUserFromAirtable, getShiftsForUser, getApplicationsForUser } from '@/services/airtable';

export type AirtableUserData = {
  user_id: string | null;
  first_name: string | null;
  last_name: string | null;
  status: string | null;
  user_type: string | null;
  clinic_name: string | null;
  email: string | null;
};

type AirtableUserContextType = {
  airtableUser: AirtableUserData;
};

const AirtableUserContext = createContext<AirtableUserContextType | undefined>(undefined);

type AirtableUserProviderProps = {
  children: ReactNode;
};

export const AirtableUserProvider: React.FC<AirtableUserProviderProps> = ({ children }) => {
  const { user, isLoading } = useUser();
  const [airtableUser, setAirtableUser] = useState<AirtableUserData>({
    user_id: null,
    first_name: null,
    last_name: null,
    status: null,
    user_type: null,
    clinic_name: null,
    email: null,
  });

  useEffect(() => {
    const userId = user?.sub;

    if (userId) {
      const fetchData = async () => {
        const fetchedUser = await fetchUserFromAirtable(userId);
        
        if (fetchedUser) {
          setAirtableUser(fetchedUser.fields as AirtableUserData);
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
      };

      fetchData();
    }
  }, [user, isLoading]);

  return (
    <AirtableUserContext.Provider value={{ airtableUser }}>
      {children}
    </AirtableUserContext.Provider>
  );
};

export function useAirtableUser(): AirtableUserContextType {
  const context = useContext(AirtableUserContext);
  if (!context) {
    throw new Error('useAirtableUser must be used within an AirtableUserProvider');
  }
  return context;
}