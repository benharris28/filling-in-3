import { Box, SimpleGrid, Link } from "@chakra-ui/react";
import JobCard from "../components/JobCard";
import { getShifts } from "../services/airtable";

interface Shift {
    id: string;
    uuid: string;
    shift_title: string;
    skills_required: string[];
    city: string;
    start_date: string;
    clinic_name: string;
    position: string;
  }
  


export async function getStaticProps() {
  // Fetch job data from Airtable
  const shifts = await getShifts();
  console.log(shifts)

  // Return the jobs as props
  return {
    props: {
      shifts,
    },
  };
}

  

function Jobs({ shifts }: { shifts: Shift[] }) {
  return (
    <Box p="4">
      <SimpleGrid columns={[1, 2, 3]} spacing="4">
        {shifts.map((shift) => (
          <Link key={shift.id} href={`/job/${shift.id}`}>
            <a>
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
            </a>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Jobs;