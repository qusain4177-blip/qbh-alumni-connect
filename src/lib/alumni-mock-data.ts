import type { Database } from "@/integrations/supabase/types";

export type AlumniRecord = Database["public"]["Tables"]["alumni"]["Row"];
export type AlumniProfile = AlumniRecord & {
  gender?: string | null;
  work_status?: string | null;
  university?: string | null;
  degree?: string | null;
  job_title?: string | null;
};

export const ALUMNI_MOCK_DATA: AlumniProfile[] = [
  {
    id: "zafaryab-haider",
    alumni_id: "QBH-2021-001",
    full_name: "Zafaryab Haider",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
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
    gender: "Male",
  },
  {
    id: "2", alumni_id: "QBH-2018-002", full_name: "Laila Abidi", gender: "Female",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    graduation_year: 2018, matric_stream: null, roll_number: null, country: "Pakistan", city: "Karachi", email: "abidilaila340@gmail.com", phone: null, father_name: "Iqbal Imam", date_of_birth: "2003-04-12", marital_status: "Single", higher_education: "Under Graduate", company: null, profession: null, linkedin_url: null, website_url: null, bio: "Finding opportunities.", status: "approved", created_at: "2024-01-02T00:00:00.000Z", updated_at: "2024-01-02T00:00:00.000Z", work_status: "Finding Opportunities"
  },
  {
    id: "3", alumni_id: "QBH-2022-003", full_name: "Danish Alvi", gender: "Male", avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80", graduation_year: 2022, matric_stream: null, roll_number: null, country: "Pakistan", city: "Karachi", email: "danish.s3622@gmail.com", phone: null, father_name: "Saleem Alvi", date_of_birth: "2006-03-19", marital_status: "Single", higher_education: "Intermediate", company: null, profession: null, linkedin_url: null, website_url: null, bio: null, status: "approved", created_at: "2024-01-03T00:00:00.000Z", updated_at: "2024-01-03T00:00:00.000Z"
  },
  {
    id: "4", alumni_id: "QBH-2023-004", full_name: "Hiba Zehra", gender: "Female", avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80", graduation_year: 2023, matric_stream: null, roll_number: null, country: "Pakistan", city: "Karachi", email: "hiba.4169@gmail.com", phone: null, father_name: "Syed Gohar Hussain Rizvi", date_of_birth: "2007-10-31", marital_status: "Single", higher_education: "Intermediate Pass", company: null, profession: "Student", linkedin_url: null, website_url: null, bio: null, status: "approved", created_at: "2024-01-04T00:00:00.000Z", updated_at: "2024-01-04T00:00:00.000Z", work_status: "Student"
  },
  {
    id: "5", alumni_id: "QBH-2022-005", full_name: "Syeda Masooma Naqvi", gender: "Female", avatar_url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80", graduation_year: 2022, matric_stream: null, roll_number: null, country: "Pakistan", city: "Karachi", email: "masooma.s3551@gmail.com", phone: null, father_name: "Syed Rizwan Ali Naqvi", date_of_birth: "2006-02-26", marital_status: "Single", higher_education: "Under Graduate", company: null, profession: "Student", linkedin_url: null, website_url: null, bio: null, status: "approved", created_at: "2024-01-05T00:00:00.000Z", updated_at: "2024-01-05T00:00:00.000Z", work_status: "Finding Opportunities"
  },
  {
    id: "6", alumni_id: "QBH-2011-006", full_name: "Syed Mohsin Ali Sherazi", gender: "Male", avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80", graduation_year: 2011, matric_stream: null, roll_number: null, country: "Pakistan", city: "Karachi", email: "s.mohsin.sherazi@gmail.com", phone: null, father_name: "Syed Wasif Hussain Shah", date_of_birth: "1995-09-24", marital_status: "Single", higher_education: "Masters", company: null, profession: "Banker", linkedin_url: null, website_url: null, bio: null, status: "approved", created_at: "2024-01-06T00:00:00.000Z", updated_at: "2024-01-06T00:00:00.000Z", university: "Iqra University", degree: "MBA-Marketing", work_status: "Employed"
  },
  {
    id: "7", alumni_id: "QBH-2021-007", full_name: "Syed Shan e Ali Rizvi", gender: "Male", avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80", graduation_year: 2021, matric_stream: null, roll_number: null, country: "Pakistan", city: "Karachi", email: "shaneali3309@gmail.com", phone: null, father_name: "Syed Ansar Hussain Rizvi", date_of_birth: "2004-10-18", marital_status: "Single", higher_education: "Intermediate / Bachelors in Computer Science", company: null, profession: "Travel and Tours Manager", linkedin_url: null, website_url: null, bio: null, status: "approved", created_at: "2024-01-07T00:00:00.000Z", updated_at: "2024-01-07T00:00:00.000Z", university: "Federal University Gulshan Campus", degree: "Bachelors in Computer Science", work_status: "Work from Home", job_title: "Manager"
  },
];

export const ZAFARYAB_PROFILE = ALUMNI_MOCK_DATA[0];
export const ALUMNI_COUNT = ALUMNI_MOCK_DATA.length;
