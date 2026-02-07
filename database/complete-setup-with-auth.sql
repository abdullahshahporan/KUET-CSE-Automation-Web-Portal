-- ============================================
-- KUET CSE Automation - Complete Database Setup with Authentication
-- ============================================
-- DESIGN PRINCIPLE:
--   profiles = auth only (email, password, role)
--   teachers = all teacher data (name, phone, designation)
--   students = all student data (name, phone, roll, term)
-- ============================================

-- Drop existing tables if they exist (in correct order)
DROP TABLE IF EXISTS public.attendance_records CASCADE;
DROP TABLE IF EXISTS public.exam_scores CASCADE;
DROP TABLE IF EXISTS public.exams CASCADE;
DROP TABLE IF EXISTS public.enrollments CASCADE;
DROP TABLE IF EXISTS public.class_sessions CASCADE;
DROP TABLE IF EXISTS public.routine_slots CASCADE;
DROP TABLE IF EXISTS public.course_offerings CASCADE;
DROP TABLE IF EXISTS public.curriculum CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;
DROP TABLE IF EXISTS public.students CASCADE;
DROP TABLE IF EXISTS public.teachers CASCADE;
DROP TABLE IF EXISTS public.admins CASCADE;
DROP TABLE IF EXISTS public.rooms CASCADE;
DROP TABLE IF EXISTS public.notices CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop existing types if they exist
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS teacher_designation CASCADE;
DROP TYPE IF EXISTS attendance_status CASCADE;
DROP TYPE IF EXISTS exam_type CASCADE;

-- ============================================
-- ENUM TYPES
-- ============================================

CREATE TYPE user_role AS ENUM ('ADMIN', 'TEACHER', 'STUDENT');
CREATE TYPE teacher_designation AS ENUM ('PROFESSOR', 'ASSOCIATE_PROFESSOR', 'ASSISTANT_PROFESSOR', 'LECTURER');
CREATE TYPE attendance_status AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED');
CREATE TYPE exam_type AS ENUM ('MIDTERM', 'FINAL', 'QUIZ', 'ASSIGNMENT', 'PROJECT');

-- ============================================
-- CORE TABLES
-- ============================================

-- Profiles: Authentication ONLY (email + password + role)
CREATE TABLE public.profiles (
  user_id uuid NOT NULL DEFAULT gen_random_uuid(),
  role user_role NOT NULL,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  last_login timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (user_id),
  CONSTRAINT profiles_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Admins: System administrators (own data)
CREATE TABLE public.admins (
  user_id uuid NOT NULL,
  admin_uid text NOT NULL DEFAULT ('A-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 10)) UNIQUE,
  full_name text NOT NULL,
  phone text,
  permissions jsonb DEFAULT '{"all": true}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT admins_pkey PRIMARY KEY (user_id),
  CONSTRAINT admins_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE
);

-- Teachers: ALL faculty data lives here
CREATE TABLE public.teachers (
  user_id uuid NOT NULL,
  teacher_uid text NOT NULL DEFAULT ('T-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 10)) UNIQUE,
  full_name text NOT NULL,
  phone text NOT NULL,
  designation teacher_designation NOT NULL DEFAULT 'LECTURER',
  department text DEFAULT 'CSE',
  office_room text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT teachers_pkey PRIMARY KEY (user_id),
  CONSTRAINT teachers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE
);

-- Students: ALL student data lives here
CREATE TABLE public.students (
  user_id uuid NOT NULL,
  roll_no text NOT NULL UNIQUE,
  full_name text NOT NULL,
  phone text NOT NULL,
  term text NOT NULL CHECK (term ~ '^[1-4]-[1-2]$'),
  session text NOT NULL,
  batch text,
  section text,
  cgpa numeric(3,2) DEFAULT 0.00,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT students_pkey PRIMARY KEY (user_id),
  CONSTRAINT students_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  CONSTRAINT students_cgpa_check CHECK (cgpa >= 0 AND cgpa <= 4.00)
);

-- Rooms: Classrooms and labs
CREATE TABLE public.rooms (
  room_number text NOT NULL,
  building_name text,
  capacity integer CHECK (capacity > 0),
  room_type text, -- e.g., "Classroom", "Lab", "Seminar Room"
  facilities text[], -- Array of facilities
  is_active boolean NOT NULL DEFAULT true,
  CONSTRAINT rooms_pkey PRIMARY KEY (room_number)
);

-- Courses: Course catalog
CREATE TABLE public.courses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE CHECK (code = upper(code)),
  title text NOT NULL,
  credit numeric(3,2) NOT NULL CHECK (credit > 0),
  course_type text DEFAULT 'Theory', -- Theory, Lab, Thesis, Project
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT courses_pkey PRIMARY KEY (id)
);

-- Curriculum: Course structure by term
CREATE TABLE public.curriculum (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  term text NOT NULL CHECK (term ~ '^[1-4]-[1-2]$'),
  course_id uuid NOT NULL,
  syllabus_year text DEFAULT '2024',
  is_elective boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT curriculum_pkey PRIMARY KEY (id),
  CONSTRAINT curriculum_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE,
  CONSTRAINT curriculum_unique_term_course UNIQUE (term, course_id, syllabus_year)
);

-- Course Offerings: Active courses in a term
CREATE TABLE public.course_offerings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL,
  teacher_user_id uuid NOT NULL,
  term text NOT NULL CHECK (term ~ '^[1-4]-[1-2]$'),
  session text NOT NULL,
  batch text,
  section text,
  academic_year text, -- e.g., "2024-2025"
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT course_offerings_pkey PRIMARY KEY (id),
  CONSTRAINT course_offerings_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id),
  CONSTRAINT course_offerings_teacher_user_id_fkey FOREIGN KEY (teacher_user_id) REFERENCES public.teachers(user_id)
);

