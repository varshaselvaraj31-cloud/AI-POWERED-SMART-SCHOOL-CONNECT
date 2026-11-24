import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Stack,
  LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import TeacherDashboardLayout from '../../layouts/TeacherDashboardLayout.jsx';
import StatCard from '../../components/dashboard/StatCard.jsx';
import {
  DEMO_TEACHER,
  DEMO_TEACHER_STATS,
  DEMO_TODAY_SCHEDULE,
  DEMO_STUDENT_ROSTER,
  DEMO_PENDING_ASSIGNMENTS,
  DEMO_TEACHER_ANNOUNCEMENTS,
} from '../../data/teacherDemo.js';
import { getEffectiveTeacher } from '../../utils/authStorage.js';

export const TeacherDashboardPage = () => {
  const teacher = getEffectiveTeacher(DEMO_TEACHER);
  const navigate = useNavigate();

  return (
    <TeacherDashboardLayout title="Faculty Dashboard">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: 'auto' }}>
        {/* 1. Welcome Banner */}
        <Paper
          sx={{
            p: { xs: 2.5, sm: 3.5 },
            mb: 3,
            borderRadius: 3.5,
            background: 'linear-gradient(135deg, #10141e 0%, #181f2e 50%, #0d1117 100%)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 15px rgba(245, 158, 11, 0.1)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 2,
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
              <Chip
                label="FACULTY PORTAL"
                size="small"
                sx={{
                  bgcolor: 'rgba(245, 158, 11, 0.15)',
                  color: '#fbbf24',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  fontWeight: 800,
                  fontSize: '0.68rem',
                }}
              />
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                Employee ID: {teacher.employeeId}
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#ffffff', mb: 0.5, fontSize: { xs: '1.5rem', sm: '1.9rem' } }}>
              Welcome back, {teacher.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              {teacher.department} · {teacher.title} · {teacher.officeRoom}
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button
              variant="contained"
              startIcon={<EventAvailableOutlinedIcon />}
              onClick={() => navigate('/teacher/attendance')}
              sx={{
                bgcolor: '#f59e0b',
                color: '#000000',
                fontWeight: 800,
                '&:hover': { bgcolor: '#fbbf24' },
              }}
            >
              Mark Attendance
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlinedIcon />}
              onClick={() => navigate('/teacher/assignments')}
              sx={{
                borderColor: 'rgba(245, 158, 11, 0.4)',
                color: '#fbbf24',
                fontWeight: 700,
                '&:hover': { borderColor: '#fbbf24', bgcolor: 'rgba(245, 158, 11, 0.1)' },
              }}
            >
              New Assignment
            </Button>
          </Stack>
        </Paper>

        {/* 2. Stat Cards Grid */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title={DEMO_TEACHER_STATS.totalStudents.label}
              value={DEMO_TEACHER_STATS.totalStudents.value}
              subtitle={DEMO_TEACHER_STATS.totalStudents.subtitle}
              icon={<PeopleAltOutlinedIcon />}
              trend={DEMO_TEACHER_STATS.totalStudents.trend}
              trendPositive={DEMO_TEACHER_STATS.totalStudents.trendPositive}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title={DEMO_TEACHER_STATS.classesToday.label}
              value={DEMO_TEACHER_STATS.classesToday.value}
              subtitle={DEMO_TEACHER_STATS.classesToday.subtitle}
              icon={<SchoolOutlinedIcon />}
              trend={DEMO_TEACHER_STATS.classesToday.trend}
              trendPositive={DEMO_TEACHER_STATS.classesToday.trendPositive}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title={DEMO_TEACHER_STATS.attendanceMarked.label}
              value={DEMO_TEACHER_STATS.attendanceMarked.value}
              subtitle={DEMO_TEACHER_STATS.attendanceMarked.subtitle}
              icon={<EventAvailableOutlinedIcon />}
              trend={DEMO_TEACHER_STATS.attendanceMarked.trend}
              trendPositive={DEMO_TEACHER_STATS.attendanceMarked.trendPositive}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title={DEMO_TEACHER_STATS.pendingGrading.label}
              value={DEMO_TEACHER_STATS.pendingGrading.value}
              subtitle={DEMO_TEACHER_STATS.pendingGrading.subtitle}
              icon={<AssignmentTurnedInOutlinedIcon />}
              trend={DEMO_TEACHER_STATS.pendingGrading.trend}
              trendPositive={DEMO_TEACHER_STATS.pendingGrading.trendPositive}
            />
          </Grid>
        </Grid>

        {/* 3. Middle Section: Today's Classes & Quick Attendance */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {/* Today's Schedule */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3.5,
                bgcolor: '#121722',
                border: '1px solid rgba(245, 158, 11, 0.18)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                    Today's Teaching Schedule
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    4 Sessions Scheduled · Physics Department
                  </Typography>
                </Box>
                <Chip
                  label="DEMO DATA"
                  size="small"
                  sx={{ bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 800, fontSize: '0.65rem' }}
                />
              </Box>

              <Stack spacing={1.75}>
                {DEMO_TODAY_SCHEDULE.map((session, index) => {
                  const isCompleted = session.status === 'Completed';
                  return (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        borderRadius: 2.5,
                        bgcolor: '#181f2e',
                        border: '1px solid rgba(245, 158, 11, 0.15)',
                        borderLeft: isCompleted ? '4px solid #10b981' : '4px solid #f59e0b',
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: 1.5,
                      }}
                    >
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                            {session.class}
                          </Typography>
                          <Chip
                            label={session.status}
                            size="small"
                            sx={{
                              bgcolor: isCompleted ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                              color: isCompleted ? '#34d399' : '#fbbf24',
                              border: isCompleted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                              fontWeight: 700,
                              fontSize: '0.68rem',
                              height: 20,
                            }}
                          />
                        </Box>
                        <Typography variant="caption" sx={{ color: '#fbbf24', display: 'block', fontWeight: 600 }}>
                          {session.subject}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeOutlinedIcon sx={{ fontSize: 13, color: '#94a3b8' }} />
                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>{session.time}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <RoomOutlinedIcon sx={{ fontSize: 13, color: '#94a3b8' }} />
                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>{session.room}</Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Button
                        size="small"
                        variant={session.attendanceMarked ? 'outlined' : 'contained'}
                        onClick={() => navigate('/teacher/attendance')}
                        sx={{
                          whiteSpace: 'nowrap',
                          fontSize: '0.75rem',
                          ...(session.attendanceMarked
                            ? { borderColor: 'rgba(16, 185, 129, 0.4)', color: '#34d399' }
                            : { bgcolor: '#f59e0b', color: '#000000', fontWeight: 800 }),
                        }}
                      >
                        {session.attendanceMarked ? 'View Attendance' : 'Mark Attendance'}
                      </Button>
                    </Box>
                  );
                })}
              </Stack>
            </Paper>
          </Grid>

          {/* Quick Attendance Roster */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3.5,
                bgcolor: '#121722',
                border: '1px solid rgba(245, 158, 11, 0.18)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                    Grade 11 - Science (Section A) Roster
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    Today's Attendance Status (42 Enrolled)
                  </Typography>
                </Box>
                <Button
                  size="small"
                  endIcon={<ArrowForwardIcon fontSize="small" />}
                  onClick={() => navigate('/teacher/attendance')}
                  sx={{ color: '#fbbf24', fontWeight: 700 }}
                >
                  Full Sheet
                </Button>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#181f2e' }}>
                      <TableCell sx={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.78rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>Roll</TableCell>
                      <TableCell sx={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.78rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>Student Name</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.78rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>Avg %</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.78rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>Today's Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {DEMO_STUDENT_ROSTER.slice(0, 6).map((student) => {
                      const isPresent = student.status === 'Present';
                      const isAbsent = student.status === 'Absent';
                      return (
                        <TableRow
                          key={student.rollNo}
                          sx={{
                            borderBottom: '1px solid rgba(245, 158, 11, 0.08)',
                            '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.05)' },
                          }}
                        >
                          <TableCell sx={{ fontWeight: 700, color: '#d97706', fontSize: '0.8rem' }}>
                            #{student.rollNo}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar sx={{ width: 26, height: 26, fontSize: '0.7rem', bgcolor: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' }}>
                                {student.name[0]}
                              </Avatar>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                                {student.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2" sx={{ fontWeight: 700, color: student.attendance >= 85 ? '#10b981' : '#f59e0b' }}>
                              {student.attendance}%
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={student.status}
                              size="small"
                              sx={{
                                bgcolor: isPresent
                                  ? 'rgba(16, 185, 129, 0.15)'
                                  : isAbsent
                                  ? 'rgba(239, 68, 68, 0.15)'
                                  : 'rgba(245, 158, 11, 0.15)',
                                color: isPresent ? '#34d399' : isAbsent ? '#f87171' : '#fbbf24',
                                border: isPresent
                                  ? '1px solid rgba(16, 185, 129, 0.3)'
                                  : isAbsent
                                  ? '1px solid rgba(239, 68, 68, 0.3)'
                                  : '1px solid rgba(245, 158, 11, 0.3)',
                                fontWeight: 700,
                                fontSize: '0.68rem',
                                height: 20,
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* 4. Bottom Section: Pending Assignments & Announcements */}
        <Grid container spacing={2.5}>
          {/* Pending Assignments */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3.5,
                bgcolor: '#121722',
                border: '1px solid rgba(245, 158, 11, 0.18)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                    Active Assignments & Grading
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    Review submissions and publish marks
                  </Typography>
                </Box>
                <Button
                  size="small"
                  endIcon={<ArrowForwardIcon fontSize="small" />}
                  onClick={() => navigate('/teacher/assignments')}
                  sx={{ color: '#fbbf24', fontWeight: 700 }}
                >
                  Manage
                </Button>
              </Box>

              <Stack spacing={2}>
                {DEMO_PENDING_ASSIGNMENTS.map((asgn) => {
                  const pct = Math.round((asgn.submittedCount / asgn.totalCount) * 100);
                  return (
                    <Box
                      key={asgn.id}
                      sx={{
                        p: 2,
                        borderRadius: 2.5,
                        bgcolor: '#181f2e',
                        border: '1px solid rgba(245, 158, 11, 0.15)',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                            {asgn.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 600 }}>
                            {asgn.class} · Due {asgn.dueDate}
                          </Typography>
                        </Box>
                        <Chip
                          label={asgn.pendingGrading > 0 ? `${asgn.pendingGrading} to grade` : 'All Graded'}
                          size="small"
                          sx={{
                            bgcolor: asgn.pendingGrading > 0 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                            color: asgn.pendingGrading > 0 ? '#fbbf24' : '#34d399',
                            border: asgn.pendingGrading > 0 ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                            fontWeight: 700,
                            fontSize: '0.68rem',
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          sx={{
                            flex: 1,
                            height: 6,
                            borderRadius: 3,
                            bgcolor: 'rgba(245, 158, 11, 0.12)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              bgcolor: pct === 100 ? '#10b981' : '#f59e0b',
                            },
                          }}
                        />
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, minWidth: 65 }}>
                          {asgn.submittedCount}/{asgn.totalCount} ({pct}%)
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
            </Paper>
          </Grid>

          {/* Announcements Noticeboard */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3.5,
                bgcolor: '#121722',
                border: '1px solid rgba(245, 158, 11, 0.18)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                    Faculty Announcements
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    Broadcasted to your assigned classes
                  </Typography>
                </Box>
                <Button
                  size="small"
                  endIcon={<ArrowForwardIcon fontSize="small" />}
                  onClick={() => navigate('/teacher/announcements')}
                  sx={{ color: '#fbbf24', fontWeight: 700 }}
                >
                  Create
                </Button>
              </Box>

              <Stack spacing={1.75}>
                {DEMO_TEACHER_ANNOUNCEMENTS.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      bgcolor: '#181f2e',
                      border: '1px solid rgba(245, 158, 11, 0.12)',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                        {item.title}
                      </Typography>
                      <Chip
                        label={item.class}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(245, 158, 11, 0.12)',
                          color: '#fbbf24',
                          border: '1px solid rgba(245, 158, 11, 0.25)',
                          fontSize: '0.65rem',
                          height: 18,
                        }}
                      />
                    </Box>
                    <Typography variant="caption" sx={{ color: '#cbd5e1', display: 'block', mb: 0.5, lineHeight: 1.4 }}>
                      {item.body}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.72rem' }}>
                      Posted on {item.date}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </TeacherDashboardLayout>
  );
};

export default TeacherDashboardPage;
