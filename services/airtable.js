import Airtable from "airtable";

export async function getShifts() {
  // Initialize the Airtable client with the API key
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base("appHZw8p3zb6QrFz3");

  // Select the table and fetch all records
  const records = await base("Shifts")
    .select({
      view: "Grid view",
      filterByFormula: "AND({active} = 'True', {status} = 'open')",
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
    start_date: record.get("start_date")
  }));

  console.log(shifts)

  return shifts;
}