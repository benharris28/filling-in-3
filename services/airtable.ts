import Airtable from "airtable";
import { UploadShift } from "../utils/types";

interface ShiftProps {
  shift: UploadShift;
}



export const findUserByAuth0Id = async (auth0Id: string) => {
  const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  }).base("appHZw8p3zb6QrFz3");

  const usersTable = base("Users");
  const query = await usersTable.select({
    filterByFormula: `{user_id} = '${auth0Id}'`,
    maxRecords: 1,
  }).firstPage();

  if (query.length === 0) {
    throw new Error("User not found");
  }

  return query[0];
};

export async function getShifts() {
  // Initialize the Airtable client with the API key
  const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  }).base("appHZw8p3zb6QrFz3");

  // Select the table and fetch all records
  const records = await base("Shifts")
    .select({
      view: "Grid view",
      filterByFormula: "AND({active} = 'True', {status} = 'Open')",
    })
    .all();

  // Map the records to an array of simplified shift objects
  const shifts = records.map((record) => ({
    id: record.id,
    uuid: record.get("uuid"),
    shift_title: record.get("shift_title"),
    position: record.get("position"),
    clinic_name: record.get("clinic_name"),
    skills_required: record.get("skills_required"),
    city: record.get("city"),
    start_date: record.get("start_date"),
    hours: record.get("hours"),
    total_pay: record.get("total_pay"),
  }));

  console.log(shifts);

  return shifts;
}

export async function addUserToTable(user_id: string, email: string) {
  const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  }).base("appHZw8p3zb6QrFz3");
  // Insert a new record with the provided data
  const records = await base("Users").create([
    {
      fields: {
        user_id,
        email,
      },
    },
  ]);

  // Return the inserted record
  return records[0];
}

export async function addShiftToTable({ shift }: ShiftProps) {
  console.log("addShiftToTable called with shift:", shift);
  const userRecord = await findUserByAuth0Id(shift.user_id);
  const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  }).base("appHZw8p3zb6QrFz3");
  // Insert a new record with the provided data
  const records = await base("Shifts").create([
    {
      fields: {
        uuid: shift.uuid,
        user_id: [userRecord.getId()],
        shift_title: shift.shift_title,
        position: shift.position,
        skills_required: shift.skills_required,
        city: shift.city,
        start_date: shift.start_date,
        hours: shift.hours,
        total_pay: shift.total_pay,
        shift_overview: shift.shift_overview,
      },
    }
    
   
  ],
  function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    if (records) {
    records.forEach(function (record) {
      console.log(record.getId());
    
    });
  }
});
}

  // Return the inserted record
  


export async function getShiftByUuid(uuid: string) {
  // Initialize the Airtable client with the API key
  const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  }).base("appHZw8p3zb6QrFz3");

  // Select the shift record with the specified UUID
  const records = await base("Shifts")
    .select({
      filterByFormula: `{uuid} = '${uuid}'`,
      maxRecords: 1,
    })
    .all();

  // If no record is found, return null
  if (records.length === 0) {
    return null;
  }

  // Map the record to a simplified shift object
  const record = records[0];
  const shifts = records.map((record) => ({
    id: record.id,
    uuid: record.get("uuid") || null,
    shift_title: record.get("shift_title") || null,
    position: record.get("position") || null,
    clinic_name: record.get("clinic_name") || null,
    skills_required: record.get("skills_required") || null,
    city: record.get("city") || null,
    start_date: record.get("start_date") || null,
    hours: record.get("hours") || null,
    total_pay: record.get("total_pay") || null,
    shift_overview: record.get("shift_overview") || null,
    requirements: record.get("requirements") || null,
  }));

  return shifts[0];
}

export async function getShiftsForUser(userId: string) {
  const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  }).base("appHZw8p3zb6QrFz3");

  const filterFormula = `AND({user_id} = '${userId}')`;

  const records = await base("Shifts")
    .select({
      view: "Grid view",
      filterByFormula: filterFormula,
    })
    .all();

  if (records.length === 0) {
    return [{}];
  }

  const shifts = records.map((record) => ({
    id: record.id,
    uuid: record.get("uuid") || null,
    shift_title: record.get("shift_title") || null,
    position: record.get("position") || null,
    clinic_name: record.get("clinic_name") || null,
    skills_required: record.get("skills_required") || null,
    city: record.get("city") || null,
    start_date: record.get("start_date") || null,
    hours: record.get("hours") || null,
    total_pay: record.get("total_pay") || null,
    shift_overview: record.get("shift_overview") || null,
    requirements: record.get("requirements") || null,
  }));

  return shifts;
}

export async function getUserData(userId: string) {
  const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  }).base("appHZw8p3zb6QrFz3");

  const filterFormula = `AND({user_id} = '${userId}')`;

  const records = await base("Users")
    .select({
      view: "Grid view",
      filterByFormula: filterFormula,
      maxRecords: 1,
    })
    .all();

  if (records.length === 0) {
    return null;
  }

  const record = records[0];
  const userData = {
    id: record.id,
    user_id: record.get("user_id"),
    first_name: record.get("first_name"),
    last_name: record.get("last_name"),
    status: record.get("status"),
    user_type: record.get("user_type"),
  };

  return userData;
}

export async function getApplicationsForUser(userId: string) {
  const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  }).base("appHZw8p3zb6QrFz3");

  const filterFormula = `AND({applicant_id} = '${userId}')`;

  const records = await base("Applications")
    .select({
      view: "Grid view",
      filterByFormula: filterFormula,
    })
    .all();

  const applications = records.map((record) => ({
    id: record.id,
    shift_uuid: record.get("shift_uuid"),
    applicant_id: record.get("applicant_id"),
    application_date: record.get("application_date"),
    status: record.get("status"),
  }));

  return applications;
}
