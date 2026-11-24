import React from 'react';
import { Box, Typography, Grid, Avatar, Chip } from '@mui/material';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import WavingHandIcon from '@mui/icons-material/WavingHand';

import DashboardLayout from '../../layouts/DashboardLayout.jsx';
import StatCard from '../../components/dashboard/StatCard.jsx';
import SubjectPerformanceCard from '../../components/dashboard/SubjectPerformanceCard.jsx';
import AttendanceSummaryCard from '../../components/dashboard/AttendanceSummaryCard.jsx';
import AssignmentsCard from '../../components/dashboard/AssignmentsCard.jsx';
import TimetableCard from '../../components/dashboard/TimetableCard.jsx';
import AnnouncementsCard from '../../components/dashboard/AnnouncementsCard.jsx';
import RecentActivitiesCard from '../../components/dashboard/RecentActivitiesCard.jsx';

import {
  DEMO_STUDENT,
  DEMO_STATS,
} from '../../data/studentDemo.js';
import { getEffectiveStudent, getUserInitials } from '../../utils/authStorage.js';

/**
 * StudentDashboardPage – Main overview dashboard for a logged-in student.
 * Route: /student/dashboard
 * All content uses demo/sample data as clearly labeled.
 */
const StudentDashboardPage = () => {
  const student = getEffectiveStudent(DEMO_STUDENT);
  const initials = getUserInitials(student.name);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <DashboardLayout title="Dashboard">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: 'auto' }}>

        {/* ── Welcome Banner ── */}
        <Box
          sx={{
            mb: 3,
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 3.5,
            background: 'linear-gradient(135deg, #181f2e 0%, #121722 50%, #0a0d14 100%)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(245, 158, 11, 0.1)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: 2.5,
            flexWrap: 'wrap',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background gold glow accent */}
          <Box
            sx={{
              position: 'absolute',
              right: -40,
              top: -40,
              width: 180,
              height: 180,
              borderRadius: '50%',
              bgcolor: 'rgba(245, 158, 11, 0.12)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
            }}
          />

          <Avatar
            sx={{
              width: 60,
              height: 60,
              background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
              color: '#000000',
              border: '2px solid #fbbf24',
              fontSize: '1.3rem',
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {initials}
          </Avatar>

          <Box sx={{ flex: 1, zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <WavingHandIcon sx={{ fontSize: 22, color: '#fbbf24' }} />
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                {greeting()},{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {student.name.split(' ')[0]}
                </Box>
                !
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#d97706', fontWeight: 600 }}>
              {student.grade} · ID {student.id}
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', mt: 0.5, display: 'block' }}>
              Admission ID: {DEMO_STUDENT.admissionNumber}
            </Typography>
          </Box>

          <Chip
            label="⚡ DEMO DATA – Sample Academic Data"
            sx={{
              bgcolor: 'rgba(245, 158, 11, 0.15)',
              color: '#fbbf24',
              fontWeight: 800,
              border: '1px solid rgba(245, 158, 11, 0.35)',
              fontSize: '0.75rem',
            }}
          />
        </Box>

        {/* ── Stat Cards Row ── */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Total Attendance"
              value={`${DEMO_STATS.attendance.percentage}%`}
              subtitle={`${DEMO_STATS.attendance.present} present / ${DEMO_STATS.attendance.absent} absent`}
              icon={<EventAvailableOutlinedIcon />}
              color="#10b981"
              bgColor="#d1fae5"
              trend={DEMO_STATS.attendance.trend}
              trendPositive={DEMO_STATS.attendance.trendPositive}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Academic Performance"
              value={`${DEMO_STATS.performance.gpa}/10`}
              subtitle={`Grade ${DEMO_STATS.performance.grade} · Rank #${DEMO_STATS.performance.rank} of ${DEMO_STATS.performance.totalStudents}`}
              icon={<BarChartOutlinedIcon />}
              color="#6366f1"
              bgColor="#ede9fe"
              trend={DEMO_STATS.performance.trend}
              trendPositive={DEMO_STATS.performance.trendPositive}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Pending Assignments"
              value={DEMO_STATS.assignments.pending}
              subtitle={`${DEMO_STATS.assignments.overdue} overdue · ${DEMO_STATS.assignments.submitted} submitted`}
              icon={<AssignmentOutlinedIcon />}
              color="#f59e0b"
              bgColor="#fef3c7"
              trend={DEMO_STATS.assignments.trend}
              trendPositive={DEMO_STATS.assignments.trendPositive}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Today's Classes"
              value={DEMO_STATS.upcomingClasses.today}
              subtitle="Scheduled for today"
              icon={<CalendarTodayOutlinedIcon />}
              color="#3b82f6"
              bgColor="#dbeafe"
              trend={DEMO_STATS.upcomingClasses.trend}
              trendPositive={DEMO_STATS.upcomingClasses.trendPositive}
            />
          </Grid>
        </Grid>

        {/* ── Subject Performance Table ── */}
        <Box sx={{ mb: 3 }}>
          <SubjectPerformanceCard />
        </Box>

        {/* ── Attendance + Assignments Row ── */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <AttendanceSummaryCard />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <AssignmentsCard limit={5} />
          </Grid>
        </Grid>

        {/* ── Timetable + Recent Activities Row ── */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <TimetableCard />
          </Grid>
          <Grid size={{ xs: 12, lg: 5 }}>
            <RecentActivitiesCard />
          </Grid>
        </Grid>

        {/* ── Announcements ── */}
        <Box sx={{ mb: 3 }}>
          <AnnouncementsCard />
        </Box>

      </Box>
    </DashboardLayout>
  );
};

export default StudentDashboardPage;
