import { Box, SimpleGrid, Link } from "@chakra-ui/react";
import JobCard from "../components/JobCard";

interface Job {
    id: string;
    title: string;
    description: string;
    skills: string[];
    location: string;
    startDate: string;
    clinic: string;
  }
  
  interface Props {
    jobs: Job[];
  }
  

function Jobs({ jobs }: Props) {
  return (
    <Box p="4">
      <SimpleGrid columns={[1, 2, 3]} spacing="4">
        {jobs.map((job) => (
          <Link key={job.id} href={`/job/${job.id}`}>
            <a>
              <JobCard
                id={job.id}
                title={job.title}
                description={job.description}
                skills={job.skills}
                location={job.location}
                startDate={job.startDate}
                clinic={job.clinic}
              />
            </a>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Jobs;