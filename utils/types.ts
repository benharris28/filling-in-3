export interface UserData {
    user_id: string;
    first_name: string;
    last_name: string;
    status: string;
    user_type: string;
  }

  export interface Shift {
    id: string;
    uuid: string | null;
    shift_title: string | null;
    position: string | null;
    clinic_name: string | null;
    skills_required: string[] | null;
    city: string | null;
    start_date: string | null;
    hours: number | null;
    total_pay: number | null;
    shift_overview: string | null;
    requirements: string | null;
  };
  
  export interface Application {
    id: string;
    shift_uuid: string;
    applicant_id: string;
    application_date: string;
    status: string;
  }