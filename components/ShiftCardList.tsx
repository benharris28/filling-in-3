import { Box, SimpleGrid, Link } from "@chakra-ui/react";
import JobCard from "./JobCard";

interface JobsProps {
  shifts: Shift[];
}

export interface Shift {
  id: string;
  uuid?: string;
  shift_title: string;
  position: string;
  clinic_name: string;
  skills_required: string[];
  city: string;
  start_date: string;
}

export default function ShiftCardList({ shifts }: JobsProps) {
  return (
    <Box p="4">
      <SimpleGrid columns={[1]} spacing="4">
        {shifts.map((shift) => (
          <Link key={shift.id} href={`/job/${shift.id}`}>
          
              <JobCard
                id={shift.id}
                uuid={shift.uuid}
                shift_title={shift.shift_title}
                position={shift.position}
                clinic_name={shift.clinic_name}
                skills_required={shift.skills_required}
                city={shift.city}
                start_date={shift.start_date}
              />
            
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}