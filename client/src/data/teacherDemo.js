/**
 * DEMO DATA for Teacher Dashboard
 * All data here is realistic sample/demo data for faculty workflows.
 */

export const DEMO_TEACHER = {
  id: 'FAC-2026-102',
  name: 'Dr. Robert Hayes',
  title: 'Senior Faculty & HOD',
  employeeId: 'FAC-2026-102',
  department: 'Department of Physics & Sciences',
  email: 'robert.hayes@smartschool.edu',
  phone: '+1 (555) 345-6789',
  avatar: null,
  assignedClasses: ['Grade 11 - Science (Sec A)', 'Grade 12 - Science (Sec B)', 'Grade 10 - Physical Sciences'],
  officeRoom: 'Science Wing · Room 304',
  joinedDate: 'August 2018',
};

export const DEMO_TEACHER_STATS = {
  totalStudents: {
    value: 128,
    label: 'Total Students',
    subtitle: 'Across 3 class sections',
    trend: '+12 enrolled this term',
    trendPositive: true,
  },
  classesToday: {
    value: 4,
    label: "Today's Classes",
    subtitle: '2 Completed · 2 Upcoming',
    trend: 'Next: Grade 11-A at 2:00 PM',
    trendPositive: true,
  },
  attendanceMarked: {
    value: '94.2%',
    label: 'Average Attendance',
    subtitle: '118/128 students present today',
    trend: '+1.5% from last week',
    trendPositive: true,
  },
  pendingGrading: {
    value: 14,
    label: 'Assignments to Grade',
    subtitle: 'Thermodynamics Problem Set',
    trend: '8 graded today',
    trendPositive: true,
  },
};

export const DEMO_TEACHER_CLASSES = [
  {
    id: 'CLS-11A',
    name: 'Grade 11 - Science',
    section: 'Section A',
    subject: 'Physics',
    studentsCount: 42,
    room: 'Lab 2',
    schedule: 'Mon, Wed, Fri · 09:00 AM',
    avgAttendance: 96,
  },
  {
    id: 'CLS-12B',
    name: 'Grade 12 - Science',
    section: 'Section B',
    subject: 'Advanced Physics',
    studentsCount: 38,
    room: 'Room 204',
    schedule: 'Mon, Tue, Thu · 11:30 AM',
    avgAttendance: 92,
  },
  {
    id: 'CLS-10A',
    name: 'Grade 10',
    section: 'Section A',
    subject: 'General Science',
    studentsCount: 48,
    room: 'Room 108',
    schedule: 'Tue, Thu, Fri · 02:00 PM',
    avgAttendance: 94,
  },
];

export const DEMO_TODAY_SCHEDULE = [
  {
    time: '09:00 AM - 10:15 AM',
    class: 'Grade 11 - Science (Sec A)',
    subject: 'Physics · Thermodynamics',
    room: 'Lab 2',
    status: 'Completed',
    attendanceMarked: true,
  },
  {
    time: '11:30 AM - 12:45 PM',
    class: 'Grade 12 - Science (Sec B)',
    subject: 'Advanced Physics · Electromagnetism',
    room: 'Room 204',
    status: 'Completed',
    attendanceMarked: true,
  },
  {
    time: '02:00 PM - 03:15 PM',
    class: 'Grade 11 - Science (Sec A)',
    subject: 'Physics Lab Session',
    room: 'Lab 2',
    status: 'Upcoming',
    attendanceMarked: false,
  },
  {
    time: '03:30 PM - 04:30 PM',
    class: 'Grade 10 (Sec A)',
    subject: 'General Science · Optics Review',
    room: 'Room 108',
    status: 'Upcoming',
    attendanceMarked: false,
  },
];

export const DEMO_STUDENT_ROSTER = [
  { rollNo: '11', name: 'Sophia Bennett', grade: 'Grade 11-A', attendance: 87, status: 'Present' },
  { rollNo: '12', name: 'Marcus Chen', grade: 'Grade 11-A', attendance: 95, status: 'Present' },
  { rollNo: '13', name: 'Aiden Patel', grade: 'Grade 11-A', attendance: 92, status: 'Present' },
  { rollNo: '14', name: 'Emma Wilson', grade: 'Grade 11-A', attendance: 68, status: 'Absent' },
  { rollNo: '15', name: 'Lucas Rossi', grade: 'Grade 11-A', attendance: 82, status: 'Late' },
  { rollNo: '16', name: 'Aria Takahashi', grade: 'Grade 11-A', attendance: 98, status: 'Present' },
  { rollNo: '17', name: 'Liam O’Connor', grade: 'Grade 11-A', attendance: 91, status: 'Present' },
  { rollNo: '18', name: 'Zoe Al-Mansoor', grade: 'Grade 11-A', attendance: 89, status: 'Present' },
];

export const DEMO_PENDING_ASSIGNMENTS = [
  {
    id: 1,
    title: 'Thermodynamics Problem Set',
    class: 'Grade 11 - Science (Sec A)',
    submittedCount: 38,
    totalCount: 42,
    dueDate: '2026-11-21',
    pendingGrading: 14,
  },
  {
    id: 2,
    title: 'Optics Lab Report',
    class: 'Grade 10 (Sec A)',
    submittedCount: 45,
    totalCount: 48,
    dueDate: '2026-11-20',
    pendingGrading: 22,
  },
  {
    id: 3,
    title: 'Electromagnetic Induction Quiz',
    class: 'Grade 12 - Science (Sec B)',
    submittedCount: 38,
    totalCount: 38,
    dueDate: '2026-11-18',
    pendingGrading: 0,
  },
];

export const DEMO_TEACHER_ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Physics Practical Lab Guidelines for Mid-Terms',
    class: 'Grade 11 & 12 Science',
    date: '2026-11-20',
    body: 'Students are required to bring lab records and safety goggles for the upcoming calorimetry session on Friday.',
  },
  {
    id: 2,
    title: 'Extra Tutorial Session on Calculus Applications in Physics',
    class: 'Grade 12 - Science',
    date: '2026-11-19',
    body: 'An optional weekend tutorial will take place this Saturday from 10:00 AM to 12:00 PM in Room 204.',
  },
  {
    id: 3,
    title: 'Science Exhibition Project Submission Deadline',
    class: 'All Assigned Classes',
    date: '2026-11-16',
    body: 'Please finalize team names and project abstracts by 5:00 PM next Monday.',
  },
];
