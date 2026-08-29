import type { Database } from "@/integrations/supabase/types";

export type AlumniRecord = Database["public"]["Tables"]["profiles"]["Row"];

export const ALUMNI_MOCK_DATA: AlumniRecord[] = [
  {
    id: "zafaryab-haider",
    alumni_id: "QBH-2021-001",
    full_name: "Zafaryab Haider",
    avatar_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KRUseq1ESk9X1e52mVUApJF03hujLv.png",
    graduation_year: 2021,
    matric_stream: "Engineering",
    roll_number: null,
    country: "Pakistan",
    city: "Karachi",
    email: "Zafaryab.s3522@gmail.com",
    phone: null,
    father_name: "Muhammad Ali",
    date_of_birth: "2005-11-21",
    marital_status: "Single",
    higher_education: "Doing bachelors in civil engineering from NED University",
    company: null,
    profession: "Civil Engineering Student",
    linkedin_url: null,
    website_url: null,
    bio: "Proud QBH UMBRELLA alumnus pursuing civil engineering at NED University.",
    status: "approved",
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
];

export const ZAFARYAB_PROFILE = ALUMNI_MOCK_DATA[0];
export const ALUMNI_COUNT = ALUMNI_MOCK_DATA.length;
