import { Box, SimpleGrid, Link } from "@chakra-ui/react";
import JobCard from "./JobCard";

interface JobsProps {
    shifts: Shift[];
    filters: Filters;
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

interface Filters {
  skills: string[];
  role: string;
  brand: string[];
  // add more filter types here
}

export default function ShiftCardList({ shifts, filters }: JobsProps) {

  const filteredShifts = filters.skills.length > 0 ? shifts.filter((shift) => {
    // Apply filter logic based on the `filters` prop
    return (
      filters.skills.some((selectedSkill) => shift.skills_required.includes(selectedSkill)) &&
      (filters.role === "" || shift.position === filters.role)
      // add more filter types here
    );
  }) : shifts;

  console.log('filteredShifts', filteredShifts);

  return (
    <Box p="4">
      <SimpleGrid columns={[1]} spacing="4">
        {filteredShifts.map((shift) => (
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