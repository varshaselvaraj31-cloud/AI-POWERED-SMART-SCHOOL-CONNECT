import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';

import TeacherDashboardLayout from '../../layouts/TeacherDashboardLayout.jsx';
import { DEMO_TEACHER_CLASSES, DEMO_STUDENT_ROSTER } from '../../data/teacherDemo.js';

export const TeacherClassesPage = () => {
  const [selectedClassId, setSelectedClassId] = useState('CLS-11A');
  const [searchTerm, setSearchTerm] = useState('');

  const currentClass = DEMO_TEACHER_CLASSES.find((c) => c.id === selectedClassId) || DEMO_TEACHER_CLASSES[0];

  const filteredStudents = DEMO_STUDENT_ROSTER.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNo.includes(searchTerm)
  );

  return (
    <TeacherDashboardLayout title="Classes & Students">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
        {/* Class Selector Cards */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {DEMO_TEACHER_CLASSES.map((cls) => {
            const isSelected = cls.id === selectedClassId;
            return (
              <Grid key={cls.id} size={{ xs: 12, md: 4 }}>
                <Paper
                  onClick={() => setSelectedClassId(cls.id)}
                  sx={{
                    p: 2.5,
                    borderRadius: 3.5,
                    cursor: 'pointer',
                    bgcolor: isSelected ? '#181f2e' : '#121722',
                    border: isSelected ? '2px solid #f59e0b' : '1px solid rgba(245, 158, 11, 0.2)',
                    boxShadow: isSelected ? '0 8px 30px rgba(245, 158, 11, 0.25)' : '0 4px 20px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.2s ease',
                    '&:hover': { transform: 'translateY(-2px)', borderColor: '#fbbf24' },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Chip
                      icon={<ClassOutlinedIcon sx={{ fontSize: '15px !important' }} />}
                      label={cls.subject}
                      size="small"
                      sx={{ bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 800 }}
                    />
                    <Chip
                      label={cls.section}
                      size="small"
                      sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', color: '#ffffff', fontWeight: 700 }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc', mt: 1 }}>
                    {cls.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PeopleAltOutlinedIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>{cls.studentsCount} Students</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <RoomOutlinedIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>{cls.room}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Student Roster Table */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 3.5,
            bgcolor: '#121722',
            border: '1px solid rgba(245, 158, 11, 0.18)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 2.5 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                Enrolled Students — {currentClass.name} ({currentClass.section})
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                Academic records, attendance averages, and contact info
              </Typography>
            </Box>

            <TextField
              size="small"
              placeholder="Search by student name or roll no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: { xs: '100%', sm: 300 } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#181f2e' }}>
                  <TableCell sx={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.8rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>Roll No</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.8rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>Student Name</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.8rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>Class / Section</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.8rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>Avg Attendance</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.8rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>Academic Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow
                    key={student.rollNo}
                    sx={{
                      borderBottom: '1px solid rgba(245, 158, 11, 0.08)',
                      '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.04)' },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 700, color: '#d97706' }}>
                      #{student.rollNo}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 800 }}>
                          {student.name[0]}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                          {student.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                        {student.grade}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`${student.attendance}%`}
                        size="small"
                        sx={{
                          bgcolor: student.attendance >= 85 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                          color: student.attendance >= 85 ? '#34d399' : '#fbbf24',
                          border: student.attendance >= 85 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={student.attendance >= 85 ? 'Good Standing' : 'Needs Follow-Up'}
                        size="small"
                        sx={{
                          bgcolor: student.attendance >= 85 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: student.attendance >= 85 ? '#34d399' : '#f87171',
                          border: student.attendance >= 85 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </TeacherDashboardLayout>
  );
};

export default TeacherClassesPage;
