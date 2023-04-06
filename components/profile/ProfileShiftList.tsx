import { useRef, useLayoutEffect, useState } from 'react';
import { Box, SimpleGrid, Link, useBreakpointValue } from "@chakra-ui/react";
import JobCard from "../jobcard/JobCard";
import { UserData, Shift, Application, Auth0User } from '../../utils/types';

interface UserShiftListProps {
  shifts: Shift[];
}


export default function UserShiftList({ shifts }: UserShiftListProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxHeight, setBoxHeight] = useState('300px');
    console.log(shifts)
    

   

  return (
    <Box p="4" position="relative" height='100%'>
      <SimpleGrid columns={[1]} spacing="2" h="90%">
      {shifts.length > 0 && shifts.map((shift) => (
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