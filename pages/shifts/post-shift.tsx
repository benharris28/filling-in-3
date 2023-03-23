import { useState, useEffect } from 'react';
import { Box, Container, Heading, Stack, Text, Link, Button } from "@chakra-ui/react";
import PageHeaderCentered from "@/components/page-header/PageHeaderCentered"
import { ShiftPostForm } from "@/components/shiftpostform/ShiftPostForm";
import { fetchUserFromAirtable } from "@/services/airtable";
import Navbar from "@/components/navigation/Navbar"
import { useUser } from '@auth0/nextjs-auth0/client';

//Pull in user object from Auth0
//Pull in approval status from Airtable
//Must check that user is authenticated and approved before loading page

export default function PostShift() {
    const { user, error, isLoading } = useUser();
    const [airtableUser, setAirtableUser] = useState({});
    console.log(airtableUser)
    
    

    useEffect(() => {
        const userId = user?.sub;
        
        if (userId) {
            const fetchUser = async () => {
                const fetchedUser = await fetchUserFromAirtable(userId)

                if (fetchedUser) {
                    setAirtableUser(fetchedUser)
                } else {
                    setAirtableUser({})
                }
            }
          
            fetchUser();
           
        }
      }, [user]);
    
      console.log(airtableUser)

    return (
        <>
        {isLoading && <Box>Loading...</Box>}
        <Navbar />

        {error && (
        <>
          <Box as="section">Error</Box>
          <pre>{error.message}</pre>
        </>
      )}

        {!user && 
            <Box as="section">
                Please login to view this page
                <Link variant="menu" href={'/api/auth/login?returnTo=/shifts/post-shift'}>
                    <Button>
                        Login
                    </Button>
                </Link>
            </Box>
        }

        {user && 
        <Container bgColor='white'>
            <Stack display='flex' justifyContent='center' alignItems='center' bgColor='white'>
                <PageHeaderCentered 
                />
                <ShiftPostForm />
            </Stack>
            
        </Container>
}
            
            
        </>
    )
}