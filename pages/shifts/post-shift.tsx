import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import PageHeaderCentered from "@/components/page-header/PageHeaderCentered"
import { ShiftPostForm } from "@/components/shiftpostform/ShiftPostForm";
import Navbar from "@/components/navigation/Navbar"

export default function PostShift() {
    return (
        <>
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