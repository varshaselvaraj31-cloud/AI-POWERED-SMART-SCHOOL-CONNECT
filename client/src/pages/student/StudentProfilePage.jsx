import React from 'react';
import {
  Box, Typography, Grid, Avatar, Chip, Divider, Paper
} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DashboardLayout from '../../layouts/DashboardLayout.jsx';
import { DEMO_STUDENT, DEMO_STATS } from '../../data/studentDemo.js';
import { getEffectiveStudent, getUserInitials } from '../../utils/authStorage.js';

const InfoRow = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 1.25 }}>
    <Box sx={{ color: '#fbbf24', mt: 0.2, flexShrink: 0 }}>{icon}</Box>
    <Box>
      <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.68rem', letterSpacing: '0.06em' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, color: '#f8fafc', mt: 0.1 }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

const StudentProfilePage = () => {
  const student = getEffectiveStudent(DEMO_STUDENT);
  const initials = getUserInitials(student.name);

  return (
    <DashboardLayout title="My Profile">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1000, mx: 'auto' }}>

        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <AccountCircleOutlinedIcon sx={{ color: '#fbbf24', fontSize: 28 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>My Profile</Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Personal and academic information</Typography>
          </Box>
          <Chip
            label={student.isRealUser ? 'ACTIVE ACCOUNT' : 'DEMO DATA'}
            size="small"
            sx={{
              ml: 'auto',
              bgcolor: student.isRealUser ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              color: student.isRealUser ? '#10b981' : '#fbbf24',
              border: student.isRealUser ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
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
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc' }}>{student.name}</Typography>
              <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 600 }}>{student.grade}</Typography>
              <Box sx={{ mt: 2 }}>
                <Chip label={`ID: ${student.id}`} size="small" sx={{ bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 800 }} />
              </Box>
              {/* Quick Stats */}
              <Grid container spacing={1} sx={{ mt: 2 }}>
                {[
                  { label: 'GPA', value: DEMO_STATS.performance.gpa },
                  { label: 'Attendance', value: `${DEMO_STATS.attendance.percentage}%` },
                  { label: 'Rank', value: `#${DEMO_STATS.performance.rank}` },
                ].map(stat => (
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
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f8fafc', mb: 1 }}>Personal Information</Typography>
              <Divider sx={{ mb: 1.5, borderColor: 'rgba(245, 158, 11, 0.15)' }} />
              <InfoRow icon={<BadgeOutlinedIcon fontSize="small" />} label="Admission Number" value={student.admissionNumber} />
              <InfoRow icon={<EmailOutlinedIcon fontSize="small" />} label="Email Address" value={student.email} />
              <InfoRow icon={<PhoneOutlinedIcon fontSize="small" />} label="Phone Number" value={student.phone} />
              <InfoRow icon={<PeopleOutlinedIcon fontSize="small" />} label="Parent Contact Phone" value={student.parentPhone || student.phone} />

              <Divider sx={{ my: 2, borderColor: 'rgba(245, 158, 11, 0.15)' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f8fafc', mb: 1 }}>Academic Information</Typography>
              <InfoRow icon={<SchoolOutlinedIcon fontSize="small" />} label="Grade & Section" value={student.grade} />
              <InfoRow icon={<BadgeOutlinedIcon fontSize="small" />} label="Student ID Number" value={student.id} />
              <InfoRow icon={<CalendarTodayOutlinedIcon fontSize="small" />} label="Joined School" value={DEMO_STUDENT.joinedDate} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default StudentProfilePage;
