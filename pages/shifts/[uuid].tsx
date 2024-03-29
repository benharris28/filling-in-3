import { useState } from "react";
import { useRouter } from "next/router";
import { getShiftByUuid, getShifts } from "@/services/airtable";
import { useAirtableUser } from "@/contexts/UserDataContext";
import PageHeader from "@/components/shiftpage/PageHeader";
import ShiftPageBody from "@/components/shiftpage/ShiftPageBody";
import CallToAction from "@/components/shiftpage/CallToAction";
import Navbar from "@/components/navigation/Navbar";
import ApplyModal from "@/components/application/ApplyModal";
import { ApplicationReady } from "../../utils/types";
import { Box } from '@chakra-ui/react';

//Pull data in here
interface Shift {
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
  shift_overview: string;
  requirements: string;
}

interface ShiftProps {
  shift: Shift;
}

export default function ShiftPage({ shift }: ShiftProps) {
  const router = useRouter();
  const { airtableUser } = useAirtableUser();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const canApply =
    airtableUser &&
    airtableUser.status === "Approved" &&
    airtableUser.user_type === "Practitioner";


  if (router.isFallback) {
    return <div>Loading....</div>;
  }


  return (
    <div>
      <Navbar />
      <Box paddingTop="73px">
      <PageHeader shift={shift} />
      <ShiftPageBody shift={shift} />
      <CallToAction can_apply={canApply} shift={shift} onApplyClick={openModal}/>
      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shift_uuid={shift.uuid}
        shift_id={shift.id}
      />
      </Box>
    </div>
  );
}

type Params = {
  params: {
    uuid: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const { uuid } = params;
  const shift = await getShiftByUuid(uuid);

  return {
    props: {
      shift,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const shifts = await getShifts();
  const paths = shifts.map((shift) => ({ params: { uuid: shift.uuid } }));

  return {
    paths,
    fallback: "blocking",
  };
}
