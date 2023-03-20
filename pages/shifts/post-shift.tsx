import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import PageHeaderCentered from "@/components/page-header/PageHeaderCentered"
import { ShiftPostForm } from "@/components/shiftpostform/ShiftPostForm";
import Navbar from "@/components/navigation/Navbar"
import { useUser } from '@auth0/nextjs-auth0/client';

//Pull in user object from Auth0
//Pull in approval status from Airtable
//Must check that user is authenticated and approved before loading page

export default function PostShift() {
    const { user, isLoading } = useUser();
    
    return (
        <>
        {isLoading && <Box>Loading...</Box>}
        <Navbar />
        <Container bgColor='white'>
            <Stack display='flex' justifyContent='center' alignItems='center' bgColor='white'>
                <PageHeaderCentered />
                <ShiftPostForm />
            </Stack>
            
        </Container>
            
            
        </>
    )
}