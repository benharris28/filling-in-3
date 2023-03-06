import Airtable from "airtable";

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
    total_pay: record.get("total_pay")
  }));

  console.log(shifts)
  

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
        email
      },
    },
  ]);

  // Return the inserted record
  return records[0];
}


export async function getShiftByUuid(uuid: string) {
  // Initialize the Airtable client with the API key
  const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  }).base("appHZw8p3zb6QrFz3");

  // Select the shift record with the specified UUID
  const records = await base('Shifts')
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
  const shift = {
    id: record.id,
    uuid: record.get('uuid'),
    shift_title: record.get('shift_title'),
    position: record.get('position'),
    clinic_name: record.get('clinic_name'),
    skills_required: record.get('skills_required'),
    city: record.get('city'),
    start_date: record.get('start_date'),
    hours: record.get('hours'),
    total_pay: record.get('total_pay'),
    shift_overview: record.get('shift_overview'),
    requirements: record.get('requirements')
  };

  return shift;
}