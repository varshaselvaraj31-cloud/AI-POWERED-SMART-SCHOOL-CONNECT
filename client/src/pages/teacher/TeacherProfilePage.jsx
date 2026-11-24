import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';

import TeacherDashboardLayout from '../../layouts/TeacherDashboardLayout.jsx';
import { DEMO_TEACHER, DEMO_TEACHER_STATS } from '../../data/teacherDemo.js';
import { getEffectiveTeacher, getUserInitials } from '../../utils/authStorage.js';

const InfoRow = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
    <Box sx={{ color: '#fbbf24', mr: 2, display: 'flex', alignItems: 'center' }}>
      {icon}
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', fontSize: '0.75rem' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, color: '#f8fafc' }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

export const TeacherProfilePage = () => {
  const teacher = getEffectiveTeacher(DEMO_TEACHER);
  const initials = getUserInitials(teacher.name);

  return (
    <TeacherDashboardLayout title="Faculty Profile">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1000, mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>Faculty Profile</Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Institutional & departmental credentials</Typography>
          </Box>
          <Chip
            label={teacher.isRealUser ? 'ACTIVE FACULTY ACCOUNT' : 'FACULTY ID'}
            size="small"
            sx={{
              ml: 'auto',
              bgcolor: teacher.isRealUser ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              color: teacher.isRealUser ? '#10b981' : '#fbbf24',
              border: teacher.isRealUser ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
              fontWeight: 800,
              fontSize: '0.65rem',
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {/* Profile Card */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper sx={{ borderRadius: 3.5, border: '1px solid rgba(245, 158, 11, 0.2)', p: 3, textAlign: 'center', bgcolor: '#121722', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
              <Avatar sx={{ width: 90, height: 90, background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)', color: '#000000', fontSize: '2rem', fontWeight: 800, mx: 'auto', mb: 2, border: '2px solid #fbbf24' }}>
                {initials}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc' }}>{teacher.name}</Typography>
              <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 600 }}>{teacher.department}</Typography>
              <Box sx={{ mt: 2 }}>
                <Chip label={`ID: ${teacher.employeeId}`} size="small" sx={{ bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 800 }} />
              </Box>

              {/* Quick Stats */}
              <Grid container spacing={1} sx={{ mt: 2 }}>
                {[
                  { label: 'Students', value: DEMO_TEACHER_STATS.totalStudents.value },
                  { label: 'Classes', value: DEMO_TEACHER.assignedClasses.length },
                  { label: 'Avg Att.', value: DEMO_TEACHER_STATS.attendanceMarked.value },
                ].map((stat) => (
                  <Grid key={stat.label} size={{ xs: 4 }}>
                    <Box sx={{ bgcolor: '#181f2e', borderRadius: 2, p: 1, border: '1px solid rgba(245, 158, 11, 0.12)' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#fbbf24', lineHeight: 1 }}>{stat.value}</Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.68rem' }}>{stat.label}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Info Panel */}
          <Grid size={{ xs: 12, sm: 8 }}>
            <Paper sx={{ borderRadius: 3.5, border: '1px solid rgba(245, 158, 11, 0.2)', p: 3, bgcolor: '#121722', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f8fafc', mb: 1 }}>Professional Information</Typography>
              <Divider sx={{ mb: 1.5, borderColor: 'rgba(245, 158, 11, 0.15)' }} />
              <InfoRow icon={<BadgeOutlinedIcon fontSize="small" />} label="Employee Faculty ID" value={teacher.employeeId} />
              <InfoRow icon={<SchoolOutlinedIcon fontSize="small" />} label="Department" value={teacher.department} />
              <InfoRow icon={<MeetingRoomOutlinedIcon fontSize="small" />} label="Office / Cabin" value={teacher.officeRoom} />
              <InfoRow icon={<CalendarTodayOutlinedIcon fontSize="small" />} label="Joined Faculty" value={teacher.joinedDate} />

              <Divider sx={{ my: 2, borderColor: 'rgba(245, 158, 11, 0.15)' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f8fafc', mb: 1 }}>Contact & Assigned Batches</Typography>
              <InfoRow icon={<EmailOutlinedIcon fontSize="small" />} label="Official Email" value={teacher.email} />
              <InfoRow icon={<PhoneOutlinedIcon fontSize="small" />} label="Contact Extension" value={teacher.phone} />
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 1 }}>
                  Assigned Teaching Classes
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {DEMO_TEACHER.assignedClasses.map((cls) => (
                    <Chip
                      key={cls}
                      label={cls}
                      size="small"
                      sx={{ bgcolor: '#181f2e', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 600 }}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </TeacherDashboardLayout>
  );
};

export default TeacherProfilePage;
