/*
# Create Default Admin User

1. Purpose
   - Creates the default administrator account in auth.users so the alumni
     portal admin can sign in at /admin/login.
   - Assigns the "admin" role in the user_roles table.

2. Credentials
   - Email: admin@qbhhss.edu.pk
   - Password: QBH-Admin-2026! (hashed with bcrypt, stored in auth.users.encrypted_password)

3. Security
   - Email confirmation is set to true (email_confirmed_at) so login works immediately.
   - The user is inserted only if it does not already exist (idempotent).
   - The admin role is inserted only if it does not already exist.

4. Important Notes
   - This migration is safe to re-run — it uses WHERE NOT EXISTS guards.
   - The password should be changed after first login for production use.
*/

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
)
SELECT
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@qbhhss.edu.pk',
  crypt('QBH-Admin-2026!', gen_salt('bf', 10)),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@qbhhss.edu.pk'
);

INSERT INTO user_roles (user_id, role)
SELECT u.id, 'admin'
FROM auth.users u
WHERE u.email = 'admin@qbhhss.edu.pk'
  AND NOT EXISTS (
    SELECT 1 FROM user_roles ur WHERE ur.user_id = u.id AND ur.role = 'admin'
  );
