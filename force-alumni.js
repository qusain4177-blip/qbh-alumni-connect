const url = "https://supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqYmptc3dkdGtveHRqc3RtbWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Nzg3NTAsImV4cCI6MjEwMjM1NDc1MH0.aXieck5VcntAu-G_CwMwmrm_gCJml03ADvfgEOJZ8Iw";

const profileData = {
  name: "Zafaryab haider",
  gender: "Male",
  email: "Zafaryab.s3522@gmail.com",
  batch_matriculation_year: 2021,
  batch: "2021",
  country: "Pakistan",
  father_name: "Muhammad ali",
  date_of_birth: "2005-11-21",
  marital_status: "Single",
  city: "Karachi",
  current_qualification: "bechlors in civil engineering from NED University",
  university: "NED university of engineering and technology",
  program_degree: "Engineering",
  avatar_url: "https://dicebear.com",
  status: "approved" // Live website par profile show karne ke liye
};

fetch(url, {
  method: "POST",
  headers: {
    "apikey": key,
    "Authorization": `Bearer ${key}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
  },
  body: JSON.stringify(profileData)
})
.then(async (res) => {
  const text = await res.text();
  console.log("Database Response:", text);
})
.catch(err => console.error("Database Error:", err));