-- Enrollments: Student course registrations
CREATE TABLE public.enrollments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  offering_id uuid NOT NULL,
  student_user_id uuid NOT NULL,
  enrollment_status text DEFAULT 'ENROLLED', -- ENROLLED, DROPPED, COMPLETED
  enrolled_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT enrollments_pkey PRIMARY KEY (id),
  CONSTRAINT enrollments_offering_id_fkey FOREIGN KEY (offering_id) REFERENCES public.course_offerings(id) ON DELETE CASCADE,
  CONSTRAINT enrollments_student_user_id_fkey FOREIGN KEY (student_user_id) REFERENCES public.students(user_id) ON DELETE CASCADE,
  CONSTRAINT enrollments_unique_student_offering UNIQUE (offering_id, student_user_id)
);

-- Routine Slots: Weekly class schedule
CREATE TABLE public.routine_slots (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  offering_id uuid NOT NULL,
  room_number text NOT NULL,
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 6=Saturday
  start_time time without time zone NOT NULL,
  end_time time without time zone NOT NULL,
  rrule text, -- iCalendar recurrence rule for advanced scheduling
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT routine_slots_pkey PRIMARY KEY (id),
  CONSTRAINT routine_slots_offering_id_fkey FOREIGN KEY (offering_id) REFERENCES public.course_offerings(id) ON DELETE CASCADE,
  CONSTRAINT routine_slots_room_number_fkey FOREIGN KEY (room_number) REFERENCES public.rooms(room_number),
  CONSTRAINT routine_slots_time_check CHECK (end_time > start_time)
);

-- Class Sessions: Individual class instances
CREATE TABLE public.class_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  offering_id uuid NOT NULL,
  room_number text,
  starts_at timestamp with time zone NOT NULL,
  ends_at timestamp with time zone NOT NULL,
  topic text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT class_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT class_sessions_offering_id_fkey FOREIGN KEY (offering_id) REFERENCES public.course_offerings(id) ON DELETE CASCADE,
  CONSTRAINT class_sessions_room_number_fkey FOREIGN KEY (room_number) REFERENCES public.rooms(room_number),
  CONSTRAINT class_sessions_time_check CHECK (ends_at > starts_at)
);

-- Attendance Records: Class attendance tracking
CREATE TABLE public.attendance_records (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  enrollment_id uuid NOT NULL,
  status attendance_status NOT NULL,
  marked_by_teacher_user_id uuid,
  remarks text,
  marked_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT attendance_records_pkey PRIMARY KEY (id),
  CONSTRAINT attendance_records_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.class_sessions(id) ON DELETE CASCADE,
  CONSTRAINT attendance_records_enrollment_id_fkey FOREIGN KEY (enrollment_id) REFERENCES public.enrollments(id) ON DELETE CASCADE,
  CONSTRAINT attendance_records_marked_by_teacher_user_id_fkey FOREIGN KEY (marked_by_teacher_user_id) REFERENCES public.teachers(user_id),
  CONSTRAINT attendance_records_unique_session_enrollment UNIQUE (session_id, enrollment_id)
);

-- Exams: Course examinations
CREATE TABLE public.exams (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  offering_id uuid NOT NULL,
  name text NOT NULL,
  exam_type exam_type NOT NULL,
  max_marks numeric NOT NULL CHECK (max_marks > 0),
  exam_date date,
  exam_time time without time zone,
  duration_minutes integer,
  room_numbers text[], -- Array of room numbers where exam is held
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT exams_pkey PRIMARY KEY (id),
  CONSTRAINT exams_offering_id_fkey FOREIGN KEY (offering_id) REFERENCES public.course_offerings(id) ON DELETE CASCADE
);

