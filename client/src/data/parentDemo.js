/**
 * DEMO DATA for Parent Dashboard
 * All data here is realistic demo data for parent monitoring child's academic progress.
 */

export const DEMO_PARENT = {
  id: 'PAR-2026-089',
  name: 'Eleanor Bennett',
  relationship: 'Mother',
  email: 'eleanor.bennett@example.com',
  phone: '+1 (555) 789-0123',
  address: '42 Meadowbrook Lane, Metro City',
  linkedStudent: {
    name: 'Sophia Bennett',
    admissionNumber: 'STU-2026-089',
    rollNumber: '11',
    grade: 'Grade 11 - Science',
    section: 'Section A',
    classTeacher: 'Dr. Robert Hayes',
  },
  joinedDate: 'June 2021',
};

export const DEMO_PARENT_STATS = {
  attendanceRate: {
    value: '87.1%',
    label: "Child's Attendance",
    subtitle: '142 Present · 21 Absent',
    trend: '+2.1% this month',
    trendPositive: true,
  },
  overallGPA: {
    value: '8.4 / 10',
    label: 'Academic GPA',
    subtitle: 'Grade A · Class Rank #7',
    trend: '+0.3 from Mid-Term',
    trendPositive: true,
  },
  pendingHomework: {
    value: 4,
    label: 'Pending Assignments',
    subtitle: '1 Due Today (Physics)',
    trend: '18 Submitted On Time',
    trendPositive: false,
  },
  aiAlertsCount: {
    value: 2,
    label: 'AI Smart Alerts',
    subtitle: '1 Attendance · 1 Milestone',
    trend: 'Active AI Monitoring',
    trendPositive: true,
  },
};

export const DEMO_AI_PARENT_ALERTS = [
  {
    id: 'ALT-1',
    type: 'attendance',
    severity: 'warning',
    title: 'Attendance Alert: Unnotified Absence',
    message: 'Sophia was marked absent for the 08:00 AM Physics Lab on Wednesday. Please confirm or acknowledge this absence.',
    timestamp: 'Yesterday at 09:15 AM',
    actionRequired: true,
  },
  {
    id: 'ALT-2',
    type: 'academic',
    severity: 'success',
    title: 'Academic Milestone: Top 10% in Computer Science',
    message: 'Sophia scored 95/100 in the Unit Assessment, ranking 1st in Section A. Excellent performance noted by Mr. Samuel Lee.',
    timestamp: '2 days ago',
    actionRequired: false,
  },
];

export const DEMO_CHILD_SUBJECTS = [
  { subject: 'Physics', marks: 88, maxMarks: 100, grade: 'A', teacher: 'Dr. Robert Hayes', trend: '+4%' },
  { subject: 'Mathematics', marks: 92, maxMarks: 100, grade: 'A+', teacher: 'Mr. David Okafor', trend: '+6%' },
  { subject: 'Computer Sc.', marks: 95, maxMarks: 100, grade: 'A+', teacher: 'Mr. Samuel Lee', trend: '+8%' },
  { subject: 'Biology', marks: 81, maxMarks: 100, grade: 'A', teacher: 'Dr. Priya Nair', trend: '+1%' },
  { subject: 'English', marks: 85, maxMarks: 100, grade: 'A', teacher: 'Ms. Julia Adams', trend: '+2%' },
  { subject: 'Chemistry', marks: 76, maxMarks: 100, grade: 'B+', teacher: 'Ms. Clara Singh', trend: '-3%' },
];

export const DEMO_TEACHER_DIRECTORY = [
  {
    id: 1,
    name: 'Dr. Robert Hayes',
    role: 'Class Teacher & Physics Faculty',
    email: 'robert.hayes@smartschool.edu',
    phone: '+1 (555) 345-6789',
    officeHours: 'Mon & Wed · 03:30 PM - 04:30 PM',
  },
  {
    id: 2,
    name: 'Mr. David Okafor',
    role: 'Mathematics Faculty',
    email: 'david.okafor@smartschool.edu',
    phone: '+1 (555) 456-7890',
    officeHours: 'Tue & Thu · 02:00 PM - 03:00 PM',
  },
  {
    id: 3,
    name: 'Ms. Clara Singh',
    role: 'Chemistry Faculty',
    email: 'clara.singh@smartschool.edu',
    phone: '+1 (555) 567-8901',
    officeHours: 'Wed & Fri · 01:00 PM - 02:00 PM',
  },
  {
    id: 4,
    name: 'Mr. Samuel Lee',
    role: 'Computer Science Faculty',
    email: 'samuel.lee@smartschool.edu',
    phone: '+1 (555) 678-9012',
    officeHours: 'Mon & Fri · 02:00 PM - 03:00 PM',
  },
];

