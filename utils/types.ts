
export interface UserData {
    user_id: string;
    first_name: string;
    last_name: string;
    status: string;
    user_type: string;
  }

  export interface ApplicationReady {
    can_apply: boolean;
  }

  export interface AirtableUserData {
    user_id: string | null;
    first_name: string | null;
    last_name: string| null;
    status: string | null;
    user_type: string | null;
    clinic_name: string | null;
    email: string | null;
  }

  export interface UploadShift {
    user_id: string;
    uuid: string;
    shift_title: string;
    position: string;
    clinic_name: string;
    skills_required: string[];
    city: string;
    start_date: string;
    start_time: string;
    hours: number;
    total_pay: number;
    shift_overview: string;
  };


  export interface Shift {
    id: string;
    user_id: string;
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

  export interface Auth0User {
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    locale: string;
    name: string;
    nickname: string;
    picture: string;
    sid: string;
    sub: string;
    updated_at: string;
  };