-- Exam Scores: Student exam results
CREATE TABLE public.exam_scores (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  exam_id uuid NOT NULL,
  enrollment_id uuid NOT NULL,
  obtained_marks numeric NOT NULL CHECK (obtained_marks >= 0),
  remarks text,
  published_at timestamp with time zone,
  CONSTRAINT exam_scores_pkey PRIMARY KEY (id),
  CONSTRAINT exam_scores_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id) ON DELETE CASCADE,
  CONSTRAINT exam_scores_enrollment_id_fkey FOREIGN KEY (enrollment_id) REFERENCES public.enrollments(id) ON DELETE CASCADE,
  CONSTRAINT exam_scores_unique_exam_enrollment UNIQUE (exam_id, enrollment_id)
);

-- Notices: Announcements and notifications
CREATE TABLE public.notices (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text,
  author_user_id uuid,
  target_term text, -- NULL means all terms
  target_session text, -- NULL means all sessions
  target_batch text, -- NULL means all batches
  priority text DEFAULT 'NORMAL', -- HIGH, NORMAL, LOW
  is_published boolean NOT NULL DEFAULT true,
  published_at timestamp with time zone,
  expires_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT notices_pkey PRIMARY KEY (id),
  CONSTRAINT notices_author_user_id_fkey FOREIGN KEY (author_user_id) REFERENCES public.profiles(user_id)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_is_active ON public.profiles(is_active);

CREATE INDEX idx_teachers_teacher_uid ON public.teachers(teacher_uid);
CREATE INDEX idx_teachers_full_name ON public.teachers(full_name);

CREATE INDEX idx_students_roll_no ON public.students(roll_no);
CREATE INDEX idx_students_full_name ON public.students(full_name);
CREATE INDEX idx_students_session_term ON public.students(session, term);

CREATE INDEX idx_course_offerings_teacher ON public.course_offerings(teacher_user_id);
CREATE INDEX idx_course_offerings_course ON public.course_offerings(course_id);
CREATE INDEX idx_course_offerings_active ON public.course_offerings(is_active);

CREATE INDEX idx_enrollments_student ON public.enrollments(student_user_id);
CREATE INDEX idx_enrollments_offering ON public.enrollments(offering_id);

CREATE INDEX idx_attendance_session ON public.attendance_records(session_id);
CREATE INDEX idx_attendance_enrollment ON public.attendance_records(enrollment_id);

CREATE INDEX idx_exam_scores_exam ON public.exam_scores(exam_id);
CREATE INDEX idx_exam_scores_enrollment ON public.exam_scores(enrollment_id);

CREATE INDEX idx_notices_published ON public.notices(is_published, published_at);
CREATE INDEX idx_notices_target ON public.notices(target_term, target_session, target_batch);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON public.admins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON public.teachers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notices_updated_at BEFORE UPDATE ON public.notices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) - DEVELOPMENT MODE
-- ============================================
-- WARNING: These are permissive policies for development.
-- Replace with proper role-based policies for production!

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_offerings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routine_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

-- Allow all operations for development (REMOVE IN PRODUCTION!)
CREATE POLICY "dev_all_profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "dev_all_admins" ON public.admins FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "dev_all_teachers" ON public.teachers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "dev_all_students" ON public.students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "dev_all_rooms" ON public.rooms FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "dev_all_courses" ON public.courses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "dev_all_curriculum" ON public.curriculum FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "dev_all_course_offerings" ON public.course_offerings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "dev_all_enrollments" ON public.enrollments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "dev_all_routine_slots" ON public.routine_slots FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "dev_all_class_sessions" ON public.class_sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "dev_all_attendance_records" ON public.attendance_records FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "dev_all_exams" ON public.exams FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "dev_all_exam_scores" ON public.exam_scores FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "dev_all_notices" ON public.notices FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert sample admin (password: "admin123" - hash properly in production)
INSERT INTO public.profiles (user_id, role, email, password_hash)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'ADMIN', 'admin@cse.kuet.ac.bd', '$2a$10$examplehash');

INSERT INTO public.admins (user_id, admin_uid, full_name, phone)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'A-ADMIN001', 'System Administrator', '+8801700000000');

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Database setup complete!';
  RAISE NOTICE '📊 Total tables created: 15';
  RAISE NOTICE '🔐 profiles = auth only (email, password, role)';
  RAISE NOTICE '👨‍🏫 teachers = all teacher data (name, phone, designation)';
  RAISE NOTICE '🎓 students = all student data (name, phone, roll, term)';
  RAISE NOTICE '⚠️  IMPORTANT: Update RLS policies before production deployment!';
  RAISE NOTICE '🔑 Sample admin created: admin@cse.kuet.ac.bd';
END $$;
