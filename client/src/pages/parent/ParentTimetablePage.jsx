import React, { useState } from 'react';
import { Box, Typography, Paper, Chip, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import ParentDashboardLayout from '../../layouts/ParentDashboardLayout.jsx';
import { DEMO_CHILD_TIMETABLE, DEMO_PARENT } from '../../data/parentDemo.js';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const ParentTimetablePage = () => {
  const [day, setDay] = useState('Wednesday');
  const periods = DEMO_CHILD_TIMETABLE[day];

  return (
    <ParentDashboardLayout title="Timetable">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 900, mx: 'auto' }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <CalendarMonthOutlinedIcon sx={{ color: '#fbbf24', fontSize: 28 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>Weekly Timetable</Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              {DEMO_PARENT.linkedStudent.name} · {DEMO_PARENT.linkedStudent.grade}
            </Typography>
          </Box>
          <Chip label="DEMO DATA" size="small" sx={{ ml: 'auto', bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 800, fontSize: '0.65rem' }} />
        </Box>

        <ToggleButtonGroup
          exclusive
          value={day}
          onChange={(_, next) => next && setDay(next)}
          sx={{ mb: 2.5, flexWrap: 'wrap', gap: 1 }}
        >
          {DAYS.map((name) => (
            <ToggleButton
              key={name}
              value={name}
              sx={{
                color: '#cbd5e1',
                borderColor: 'rgba(245, 158, 11, 0.25)',
                textTransform: 'none',
                fontWeight: 700,
                '&.Mui-selected': {
                  bgcolor: '#f59e0b',
                  color: '#000',
                  '&:hover': { bgcolor: '#fbbf24' },
                },
              }}
            >
              {name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Stack spacing={1.5}>
          {periods.map((period) => (
            <Paper
              key={`${period.time}-${period.subject}`}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: '#121722',
                border: '1px solid rgba(245, 158, 11, 0.18)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 800, color: '#f8fafc' }}>{period.subject}</Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8' }}>{period.teacher}</Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <Typography variant="caption" sx={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: 0.4 }}>
                  <AccessTimeOutlinedIcon sx={{ fontSize: 16 }} /> {period.time}
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 0.4 }}>
                  <RoomOutlinedIcon sx={{ fontSize: 16 }} /> {period.room}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>
    </ParentDashboardLayout>
  );
};

export default ParentTimetablePage;