export const DEMO_CHILD_ATTENDANCE = {
  percentage: 87,
  present: 142,
  absent: 21,
  late: 6,
  total: 163,
  months: [
    { month: 'Aug', present: 24, absent: 2, percentage: 92 },
    { month: 'Sep', present: 22, absent: 4, percentage: 85 },
    { month: 'Oct', present: 25, absent: 1, percentage: 96 },
    { month: 'Nov', present: 18, absent: 7, percentage: 72 },
    { month: 'Dec', present: 14, absent: 2, percentage: 88 },
  ],
  subjects: [
    { subject: 'Physics', pct: 85 },
    { subject: 'Chemistry', pct: 90 },
    { subject: 'Mathematics', pct: 95 },
    { subject: 'Biology', pct: 80 },
    { subject: 'English', pct: 88 },
    { subject: 'Computer Sc.', pct: 93 },
  ],
  recent: [
    { date: 'Wed, 19 Nov', subject: 'Physics Lab', status: 'Absent', note: 'Unnotified · 08:00 AM' },
    { date: 'Tue, 18 Nov', subject: 'Full day', status: 'Present', note: 'On time for all periods' },
    { date: 'Mon, 17 Nov', subject: 'Chemistry', status: 'Late', note: 'Arrived 08:12 AM' },
    { date: 'Fri, 14 Nov', subject: 'Full day', status: 'Present', note: 'On time for all periods' },
    { date: 'Thu, 13 Nov', subject: 'Mathematics', status: 'Present', note: 'On time' },
  ],
};

export const DEMO_CHILD_ASSIGNMENTS = [
  {
    id: 1,
    title: 'Thermodynamics Problem Set',
    subject: 'Physics',
    dueDate: '2026-11-21',
    status: 'pending',
    teacher: 'Dr. Robert Hayes',
  },
  {
    id: 2,
    title: 'Organic Chemistry Lab Report',
    subject: 'Chemistry',
    dueDate: '2026-11-19',
    status: 'overdue',
    teacher: 'Ms. Clara Singh',
  },
  {
    id: 3,
    title: 'Integration Exercises – Ch. 7',
    subject: 'Mathematics',
    dueDate: '2026-11-24',
    status: 'pending',
    teacher: 'Mr. David Okafor',
  },
  {
    id: 4,
    title: 'Essay: Climate & Ecosystems',
    subject: 'Biology',
    dueDate: '2026-11-25',
    status: 'pending',
    teacher: 'Dr. Priya Nair',
  },
  {
    id: 5,
    title: 'Shakespearean Analysis',
    subject: 'English',
    dueDate: '2026-11-15',
    status: 'submitted',
    teacher: 'Ms. Julia Adams',
  },
  {
    id: 6,
    title: 'React App – School Project',
    subject: 'Computer Sc.',
    dueDate: '2026-11-30',
    status: 'pending',
    teacher: 'Mr. Samuel Lee',
  },
];

export const DEMO_CHILD_TODAY = [
  { time: '8:00 AM', subject: 'Mathematics', teacher: 'Mr. Okafor', room: 'Room 14', status: 'Completed' },
  { time: '9:00 AM', subject: 'Computer Sc.', teacher: 'Mr. Lee', room: 'IT Lab', status: 'Completed' },
  { time: '10:30 AM', subject: 'Biology', teacher: 'Dr. Nair', room: 'Lab 3', status: 'In progress' },
  { time: '12:30 PM', subject: 'Physics', teacher: 'Dr. Hayes', room: 'Lab 2', status: 'Upcoming' },
  { time: '2:00 PM', subject: 'English', teacher: 'Ms. Adams', room: 'Room 7', status: 'Upcoming' },
];

