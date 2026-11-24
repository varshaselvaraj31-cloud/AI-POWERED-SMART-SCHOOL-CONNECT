import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme.js';

// Authentication
import LoginPage from './pages/auth/LoginPage.jsx';
import StudentRegisterPage from './pages/auth/StudentRegisterPage.jsx';
import TeacherRegisterPage from './pages/auth/TeacherRegisterPage.jsx';
import ParentRegisterPage from './pages/auth/ParentRegisterPage.jsx';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx';
import RegisterHubPage from './pages/auth/RegisterHubPage.jsx';

// Student Dashboard Pages
import StudentDashboardPage from './pages/student/StudentDashboardPage.jsx';
import StudentAttendancePage from './pages/student/StudentAttendancePage.jsx';
import StudentAssignmentsPage from './pages/student/StudentAssignmentsPage.jsx';
import StudentTimetablePage from './pages/student/StudentTimetablePage.jsx';
import StudentPerformancePage from './pages/student/StudentPerformancePage.jsx';
import StudentAnnouncementsPage from './pages/student/StudentAnnouncementsPage.jsx';
import StudentProfilePage from './pages/student/StudentProfilePage.jsx';
import StudentTodoPage from './pages/student/StudentTodoPage.jsx';


// Teacher Dashboard Pages
import {
  TeacherDashboardPage,
  TeacherAttendancePage,
  TeacherClassesPage,
  TeacherAssignmentsPage,
  TeacherTimetablePage,
  TeacherAnnouncementsPage,
  TeacherProfilePage,
  TeacherTodoPage,
} from './pages/teacher/index.js';

// Parent Dashboard Pages
import {
  ParentDashboardPage,
  ParentAttendancePage,
  ParentAcademicsPage,
  ParentAssignmentsPage,
  ParentTimetablePage,
  ParentTeachersPage,
  ParentAnnouncementsPage,
  ParentProfilePage,
  ParentTodoPage,
} from './pages/parent/index.js';

// Admin / Owner Dashboard Page
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Role Based Redirect
function HomeRedirect() {
  const token = localStorage.getItem('school_token');

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('school_user'));
  } catch {
    user = null;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const roleRoutes = {
    student: '/student/dashboard',
    teacher: '/teacher/dashboard',
    parent: '/parent/dashboard',
    admin: '/admin/dashboard',
  };

  return (
    <Navigate
      to={roleRoutes[user.role] || '/login'}
      replace
    />
  );
}

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>

          {/* Root Route */}
          <Route path="/" element={<HomeRedirect />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterHubPage />} />
          <Route path="/register/student" element={<StudentRegisterPage />} />
          <Route path="/register/teacher" element={<TeacherRegisterPage />} />
          <Route path="/register/parent" element={<ParentRegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected Student Routes */}
          <Route
            element={<ProtectedRoute allowedRoles={['student']} />}
          >
            <Route
              path="/student/dashboard"
              element={<StudentDashboardPage />}
            />

            <Route
              path="/student/attendance"
              element={<StudentAttendancePage />}
            />

            <Route
              path="/student/assignments"
              element={<StudentAssignmentsPage />}
            />

            <Route
              path="/student/timetable"
              element={<StudentTimetablePage />}
            />

            <Route
              path="/student/performance"
              element={<StudentPerformancePage />}
            />

            <Route
              path="/student/announcements"
              element={<StudentAnnouncementsPage />}
            />

            <Route
              path="/student/profile"
              element={<StudentProfilePage />}
            />

            <Route
              path="/student/todo"
              element={<StudentTodoPage />}
            />
          </Route>

          {/* Protected Teacher Routes */}
          <Route
            element={<ProtectedRoute allowedRoles={['teacher']} />}
          >
            <Route
              path="/teacher/dashboard"
              element={<TeacherDashboardPage />}
            />

            <Route
              path="/teacher/attendance"
              element={<TeacherAttendancePage />}
            />

            <Route
              path="/teacher/classes"
              element={<TeacherClassesPage />}
            />

            <Route
              path="/teacher/assignments"
              element={<TeacherAssignmentsPage />}
            />

            <Route
              path="/teacher/timetable"
              element={<TeacherTimetablePage />}
            />

            <Route
              path="/teacher/announcements"
              element={<TeacherAnnouncementsPage />}
            />

            <Route
              path="/teacher/profile"
              element={<TeacherProfilePage />}
            />

            <Route
              path="/teacher/todo"
              element={<TeacherTodoPage />}
            />
          </Route>

          {/* Protected Parent Routes */}
          <Route
            element={<ProtectedRoute allowedRoles={['parent']} />}
          >
            <Route path="/parent/dashboard" element={<ParentDashboardPage />} />
            <Route path="/parent/attendance" element={<ParentAttendancePage />} />
            <Route path="/parent/academics" element={<ParentAcademicsPage />} />
            <Route path="/parent/assignments" element={<ParentAssignmentsPage />} />
            <Route path="/parent/timetable" element={<ParentTimetablePage />} />
            <Route path="/parent/teachers" element={<ParentTeachersPage />} />
            <Route path="/parent/announcements" element={<ParentAnnouncementsPage />} />
            <Route path="/parent/profile" element={<ParentProfilePage />} />
            <Route path="/parent/todo" element={<ParentTodoPage />} />
          </Route>

          {/* Protected Master Admin / Owner Routes */}
          <Route
            element={<ProtectedRoute allowedRoles={['admin']} />}
          >
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          </Route>

          {/* Catch-all Route */}
          <Route path="*" element={<HomeRedirect />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

