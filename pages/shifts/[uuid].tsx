import { useRouter } from 'next/router';
import { getShiftByUuid, getShifts } from '@/services/airtable';
import { useAirtableUser } from '@/contexts/UserDataContext';
import PageHeader from "@/components/shiftpage/PageHeader"
import ShiftPageBody from "@/components/shiftpage/ShiftPageBody"
import CallToAction from "@/components/shiftpage/CallToAction"
import Navbar from '@/components/navigation/Navbar'
import { ApplicationReady } from '../../utils/types';

//Pull data in here
interface Shift {
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

    const canApply =
      airtableUser &&
    airtableUser.status === 'Approved' &&
    airtableUser.user_type === 'Practitioner';

    console.log(canApply)
    console.log(airtableUser)
    
    
    if (router.isFallback) {
        return <div>Loading....</div>;
      }

    console.log(shift)

    return (
        <div>
            <Navbar />
            <PageHeader shift={shift} />
            <ShiftPageBody shift={shift} />
            <CallToAction can_apply={canApply} shift={shift} />
        </div>
    )
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
      fallback: 'blocking',
    };
  }