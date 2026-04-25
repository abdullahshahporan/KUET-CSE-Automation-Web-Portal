import { supabase } from '@/lib/supabase';
import { getSupabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabaseAdmin';

type SearchIntent =
  | { type: 'student'; value: string }
  | { type: 'course'; value: string }
  | { type: 'teacher'; value: string }
  | { type: 'room'; value: string }
  | { type: 'tv'; value?: string };

type StudentRow = {
  full_name?: string | null;
  roll_no?: string | null;
  phone?: string | null;
  term?: string | null;
  session?: string | null;
  batch?: string | null;
  section?: string | null;
  cgpa?: number | null;
  profile?: { email?: string | null; is_active?: boolean | null } | null;
};

type TeacherRow = {
  full_name?: string | null;
  teacher_uid?: string | null;
  phone?: string | null;
  designation?: string | null;
  department?: string | null;
  office_room?: string | null;
  is_on_leave?: boolean | null;
  leave_reason?: string | null;
  profile?: { email?: string | null; is_active?: boolean | null } | null;
};

type CourseRow = {
  code?: string | null;
  title?: string | null;
  credit?: number | null;
  course_type?: string | null;
  description?: string | null;
};

type RoomRow = {
  room_number?: string | null;
  building_name?: string | null;
  capacity?: number | null;
  room_type?: string | null;
  facilities?: string[] | null;
  is_active?: boolean | null;
  floor_number?: string | null;
};

export function detectSystemInfoSearch(message: string): SearchIntent | null {
  const text = message.trim();
  const normalized = text.toLowerCase();

  const roll = text.match(/\broll\s*(?:no\.?|number)?\s*[:#-]?\s*(\d{4,})\b/i)?.[1];
  if (roll || (/\bstudent\b/.test(normalized) && /\b\d{4,}\b/.test(normalized))) {
    return { type: 'student', value: roll ?? normalized.match(/\b\d{4,}\b/)?.[0] ?? '' };
  }

  const course = text.match(/\b([A-Z]{2,5})\s*-?\s*(\d{3,4})\b/i);
  if (course && (/\bcourse\b|\bsubject\b|\binfo\b|\bdetails\b/.test(normalized))) {
    return { type: 'course', value: `${course[1].toUpperCase()} ${course[2]}` };
  }

  const room = text.match(/\broom\s*(?:no\.?|number)?\s*[:#-]?\s*([A-Z]?\d{2,4}[A-Z]?)\b/i)?.[1];
  if (room) return { type: 'room', value: room.toUpperCase() };

  if (/\btv\b|\bdisplay\b/.test(normalized) && /\b(info|status|device|devices|list|show)\b/.test(normalized)) {
    const target = text.match(/\bTV\s*-?\s*(\d+)\b/i)?.[1];
    return { type: 'tv', value: target ? `TV${target}` : undefined };
  }

  if (/\bteacher\b|\bfaculty\b|\bprofessor\b|\blecturer\b/.test(normalized)) {
    const cleaned = text
      .replace(/\b(find|show|get|search|info|information|details|about|teacher|faculty|professor|lecturer)\b/gi, '')
      .trim();
    if (cleaned.length >= 2) return { type: 'teacher', value: cleaned };
  }

  return null;
}

export async function answerSystemInfoSearch(intent: SearchIntent): Promise<string> {
  switch (intent.type) {
    case 'student':
      return searchStudent(intent.value);
    case 'course':
      return searchCourse(intent.value);
    case 'teacher':
      return searchTeacher(intent.value);
    case 'room':
      return searchRoom(intent.value);
    case 'tv':
      return searchTv(intent.value);
  }
}

function academicDb() {
  return isSupabaseAdminConfigured() ? getSupabaseAdmin() : supabase;
}

async function searchStudent(rollNo: string): Promise<string> {
  if (!rollNo) return 'Please provide a student roll number.';

  const { data, error } = await academicDb()
    .from('students')
    .select(`
      full_name, roll_no, phone, term, session, batch, section, cgpa,
      profile:profiles(email, is_active)
    `)
    .eq('roll_no', rollNo)
    .maybeSingle();

  if (error) throw error;
  if (!data) return `No student found for Roll No. ${rollNo}.`;

  const student = data as StudentRow;
  return [
    `Student Information`,
    `Roll: ${student.roll_no ?? rollNo}`,
    `Name: ${student.full_name ?? 'N/A'}`,
    `Email: ${student.profile?.email ?? 'N/A'}`,
    `Phone: ${student.phone ?? 'N/A'}`,
    `Term: ${student.term ?? 'N/A'}`,
    `Section: ${student.section ?? 'N/A'}`,
    `Session: ${student.session ?? 'N/A'}`,
    `Batch: ${student.batch ?? 'N/A'}`,
    `CGPA: ${student.cgpa ?? 'N/A'}`,
    `Status: ${student.profile?.is_active === false ? 'Inactive' : 'Active'}`,
  ].join('\n');
}

async function searchCourse(courseCode: string): Promise<string> {
  const normalizedCode = courseCode.replace(/\s+/, ' ').toUpperCase();
  const { data, error } = await academicDb()
    .from('courses')
    .select('code, title, credit, course_type, description')
    .eq('code', normalizedCode)
    .maybeSingle();

  if (error) throw error;
  if (!data) return `No course found for ${normalizedCode}.`;

  const course = data as CourseRow;
  return [
    `Course Information`,
    `Code: ${course.code ?? normalizedCode}`,
    `Title: ${course.title ?? 'N/A'}`,
    `Credit: ${course.credit ?? 'N/A'}`,
    `Type: ${course.course_type ?? 'N/A'}`,
    `Description: ${course.description ?? 'N/A'}`,
  ].join('\n');
}

async function searchTeacher(query: string): Promise<string> {
  const { data, error } = await academicDb()
    .from('teachers')
    .select(`
      full_name, teacher_uid, phone, designation, department, office_room, is_on_leave, leave_reason,
      profile:profiles(email, is_active)
    `)
    .or(`full_name.ilike.%${query}%,teacher_uid.ilike.%${query}%`)
    .limit(5);

  if (error) throw error;
  const teachers = (data ?? []) as TeacherRow[];
  if (teachers.length === 0) return `No teacher found for "${query}".`;

  return [
    `Teacher Search Results`,
    ...teachers.map((teacher, index) => [
      `${index + 1}. ${teacher.full_name ?? 'N/A'}`,
      `   ID: ${teacher.teacher_uid ?? 'N/A'}`,
      `   Designation: ${teacher.designation ?? 'N/A'}`,
      `   Email: ${teacher.profile?.email ?? 'N/A'}`,
      `   Phone: ${teacher.phone ?? 'N/A'}`,
      `   Office: ${teacher.office_room ?? 'N/A'}`,
      `   Status: ${teacher.is_on_leave ? `On leave${teacher.leave_reason ? ` (${teacher.leave_reason})` : ''}` : 'Available'}`,
    ].join('\n')),
  ].join('\n');
}

async function searchRoom(roomNumber: string): Promise<string> {
  const { data, error } = await academicDb()
    .from('rooms')
    .select('room_number, building_name, capacity, room_type, facilities, is_active, floor_number')
    .eq('room_number', roomNumber)
    .maybeSingle();

  if (error) throw error;
  if (!data) return `No room found for Room No. ${roomNumber}.`;

  const room = data as RoomRow;
  return [
    `Room Information`,
    `Room No.: ${room.room_number ?? roomNumber}`,
    `Building: ${room.building_name ?? 'N/A'}`,
    `Floor: ${room.floor_number ?? 'N/A'}`,
    `Type: ${room.room_type ?? 'N/A'}`,
    `Capacity: ${room.capacity ?? 'N/A'}`,
    `Facilities: ${room.facilities?.length ? room.facilities.join(', ') : 'N/A'}`,
    `Status: ${room.is_active === false ? 'Inactive' : 'Active'}`,
  ].join('\n');
}

async function searchTv(target?: string): Promise<string> {
  const { cmsSupabase } = await import('@/services/cmsService');

  let query = cmsSupabase
    .from('cms_tv_devices')
    .select('name, label, location, is_active, show_room_schedule')
    .order('name', { ascending: true });

  if (target) query = query.eq('name', target);

  const { data, error } = await query;
  if (error) throw error;

  const devices = (data ?? []) as Array<{
    name: string;
    label: string | null;
    location: string | null;
    is_active: boolean;
    show_room_schedule: boolean;
  }>;

  if (devices.length === 0) return target ? `No TV device found for ${target}.` : 'No TV devices found.';

  return [
    target ? `${target} Information` : 'TV Device Information',
    ...devices.map((device, index) => [
      `${index + 1}. ${device.name}${device.label ? ` (${device.label})` : ''}`,
      `   Location: ${device.location ?? 'N/A'}`,
      `   Status: ${device.is_active ? 'Active' : 'Inactive'}`,
      `   Room Schedule: ${device.show_room_schedule ? 'Shown' : 'Hidden'}`,
    ].join('\n')),
  ].join('\n');
}
