-- Migration: Insert all 20 alumni profiles
-- Date: August 26, 2026

INSERT INTO public.profiles (id, full_name, email, graduation_year, country, father_name, date_of_birth, marital_status, city, profession, company, higher_education, avatar_url, status, created_at, updated_at) VALUES
-- 1. Abiha
(gen_random_uuid(), 'Abiha Khan', 'abiha@example.com', 2020, 'Pakistan', 'Khan Ali', '2001-03-15'::date, 'Single', 'Lahore', 'Software Developer', 'Tech Startup', 'Computer Science', '/images/abiha-avatar.svg', 'approved', now(), now()),

-- 2. Adeel
(gen_random_uuid(), 'Adeel Malik', 'adeel@example.com', 2019, 'Pakistan', 'Malik Hassan', '2000-06-22'::date, 'Single', 'Karachi', 'Business Analyst', 'Consulting Firm', 'Business Administration', '/images/adeel-avatar.svg', 'approved', now(), now()),

-- 3. Alishbah
(gen_random_uuid(), 'Alishbah Ahmed', 'alishbah@example.com', 2021, 'Pakistan', 'Ahmed Qasim', '2002-09-10'::date, 'Single', 'Islamabad', 'Graphic Designer', 'Digital Agency', 'Graphic Design', '/images/alishbah-avatar.svg', 'approved', now(), now()),

-- 4. Baqir
(gen_random_uuid(), 'Baqir Hassan', 'baqir@example.com', 2020, 'Pakistan', 'Hassan Raza', '2001-01-25'::date, 'Single', 'Rawalpindi', 'Civil Engineer', 'Construction Company', 'Civil Engineering', '/images/baqir-avatar.svg', 'approved', now(), now()),

-- 5. Danish
(gen_random_uuid(), 'Danish Syed', 'danish@example.com', 2018, 'Pakistan', 'Syed Tariq', '1999-11-30'::date, 'Married', 'Multan', 'Project Manager', 'IT Solutions', 'Information Technology', '/images/danish-avatar.svg', 'approved', now(), now()),

-- 6. Fawad
(gen_random_uuid(), 'Fawad Khan', 'fawad@example.com', 2022, 'Pakistan', 'Khan Muhammad', '2003-07-14'::date, 'Single', 'Peshawar', 'Medical Student', 'Peshawar Medical College', 'Medicine', '/images/fawad-avatar.svg', 'approved', now(), now()),

-- 7. Fizza
(gen_random_uuid(), 'Fizza Iqbal', 'fizza@example.com', 2020, 'Pakistan', 'Iqbal Hussain', '2001-05-18'::date, 'Single', 'Lahore', 'Accountant', 'Finance Corporation', 'Accounting', '/images/fizza-avatar.svg', 'approved', now(), now()),

-- 8. Hassan
(gen_random_uuid(), 'Hassan Ali', 'hassan@example.com', 2019, 'Pakistan', 'Ali Raza', '2000-02-28'::date, 'Single', 'Karachi', 'Electrical Engineer', 'Power Distribution', 'Electrical Engineering', '/images/hassan-avatar.svg', 'approved', now(), now()),

-- 9. Hiba
(gen_random_uuid(), 'Hiba Noor', 'hiba@example.com', 2021, 'Pakistan', 'Noor Ahmed', '2002-12-08'::date, 'Single', 'Lahore', 'Marketing Executive', 'E-commerce Platform', 'Business', '/images/hiba-avatar.svg', 'approved', now(), now()),

-- 10. Hooria
(gen_random_uuid(), 'Hooria Fatima', 'hooria@example.com', 2020, 'Pakistan', 'Fatima Khan', '2001-08-19'::date, 'Single', 'Islamabad', 'Data Analyst', 'Research Institute', 'Data Science', '/images/hooria-avatar.svg', 'approved', now(), now()),

-- 11. Laila
(gen_random_uuid(), 'Laila Hassan', 'laila@example.com', 2022, 'Pakistan', 'Hassan Malik', '2003-04-03'::date, 'Single', 'Multan', 'Law Student', 'University of Law', 'Law', '/images/laila-avatar.svg', 'approved', now(), now()),

-- 12. Masooma
(gen_random_uuid(), 'Masooma Ali', 'masooma@example.com', 2019, 'Pakistan', 'Ali Siddiqui', '2000-09-12'::date, 'Married', 'Quetta', 'Teacher', 'Private School', 'Education', '/images/masooma-avatar.svg', 'approved', now(), now()),

-- 13. Mohsin
(gen_random_uuid(), 'Mohsin Ahmed', 'mohsin@example.com', 2021, 'Pakistan', 'Ahmed Hassan', '2002-10-05'::date, 'Single', 'Karachi', 'Mechanical Engineer', 'Manufacturing Sector', 'Mechanical Engineering', '/images/mohsin-avatar.svg', 'approved', now(), now()),

-- 14. Mohsin Sherazi
(gen_random_uuid(), 'Mohsin Sherazi', 'mohsin.sherazi@example.com', 2020, 'Pakistan', 'Sherazi Muhammad', '2001-06-20'::date, 'Single', 'Lahore', 'Backend Developer', 'Web Solutions', 'Computer Science', '/images/mohsin-sherazi-avatar.svg', 'approved', now(), now()),

-- 15. Osaja
(gen_random_uuid(), 'Osaja Khan', 'osaja@example.com', 2021, 'Pakistan', 'Khan Ali', '2002-11-11'::date, 'Single', 'Islamabad', 'Architect', 'Design Studio', 'Architecture', '/images/osaja-avatar.svg', 'approved', now(), now()),

-- 16. Shan
(gen_random_uuid(), 'Shan Ahmed', 'shan@example.com', 2018, 'Pakistan', 'Ahmed Tariq', '1999-03-07'::date, 'Single', 'Peshawar', 'Entrepreneur', 'Tech Startup', 'Computer Science', '/images/shan-avatar.svg', 'approved', now(), now()),

-- 17. Ufaque
(gen_random_uuid(), 'Ufaque Hassan', 'ufaque@example.com', 2019, 'Pakistan', 'Hassan Malik', '2000-07-23'::date, 'Single', 'Karachi', 'HR Manager', 'Corporate Company', 'Human Resources', '/images/ufaque-avatar.svg', 'approved', now(), now()),

-- 18. Wajahat
(gen_random_uuid(), 'Wajahat Ali', 'wajahat@example.com', 2020, 'Pakistan', 'Ali Muhammad', '2001-02-14'::date, 'Single', 'Lahore', 'Financial Analyst', 'Investment Bank', 'Finance', '/images/wajahat-avatar.svg', 'approved', now(), now()),

-- 19. Wania
(gen_random_uuid(), 'Wania Khan', 'wania@example.com', 2021, 'Pakistan', 'Khan Siddiqui', '2002-05-29'::date, 'Single', 'Islamabad', 'Content Writer', 'Media Company', 'Communication', '/images/wania-avatar.svg', 'approved', now(), now()),

-- 20. Zafaryab (already added, but including for completeness)
(gen_random_uuid(), 'Zafaryab Haider', 'Zafaryab.s3522@gmail.com', 2021, 'Pakistan', 'Muhammad Ali', '2005-11-21'::date, 'Single', 'Karachi', 'Bachelors in Civil Engineering', 'NED University of Engineering and Technology', 'Engineering', '/images/zafaryab-avatar.svg', 'approved', now(), now());