export const DEMO_CHILD_TIMETABLE = {
  Monday: [
    { time: '8:00 AM', subject: 'Physics', teacher: 'Dr. Hayes', room: 'Lab 2' },
    { time: '9:00 AM', subject: 'Mathematics', teacher: 'Mr. Okafor', room: 'Room 14' },
    { time: '10:30 AM', subject: 'English', teacher: 'Ms. Adams', room: 'Room 7' },
    { time: '12:30 PM', subject: 'Chemistry', teacher: 'Ms. Singh', room: 'Lab 1' },
    { time: '2:00 PM', subject: 'Computer Sc.', teacher: 'Mr. Lee', room: 'IT Lab' },
  ],
  Tuesday: [
    { time: '8:00 AM', subject: 'Biology', teacher: 'Dr. Nair', room: 'Lab 3' },
    { time: '9:00 AM', subject: 'Physics', teacher: 'Dr. Hayes', room: 'Room 10' },
    { time: '10:30 AM', subject: 'Mathematics', teacher: 'Mr. Okafor', room: 'Room 14' },
    { time: '12:30 PM', subject: 'English', teacher: 'Ms. Adams', room: 'Room 7' },
    { time: '2:00 PM', subject: 'Chemistry', teacher: 'Ms. Singh', room: 'Lab 1' },
  ],
  Wednesday: [
    { time: '8:00 AM', subject: 'Mathematics', teacher: 'Mr. Okafor', room: 'Room 14' },
    { time: '9:00 AM', subject: 'Computer Sc.', teacher: 'Mr. Lee', room: 'IT Lab' },
    { time: '10:30 AM', subject: 'Biology', teacher: 'Dr. Nair', room: 'Lab 3' },
    { time: '12:30 PM', subject: 'Physics', teacher: 'Dr. Hayes', room: 'Lab 2' },
    { time: '2:00 PM', subject: 'English', teacher: 'Ms. Adams', room: 'Room 7' },
  ],
  Thursday: [
    { time: '8:00 AM', subject: 'Chemistry', teacher: 'Ms. Singh', room: 'Lab 1' },
    { time: '9:00 AM', subject: 'Biology', teacher: 'Dr. Nair', room: 'Lab 3' },
    { time: '10:30 AM', subject: 'Physics', teacher: 'Dr. Hayes', room: 'Room 10' },
    { time: '12:30 PM', subject: 'Computer Sc.', teacher: 'Mr. Lee', room: 'IT Lab' },
    { time: '2:00 PM', subject: 'Mathematics', teacher: 'Mr. Okafor', room: 'Room 14' },
  ],
  Friday: [
    { time: '8:00 AM', subject: 'English', teacher: 'Ms. Adams', room: 'Room 7' },
    { time: '9:00 AM', subject: 'Chemistry', teacher: 'Ms. Singh', room: 'Lab 1' },
    { time: '10:30 AM', subject: 'Computer Sc.', teacher: 'Mr. Lee', room: 'IT Lab' },
    { time: '12:30 PM', subject: 'Biology', teacher: 'Dr. Nair', room: 'Lab 3' },
    { time: '2:00 PM', subject: 'Mathematics', teacher: 'Mr. Okafor', room: 'Room 14' },
  ],
};

export const DEMO_PARENT_NOTICES = [
  {
    id: 1,
    title: 'Annual Parent-Teacher Conference Schedule',
    date: '2026-11-20',
    category: 'Meeting',
    body: 'The Term 1 Parent-Teacher Meeting will be held on December 5th from 09:00 AM to 01:00 PM. Slot bookings will open next week.',
  },
  {
    id: 2,
    title: 'Mid-Term Examination Report Cards Release',
    date: '2026-11-18',
    category: 'Academics',
    body: 'Official digital report cards for Grade 11 and 12 will be published on the parent portal on November 28th.',
  },
  {
    id: 3,
    title: 'Winter Science Exhibition & Project Showcase',
    date: '2026-11-15',
    category: 'Event',
    body: 'Parents are cordially invited to witness student science prototypes and AI project exhibits in the main auditorium.',
  },
];
