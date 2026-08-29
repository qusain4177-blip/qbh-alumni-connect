import type { Database } from "@/integrations/supabase/types";

export type AlumniRecord = Database["public"]["Tables"]["profiles"]["Row"];

const names = [
  "Zafaryab Haider", "Ayesha Khan", "Bilal Ahmed", "Hira Malik", "Omar Farooq",
  "Sara Iqbal", "Hamza Siddiqui", "Mariam Raza", "Usman Tariq", "Noor Fatima",
  "Danish Ali", "Laiba Hassan", "Saad Qureshi", "Anam Shah", "Waleed Javed",
  "Mehwish Aslam", "Rehan Siddiqui", "Iqra Nadeem", "Talha Mir", "Mahnoor Zaidi",
  "Adnan Sheikh", "Eman Arif", "Fahad Yousuf", "Sana Khalid",
];

const locations = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar", "Multan"];
const disciplines = ["Engineering", "Computer Science", "Business Administration", "Medicine", "Architecture", "Education"];

export const ALUMNI_MOCK_DATA: AlumniRecord[] = names.map((full_name, index) => ({
  id: full_name === "Zafaryab Haider" ? "zafaryab-haider" : `mock-alumni-${index + 1}`,
  alumni_id: `QBH-${2021 - (index % 10)}-${String(index + 1).padStart(3, "0")}`,
  full_name,
  avatar_url: full_name === "Zafaryab Haider" ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KRUseq1ESk9X1e52mVUApJF03hujLv.png" : null,
  gender: index % 2 === 0 ? "Male" : "Female",
  graduation_year: 2015 + (index % 10),
  matric_stream: disciplines[index % disciplines.length],
  roll_number: null,
  country: "Pakistan",
  city: locations[index % locations.length],
  email: `${full_name.toLowerCase().replaceAll(" ", ".")}@alumni.example.com`,
  phone: null,
  father_name: null,
  date_of_birth: null,
  marital_status: null,
  higher_education: `Completed ${disciplines[index % disciplines.length]} studies`,
  university: "Qurtuba Higher Education Alumni Network",
  degree_program: disciplines[index % disciplines.length],
  company: null,
  profession: disciplines[index % disciplines.length],
  linkedin_url: null,
  website_url: null,
  bio: "A proud member of the Qurtuba alumni community.",
  status: "approved",
  created_at: new Date(2024, 0, index + 1).toISOString(),
  updated_at: new Date(2024, 0, index + 1).toISOString(),
}));

export const ZAFARYAB_PROFILE = ALUMNI_MOCK_DATA[0];
