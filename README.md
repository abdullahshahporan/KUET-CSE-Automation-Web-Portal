<div align="center">

<img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
<img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>

<br/><br/>

# 🎓 KUET CSE Automation Web Portal

### **A full-featured, role-based academic management system for the CSE Department of Khulna University of Engineering & Technology (KUET)**

[![GitHub Stars](https://img.shields.io/github/stars/abdullahshahporan/KUET-CSE-Automation-Web-Portal?style=social)](https://github.com/abdullahshahporan/KUET-CSE-Automation-Web-Portal)
[![GitHub Forks](https://img.shields.io/github/forks/abdullahshahporan/KUET-CSE-Automation-Web-Portal?style=social)](https://github.com/abdullahshahporan/KUET-CSE-Automation-Web-Portal/fork)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Key Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [API Reference](#-api-reference) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

The **KUET CSE Automation Web Portal** is the administrative backbone of the KUET CSE department's digital ecosystem. Built with **Next.js 15 App Router** and **Supabase**, it provides three distinct role-based interfaces — **Admin**, **Teacher**, and **Student** — on a single, unified platform.

The portal connects directly to the same PostgreSQL database as the companion Flutter mobile app, ensuring data consistency across every touchpoint: from room booking and schedule management to geo-attendance, exam results, term upgrades, and push notifications.

> 📺 **TV Display Mode:** The portal also ships with a **TV Display mode** — a real-time, full-screen room schedule displayed on department monitors — and a standalone **Electron-based TV Player app** for dedicated display hardware.

---

## ⚡ Quick Demo & Visuals

Here is a quick walkthrough of the web portal showing the main interface, animations, and the interactive features running locally:

<div align="center">
  <img src="public/assets/landing_page_walkthrough.webp" alt="Portal Walkthrough Demo" width="90%" style="border-radius: 8px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);" />
</div>

<br/>

### 📸 Portal Screenshots

<div align="center">
  <table border="0">
    <tr>
      <td align="center"><strong>🏠 Public Landing Page</strong></td>
      <td align="center"><strong>🔐 Sign In Portal</strong></td>
    </tr>
    <tr>
      <td><img src="public/assets/landing_page.png" alt="Landing Page" width="100%" style="border-radius: 6px; border: 1px solid #ddd;" /></td>
      <td><img src="public/assets/signin_page.png" alt="Sign In Page" width="100%" style="border-radius: 6px; border: 1px solid #ddd;" /></td>
    </tr>
  </table>
</div>

---

## ✨ Features

### 🖥 Public Website

| Module | Highlights |
|---|---|
| **Home / Landing** | Hero section with department introduction and CMS-driven content |
| **About** | Department history, vision, and mission |
| **Faculty Directory** | Browse all faculty with interactive profile cards |
| **Programs** | Offered degree programs with details |
| **Research** | Research groups and publications |
| **Gallery** | Department photo gallery |
| **News & Notices** | Latest news and public announcements |
| **Contact** | Department contact information |

---

### 🔐 Authentication & Access Control

- Email and password sign-in with **bcrypt** password hashing  
- Role-based dashboards: **Admin**, **Teacher**, **Student**  
- Protected routes with server-side session validation  
- Secure sign-up with email uniqueness checks  

---

### 👨‍💼 Admin Portal

<details>
<summary><strong>👨‍🎓 Student Management</strong></summary>

- Add individual students or bulk-import via CSV  
- View and edit student profiles (roll number, batch, year, term, section)  
- Manage CR (Class Representative) designations  
- Track CGPA and academic standing  

</details>

<details>
<summary><strong>👨‍🏫 Faculty Management</strong></summary>

- Add teachers with designation, employee ID, and office room  
- View and edit teacher profiles  
- Department-wise faculty listing  
- Leave management records  

</details>

<details>
<summary><strong>📚 Course & Curriculum Management</strong></summary>

- Create and manage the course catalog (code, title, credits, type)  
- Build 4-year curriculum by year and term  
- Manage course offerings: assign courses to teachers per term/session  
- Optional course allocation with student selection workflow  

</details>

<details>
<summary><strong>🗓 Class Routine</strong></summary>

- Build the weekly class routine using a visual period grid  
- Assign rooms, teachers, and sections per slot  
- Automatic conflict detection: no double-booking of rooms or teachers  
- Combined lab-slot support (multiple teachers, merged view)  
- Export routine as PDF  

</details>

<details>
<summary><strong>🏢 Room Allocation & Management</strong></summary>

- CRUD operations on the full room inventory  
- Room attributes: building, capacity, type (theory / lab / seminar), facilities  
- GPS coordinate entry per room (for geo-attendance radius calculation)  
- Active / inactive room toggle  
- Teacher ad-hoc room booking review  
- CR student room request processing  

</details>

<details>
<summary><strong>📝 Examination Management</strong></summary>

- Schedule exams: type (Midterm / Final / Quiz), course, date, time, room  
- Manage exam results: enter and publish marks  
- Multi-question / multi-component score breakdown  

</details>

<details>
<summary><strong>📢 Notice Board</strong></summary>

- Create targeted department-wide notices  
- Priority levels: Normal, Important, Urgent  
- Term / batch / session targeting  
- Expiration date management  
- Publish / unpublish control  

</details>

<details>
<summary><strong>🔄 Term Upgrade</strong></summary>

- Review student term-upgrade requests  
- Batch approve or reject with remarks  
- Automated rollover to next term upon approval  

</details>

<details>
<summary><strong>🌐 Website CMS</strong></summary>

- Manage all public-facing content through an admin CMS  
- Gallery uploads, news posts, faculty feature sections  
- OCR-powered image-to-text for scanned document uploads  

</details>

---

### 👨‍🏫 Teacher Portal

<details>
<summary><strong>📍 Geo-Attendance Management</strong></summary>

- Open a live geo-attendance room with one click  
- Auto-closes previous active sessions for the same course offering  
- Real-time list of students who have submitted attendance  
- Close sessions manually or leave them to auto-expire  

</details>

<details>
<summary><strong>📅 Schedule View</strong></summary>

- Personal weekly timetable pulled from routine slots  
- Today's classes highlighted  
- Room and time details per slot  

</details>

<details>
<summary><strong>📊 Attendance Records</strong></summary>

- View course-wise and date-wise attendance summaries  
- Per-student attendance breakdown  

</details>

<details>
<summary><strong>📢 Announcements</strong></summary>

- Create course-specific or department-wide announcements  
- Push notification delivery to enrolled students via server-side FCM  

</details>

---

### 👨‍🎓 Student Portal

<details>
<summary><strong>📍 Geo-Attendance Submission</strong></summary>

- View currently open attendance sessions filtered by term and section  
- Submit GPS-verified attendance (Haversine distance ≤ 30 m threshold)  
- Duplicate-submission prevention with real-time status  

</details>

<details>
<summary><strong>📅 Personal Schedule</strong></summary>

- Course-wise class timetable  
- Upcoming exam schedule with countdown  

</details>

<details>
<summary><strong>📚 Curriculum & Results</strong></summary>

- Browse the complete 4-year curriculum  
- View published exam results and grade breakdown  

</details>

<details>
<summary><strong>🏫 CR Room Requests</strong></summary>

- Class Representatives submit room booking requests  
- FCFS auto-approval with live conflict checking  
- Period-based and custom break-period support  

</details>

---

### 📺 TV Display Mode

- Real-time full-screen room schedule for department monitors  
- Displays today's approved bookings, routine slots, and CR allocations  
- Auto-refreshes on schedule changes via Supabase Realtime  
- Available as a standalone **Electron desktop app** (`tv-player-app/`)  

---

### 🔔 Notification Pipeline

| Channel | Mechanism |
|---|---|
| **In-app inbox** | `notifications` table with Supabase Realtime |
| **Push (closed app)** | FCM HTTP v1 via `notification_push_outbox` |
| **Background dispatch** | Immediate server dispatch with Supabase Edge Function fallback |
| **Target types** | `COURSE`, `YEAR_TERM`, `SECTION`, `TEACHER`, `USER` |

---

## 🛠 Tech Stack

### Frontend

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3.4 |
| **Animations** | Framer Motion 12 + GSAP 3 |
| **Icons** | Lucide React |
| **3D / WebGL** | OGL |

### Backend & Data

| Layer | Technology |
|---|---|
| **Runtime** | Node.js (Next.js API Routes) |
| **Database** | PostgreSQL via Supabase |
| **ORM / Client** | `@supabase/supabase-js` |
| **Auth** | bcryptjs |
| **File parsing** | PapaParse (CSV), Mammoth (DOCX), Tesseract OCR |

### Infrastructure & Tooling

| Layer | Technology |
|---|---|
| **Deployment** | Vercel (serverless) |
| **Analytics** | Vercel Analytics |
| **PDF Generation** | jsPDF + jsPDF-AutoTable |
| **Image Processing** | Sharp |
| **Linting** | ESLint + TypeScript ESLint |
| **CSS Processing** | PostCSS + Autoprefixer |

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| **Node.js** | 18 or higher |
| **npm** | 9 or higher |
| **Git** | Latest |
| **Supabase account** | [supabase.com](https://supabase.com) |

### 1 — Clone the Repository

```bash
git clone https://github.com/abdullahshahporan/KUET-CSE-Automation-Web-Portal.git
cd KUET-CSE-Automation-Web-Portal
```

### 2 — Install Dependencies

```bash
npm install
```

### 3 — Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# ── Supabase ──────────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# ── Application ───────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
AUTH_SESSION_SECRET=generate_a_long_random_secret
NODE_ENV=development

# ── Push Notifications (FCM HTTP v1) ──────────────────────────────
FCM_PROJECT_ID=your_firebase_project_id
FCM_CLIENT_EMAIL=your_firebase_service_account_email
FCM_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
NOTIFICATION_DISPATCH_KEY=optional_shared_secret
```

> ⚠️ **The `SUPABASE_SERVICE_ROLE_KEY` has elevated privileges. Never expose it in client-side code.**

### 4 — Set Up the Database

In your Supabase SQL Editor, run the schema files **in this order**:

```bash
# 1. Main schema
database/main_db.sql

# 2. CMS table
database/cms_table.sql

# 3. Incremental migrations
supabase_migration_20260313_teacher_room_allocation.sql
supabase_migration_20260316_room_booking_web_notification.sql
supabase_migration_20260327_exam_notification_trigger.sql
supabase_migration_20260327_exam_type_to_text.sql
supabase_migration_20260407_rooms_coordinates.sql
supabase_migration_20260417_fcm_notifications_roles.sql
```

You can also review `database_schema.sql` for the complete consolidated reference.

If you need to create the first web admin account after migrating, update and run:

```bash
supabase_bootstrap_first_admin.sql
```

### 5 — Deploy the Push Edge Function

Deploy the Supabase Edge Function after setting the project secrets:

```bash
supabase login
supabase link --project-ref your_project_ref
supabase functions deploy send-push-notification
```

Required function secrets:

```bash
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
FCM_PROJECT_ID
FCM_CLIENT_EMAIL
FCM_PRIVATE_KEY
```

> If mobile clients will invoke dispatch directly, leave `NOTIFICATION_DISPATCH_KEY` unset until you move that call behind a trusted backend.

### 6 — Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start development server (Next.js fast refresh)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

---

## 📁 Project Structure

```
kuet-cse-automation-web/
│
├── database/
│   ├── main_db.sql                  ← Full PostgreSQL schema
│   └── cms_table.sql                ← CMS content tables
│
├── public/                          ← Static assets & Screenshots
│   └── assets/                      ← README demo screenshots & walkthrough
│
├── src/
│   ├── app/                         ← Next.js App Router
│   │   ├── layout.tsx               ← Root layout (fonts, providers)
│   │   ├── page.tsx                 ← Public landing page
│   │   ├── globals.css
│   │   ├── about/ │ contact/ │ faculty/ │ gallery/
│   │   ├── news/ │ notices/ │ programs/ │ research/
│   │   ├── auth/                    ← Sign In / Sign Up pages
│   │   ├── dashboard/               ← Role-based dashboard shell
│   │   ├── tv-display/              ← Public TV schedule page
│   │   └── api/                     ← API route handlers
│   │       ├── auth/
│   │       ├── courses/
│   │       ├── course-offerings/
│   │       ├── cr-room-requests/
│   │       ├── exams/
│   │       ├── geo-room-locations/
│   │       ├── notifications/
│   │       ├── optional-course-assignments/
│   │       ├── rooms/
│   │       ├── routine-slots/
│   │       ├── student/             ← Student-facing endpoints
│   │       ├── students/
│   │       ├── teacher-portal/      ← Teacher-facing endpoints
│   │       ├── teachers/
│   │       ├── term-upgrades/
│   │       └── upload/
│   │
│   ├── Auth/                        ← Auth UI components
│   │   ├── AuthCard.tsx
│   │   ├── SignIn.tsx
│   │   └── SignUp.tsx
│   │
│   ├── components/                  ← Reusable UI components
│   │   ├── ui/                      ← Primitives (Button, Card, Modal…)
│   │   ├── HeroLanding.tsx
│   │   ├── Sidebar.tsx
│   │   └── ThemeToggle.tsx
│   │
│   ├── contexts/                    ← React context providers
│   │
│   ├── modules/                     ← Feature modules
│   │   ├── AddFaculty/
│   │   ├── AddStudent/
│   │   ├── ClassRoutine/            ← Routine builder + conflict checker
│   │   ├── CourseAllocation/
│   │   ├── CourseInfo/
│   │   ├── CRManagement/            ← CR designation management
│   │   ├── Dashboard/
│   │   ├── ExamSchedule/
│   │   ├── FacultyInfo/
│   │   ├── GeoRoomManagement/       ← Geo-attendance admin view
│   │   ├── OptionalCourseAllocation/
│   │   ├── Result/
│   │   ├── RoomAllocation/
│   │   ├── Schedule/
│   │   ├── Settings/
│   │   ├── StudentInfo/
│   │   ├── TeacherPortal/           ← Geo-attendance teacher UI
│   │   ├── TermUpgrade/
│   │   ├── TVDisplay/               ← Real-time TV schedule view
│   │   └── WebsiteCMS/              ← CMS content manager
│   │
│   ├── services/                    ← Client-side service wrappers
│   │   ├── cmsService.ts
│   │   ├── roomService.ts
│   │   ├── routineService.ts
│   │   ├── studentService.ts
│   │   ├── teacherService.ts
│   │   └── termUpgradeService.ts
│   │
│   ├── lib/
│   │   ├── supabase.ts              ← Supabase client (anon + service)
│   │   ├── notifications.ts         ← Notification helpers
│   │   └── pushDispatch.ts          ← FCM push dispatcher
│   │
│   ├── styles/                      ← Additional global styles
│   │
│   └── types/                       ← TypeScript type definitions
│       ├── index.ts
│       └── cms.ts
│
├── tv-player-app/                   ← Standalone Electron TV player
│   ├── electron/
│   ├── src/
│   └── package.json
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── supabase_bootstrap_first_admin.sql
└── package.json
```

---

## 🔌 API Reference

All API routes live under `/src/app/api/`. Each folder maps to a Next.js Route Handler.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signin` | Verify credentials, return user profile |
| `POST` | `/api/auth/signup` | Register new user |

### Scheduling

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/routine-slots` | Fetch weekly routine (by teacher / course / date) |
| `POST` | `/api/routine-slots` | Create slot with conflict check |
| `PATCH` | `/api/routine-slots` | Update slot |
| `DELETE` | `/api/routine-slots` | Remove slot |
| `GET / POST / DELETE` | `/api/rooms` | Room CRUD |
| `GET / POST` | `/api/cr-room-requests` | CR room request submission & listing |
| `PATCH` | `/api/cr-room-requests` | Approve / reject CR request |

### Geo-Attendance

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/teacher-portal/geo-attendance` | Open attendance room (creates class session) |
| `GET` | `/api/teacher-portal/geo-attendance` | List active rooms for teacher |
| `PATCH` | `/api/teacher-portal/geo-attendance` | Close a geo-room |
| `POST` | `/api/student/geo-attendance` | Student submits GPS-verified attendance |
| `GET` | `/api/student/geo-attendance` | List open rooms for student's term |

### Courses & Enrollments

| Method | Endpoint | Description |
|---|---|---|
| `GET / POST / PATCH / DELETE` | `/api/courses` | Course catalog CRUD |
| `GET / POST` | `/api/course-offerings` | Course offering management |
| `GET / POST` | `/api/optional-course-assignments` | Optional course allocation |

### Students & Teachers

| Method | Endpoint | Description |
|---|---|---|
| `GET / POST / PATCH / DELETE` | `/api/students` | Student management |
| `GET / POST / PATCH / DELETE` | `/api/teachers` | Teacher management |
| `POST` | `/api/term-upgrades` | Submit / process term upgrade |

### Notifications

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/notifications/push-dispatch` | Authenticated FCM push dispatch |

---

## 🗄 Database Schema

### User & Profile Tables

| Table | Key Columns |
|---|---|
| `profiles` | `id`, `email`, `password_hash`, `role` (admin/teacher/student) |
| `students` | `user_id`, `roll_number`, `year`, `term`, `section`, `is_cr` |
| `teachers` | `user_id`, `employee_id`, `designation`, `office_room` |
| `admins` | `user_id`, `permissions` |

### Academic Tables

| Table | Key Columns |
|---|---|
| `courses` | `id`, `code`, `title`, `credits`, `course_type` |
| `curriculum` | Maps course → year/term |
| `course_offerings` | `id`, `course_id`, `teacher_user_id`, `term`, `session` |
| `enrollments` | `student_user_id`, `offering_id` |

### Scheduling & Rooms

| Table | Key Columns |
|---|---|
| `rooms` | `room_number`, `building`, `capacity`, `room_type`, `latitude`, `longitude` |
| `routine_slots` | `offering_id`, `room_number`, `day_of_week` (0–4), `start_time`, `end_time` |
| `room_booking_requests` | `teacher_user_id`, `room_number`, `start_period`, `end_period`, `status` |
| `cr_room_requests` | `student_user_id`, `room_number`, `day_of_week`, `start_time`, `end_time`, `status` |

### Attendance

| Table | Key Columns |
|---|---|
| `geo_attendance_rooms` | `offering_id`, `is_active`, `start_time`, `end_time`, `section` |
| `geo_attendance_logs` | `geo_room_id`, `student_user_id`, `latitude`, `longitude`, `distance_meters`, `status` |
| `attendance_records` | `enrollment_id`, `session_id`, `status` |
| `class_sessions` | `offering_id`, `room_number`, `starts_at`, `ends_at` |

### Assessment & Communication

| Table | Key Columns |
|---|---|
| `exams` | `course_id`, `exam_type`, `date`, `room_number` |
| `exam_scores` | `student_user_id`, `exam_id`, `score` |
| `notices` | `title`, `body`, `priority`, `target_term`, `expires_at` |
| `notifications` | `recipient_user_id`, `type`, `payload`, `is_read` |
| `notification_push_outbox` | `notification_id`, `dispatched_at` |

---

## 🎨 UI / UX Highlights

- 📱 **Fully Responsive** — Desktop, tablet, and mobile layouts  
- 🌓 **Dark Mode** — Integrated theme toggle persisted via context  
- ⚡ **Smooth Animations** — Framer Motion page transitions + GSAP scroll effects  
- 🔄 **Real-time Updates** — Supabase Realtime subscriptions in TV Display and notification inbox  
- 📄 **PDF Export** — Class routine and result sheets exportable as PDF  
- 📊 **CSV Import** — Bulk student addition via CSV upload (PapaParse)  
- 🔍 **OCR Support** — Scanned document text extraction (Tesseract via API)  

---

## 🔐 Security

| Measure | Implementation |
|---|---|
| **Password hashing** | bcryptjs (server-side) |
| **Service role isolation** | `SUPABASE_SERVICE_ROLE_KEY` used only in server routes |
| **Row-Level Security** | Supabase RLS policies on all sensitive tables |
| **Input validation** | Schema-level constraints + API-layer checks |
| **XSS protection** | React's built-in escaping + Content Security Policy headers |
| **CSRF protection** | Next.js built-in SameSite cookie handling |
| **Secret management** | All keys in `.env.local` (gitignored) |

---

## 🧪 Testing

```bash
# Lint check
npm run lint

# Production build (catches TypeScript errors)
npm run build
```

---

## 🖥 TV Player App

A standalone **Electron** application that wraps the `/tv-display` route for dedicated department monitors.

```
tv-player-app/
├── electron/               ← Main process (Electron)
├── src/                    ← Renderer (React + Vite)
├── vite.config.ts
└── package.json
```

```bash
cd tv-player-app
npm install
npm run dev         # Development mode
npm run build       # Build distributable
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push the repository to GitHub.  
2. Import the project in [Vercel](https://vercel.com).  
3. Add all environment variables from `.env.local` in the Vercel dashboard.  
4. Deploy — Vercel auto-detects Next.js and configures edge functions.  

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository  
2. **Create a feature branch**  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**  
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push to your fork**  
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** against `master`

### Coding Standards

- Use TypeScript strict mode — avoid `any`  
- Follow the existing module structure (`modules/` for features, `services/` for data-fetching)  
- Use Tailwind utility classes; avoid inline `style` props  
- All API routes must use the **service role client** for write operations  
- Use `await` for all notification calls — never fire-and-forget in serverless handlers  

---

## 🐛 Bug Reports

Found a bug? Please [open an issue](https://github.com/abdullahshahporan/KUET-CSE-Automation-Web-Portal/issues) with:

- Browser and OS version  
- Node.js and npm versions  
- Steps to reproduce  
- Expected vs. actual behaviour  
- Console errors or screenshots  

---

## 📄 Documentation

| Document | Description |
|---|---|
| [AUTHENTICATION-IMPLEMENTATION.md](./AUTHENTICATION-IMPLEMENTATION.md) | Auth flow deep-dive |
| [SETUP-SUPABASE.md](./SETUP-SUPABASE.md) | Supabase project setup guide |
| [REALTIME-NOTIFICATION-RUNBOOK.md](./REALTIME-NOTIFICATION-RUNBOOK.md) | Notification pipeline runbook |
| [FIX-RLS-ERROR.md](./FIX-RLS-ERROR.md) | Common RLS error fixes |
| [FIX-USER-NOT-ALLOWED.md](./FIX-USER-NOT-ALLOWED.md) | Auth permission fixes |
| [SUPABASE-DATE-BASED-MIGRATION.md](./SUPABASE-DATE-BASED-MIGRATION.md) | Migration guide |

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---

## 👥 Authors

**Abdullah Shah Poran** — _Lead Developer_  
CSE Department, Khulna University of Engineering & Technology

> Built with ❤️ for KUET CSE — bridging administration and academics through modern technology.

---

<div align="center">

**[⬆ Back to Top](#-kuet-cse-automation-web-portal)**

</div>
