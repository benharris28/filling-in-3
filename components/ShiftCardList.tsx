import { Box, SimpleGrid, Link } from "@chakra-ui/react";
import JobCard from "./JobCard";

interface JobsProps {
  shifts: Shift[];
  filters: Filters;
}

export interface Shift {
  id: string;
  uuid: string;
  shift_title: string;
  position: string;
  clinic_name: string;
  skills_required: string[];
  city: string;
  start_date: string;
  hours: number;
  total_pay: number;
}

interface Filters {
  skills: string[];
  role: string;
  brand: string[];
  cities: string[];
  // add more filter types here
}

export default function ShiftCardList({ shifts, filters }: JobsProps) {
  const filteredShifts =
    filters.skills.length > 0 || filters.role || filters.cities.length > 0
      ? shifts.filter((shift) => {
          // Apply filter logic based on the `filters` prop
          return (
            (filters.skills.length === 0 ||
              filters.skills.some((selectedSkill) =>
                shift.skills_required.includes(selectedSkill)
              )) &&
            (!filters.role || shift.position == filters.role) &&
            (!filters.cities.length || filters.cities.includes(shift.city))
            // add more filter types here
          );
        })
      : shifts;

  console.log("filteredShifts", filteredShifts);

  return (
    <Box p="4">
      <SimpleGrid columns={[1]} spacing="2">
        {filteredShifts.map((shift) => (
          <Link key={shift.uuid} href={`/shifts/${shift.uuid}`}>
            <JobCard
              id={shift.id}
              uuid={shift.uuid}
              shift_title={shift.shift_title}
              position={shift.position}
              clinic_name={shift.clinic_name}
              skills_required={shift.skills_required}
              city={shift.city}
              start_date={shift.start_date}
              hours={shift.hours}
              total_pay={shift.total_pay}
            />
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}
