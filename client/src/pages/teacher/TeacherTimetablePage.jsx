import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Stack,
  Chip,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';

import TeacherDashboardLayout from '../../layouts/TeacherDashboardLayout.jsx';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const DEMO_WEEKLY_TIMETABLE = {
  Monday: [
    { time: '09:00 AM - 10:15 AM', class: 'Grade 11 - Science (Sec A)', subject: 'Physics · Thermodynamics', room: 'Lab 2' },
    { time: '11:30 AM - 12:45 PM', class: 'Grade 12 - Science (Sec B)', subject: 'Advanced Physics · Electromagnetism', room: 'Room 204' },
    { time: '02:00 PM - 03:15 PM', class: 'Grade 10 (Sec A)', subject: 'General Science', room: 'Room 108' },
  ],
  Tuesday: [
    { time: '10:00 AM - 11:15 AM', class: 'Grade 12 - Science (Sec B)', subject: 'Physics Seminar', room: 'Room 204' },
    { time: '01:30 PM - 03:00 PM', class: 'Grade 11 - Science (Sec A)', subject: 'Physics Practical Lab', room: 'Lab 2' },
  ],
  Wednesday: [
    { time: '09:00 AM - 10:15 AM', class: 'Grade 11 - Science (Sec A)', subject: 'Physics · Fluid Mechanics', room: 'Lab 2' },
    { time: '11:00 AM - 12:15 PM', class: 'Grade 10 (Sec A)', subject: 'Physical Science Review', room: 'Room 108' },
    { time: '02:00 PM - 03:15 PM', class: 'Grade 12 - Science (Sec B)', subject: 'Problem Solving Workshop', room: 'Room 204' },
  ],
  Thursday: [
    { time: '10:00 AM - 11:15 AM', class: 'Grade 12 - Science (Sec B)', subject: 'Nuclear Physics Intro', room: 'Room 204' },
    { time: '01:30 PM - 03:00 PM', class: 'Grade 10 (Sec A)', subject: 'Science Lab Practice', room: 'Lab 1' },
  ],
  Friday: [
    { time: '09:00 AM - 10:15 AM', class: 'Grade 11 - Science (Sec A)', subject: 'Weekly Physics Assessment', room: 'Lab 2' },
    { time: '11:30 AM - 12:45 PM', class: 'Grade 12 - Science (Sec B)', subject: 'Advanced Physics Lab', room: 'Lab 2' },
    { time: '02:30 PM - 03:30 PM', class: 'Faculty Meeting', subject: 'Sciences Department HOD Meet', room: 'Conference Hall' },
  ],
};

export const TeacherTimetablePage = () => {
  const getTodayIndex = () => {
    const day = new Date().getDay();
    if (day === 0 || day === 6) return 0;
    return day - 1;
  };

  const [selectedDay, setSelectedDay] = useState(getTodayIndex());
  const classesForDay = DEMO_WEEKLY_TIMETABLE[DAYS[selectedDay]] || [];

  return (
    <TeacherDashboardLayout title="Faculty Timetable">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1100, mx: 'auto' }}>
        <Paper
          sx={{
            borderRadius: 3.5,
            bgcolor: '#121722',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box sx={{ p: 3, borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                  Weekly Teaching Schedule
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                  Dr. Robert Hayes · Department of Physics & Sciences
                </Typography>
              </Box>
              <Chip
                label="TERM 1 · 2026"
                size="small"
                sx={{ bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 800 }}
              />
            </Box>
          </Box>

          {/* Day Tabs */}
          <Box sx={{ borderBottom: '1px solid rgba(245, 158, 11, 0.12)', px: 2 }}>
            <Tabs
              value={selectedDay}
              onChange={(e, v) => setSelectedDay(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ minHeight: 48, '& .MuiTabs-indicator': { backgroundColor: '#f59e0b', height: 2 } }}
            >
              {DAYS.map((day, index) => (
                <Tab
                  key={day}
                  label={day}
                  value={index}
                  sx={{
                    minHeight: 48,
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: '#94a3b8',
                    '&.Mui-selected': { color: '#fbbf24' },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Schedule List */}
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              {classesForDay.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2.5,
                    borderRadius: 2.5,
                    bgcolor: '#181f2e',
                    border: '1px solid rgba(245, 158, 11, 0.15)',
                    borderLeft: '4px solid #f59e0b',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: 1.5,
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <ClassOutlinedIcon sx={{ fontSize: 18, color: '#fbbf24' }} />
                      <Typography variant="body1" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                        {item.class}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#d97706', fontWeight: 600 }}>
                      {item.subject}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <AccessTimeIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                      <Typography variant="body2" sx={{ color: '#cbd5e1', fontWeight: 600 }}>
                        {item.time}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <RoomOutlinedIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                        {item.room}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </TeacherDashboardLayout>
  );
};

export default TeacherTimetablePage;
