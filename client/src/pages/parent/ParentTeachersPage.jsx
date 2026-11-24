import React from 'react';
import { Box, Typography, Grid, Paper, Chip, Avatar, Stack } from '@mui/material';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ParentDashboardLayout from '../../layouts/ParentDashboardLayout.jsx';
import { DEMO_TEACHER_DIRECTORY, DEMO_PARENT } from '../../data/parentDemo.js';

const ParentTeachersPage = () => (
  <ParentDashboardLayout title="Teachers">
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1100, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <GroupsOutlinedIcon sx={{ color: '#fbbf24', fontSize: 28 }} />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>Teacher Directory</Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            Faculty contacts for {DEMO_PARENT.linkedStudent.name}&apos;s subjects
          </Typography>
        </Box>
        <Chip label="DEMO DATA" size="small" sx={{ ml: 'auto', bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 800, fontSize: '0.65rem' }} />
      </Box>

      <Grid container spacing={2.5}>
        {DEMO_TEACHER_DIRECTORY.map((teacher) => {
          const initials = teacher.name
            .split(' ')
            .filter((part) => !part.includes('.'))
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

          return (
            <Grid key={teacher.id} size={{ xs: 12, sm: 6 }}>
              <Paper sx={{ p: 2.5, borderRadius: 3.5, bgcolor: '#121722', border: '1px solid rgba(245, 158, 11, 0.18)', height: '100%' }}>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)', color: '#000', fontWeight: 800 }}>
                    {initials}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f8fafc' }}>{teacher.name}</Typography>
                    <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 700 }}>{teacher.role}</Typography>
                  </Box>
                </Box>
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ color: '#cbd5e1', display: 'flex', gap: 1, alignItems: 'center' }}>
                    <EmailOutlinedIcon sx={{ fontSize: 18, color: '#fbbf24' }} /> {teacher.email}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#cbd5e1', display: 'flex', gap: 1, alignItems: 'center' }}>
                    <PhoneOutlinedIcon sx={{ fontSize: 18, color: '#fbbf24' }} /> {teacher.phone}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#cbd5e1', display: 'flex', gap: 1, alignItems: 'center' }}>
                    <AccessTimeOutlinedIcon sx={{ fontSize: 18, color: '#fbbf24' }} /> {teacher.officeHours}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  </ParentDashboardLayout>
);

export default ParentTeachersPage;
