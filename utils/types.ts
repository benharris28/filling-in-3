export interface UserData {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    status: string;
    user_type: string;
  }

  export interface Shift {
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
  
  export interface Application {
    id: string;
    shift_uuid: string;
    applicant_id: string;
    application_date: string;
    status: string;
  }