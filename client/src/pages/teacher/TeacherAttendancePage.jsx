import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  MenuItem,
  TextField,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import TeacherDashboardLayout from '../../layouts/TeacherDashboardLayout.jsx';
import AlertBanner from '../../components/common/AlertBanner.jsx';
import { DEMO_STUDENT_ROSTER, DEMO_TEACHER_CLASSES } from '../../data/teacherDemo.js';

export const TeacherAttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState('CLS-11A');
  const [selectedDate, setSelectedDate] = useState('2026-11-24');
  
  // Persistent roster with local storage support
  const [roster, setRoster] = useState(() => {
    const saved = localStorage.getItem('teacher_attendance_roster');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_STUDENT_ROSTER;
      }
    }
    return DEMO_STUDENT_ROSTER;
  });

  const [saveSuccess, setSaveSuccess] = useState('');

  // Add Student Dialog State
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newRollNo, setNewRollNo] = useState('');
  const [newGrade, setNewGrade] = useState('Grade 11-A');

  const updateRoster = (newRoster) => {
    setRoster(newRoster);
    localStorage.setItem('teacher_attendance_roster', JSON.stringify(newRoster));
  };

  const handleStatusChange = (rollNo, newStatus) => {
    const updated = roster.map((student) =>
      student.rollNo === rollNo ? { ...student, status: newStatus } : student
    );
    updateRoster(updated);
    if (saveSuccess) setSaveSuccess('');
  };

  const handleMarkAll = (status) => {
    const updated = roster.map((s) => ({ ...s, status }));
    updateRoster(updated);
    if (saveSuccess) setSaveSuccess('');
  };

  const handleAddStudent = () => {
    if (!newStudentName.trim()) return;
    const assignedRoll = newRollNo.trim() || String(roster.length + 1).padStart(2, '0');
    const newStudent = {
      rollNo: assignedRoll,
      name: newStudentName.trim(),
      grade: newGrade,
      attendance: 100,
      status: 'Present',
    };
    const updated = [...roster, newStudent];
    updateRoster(updated);
    setSaveSuccess(`Student "${newStudent.name}" (Roll #${newStudent.rollNo}) added to class attendance!`);
    setNewStudentName('');
    setNewRollNo('');
    setOpenAddModal(false);
  };

  const handleDeleteStudent = (rollNo) => {
    const updated = roster.filter((s) => s.rollNo !== rollNo);
    updateRoster(updated);
  };

  const handleSaveAttendance = () => {
    setSaveSuccess(
      `Attendance for ${selectedClass === 'CLS-11A' ? 'Grade 11 - Science' : selectedClass} on ${selectedDate} saved successfully with ${roster.length} students!`
    );
    setTimeout(() => {
      setSaveSuccess('');
    }, 4500);
  };

  const total = roster.length;
  const presentCount = roster.filter((s) => s.status === 'Present').length;
  const absentCount = roster.filter((s) => s.status === 'Absent').length;
  const lateCount = roster.filter((s) => s.status === 'Late').length;
  const attendancePercentage = total > 0 ? Math.round(((presentCount + lateCount) / total) * 100) : 0;

  return (
    <TeacherDashboardLayout title="Mark Attendance">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
        {/* Header Controls Card */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3.5,
            bgcolor: '#121722',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: 2,
              mb: 2.5,
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                Class Attendance Register
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                Add students, mark daily attendance status, and track presence records
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<PersonAddAlt1OutlinedIcon />}
              onClick={() => setOpenAddModal(true)}
              sx={{
                bgcolor: '#fbbf24',
                color: '#0a0d14',
                fontWeight: 800,
                textTransform: 'none',
                borderRadius: 2.5,
                '&:hover': { bgcolor: '#f59e0b' },
              }}
            >
              Add Student
            </Button>
          </Box>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Select Class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {DEMO_TEACHER_CLASSES.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.name} ({cls.section})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                type="date"
                fullWidth
                size="small"
                label="Attendance Date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleMarkAll('Present')}
                sx={{ borderColor: 'rgba(16, 185, 129, 0.4)', color: '#34d399', fontSize: '0.75rem', fontWeight: 700 }}
              >
                All Present
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleMarkAll('Absent')}
                sx={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171', fontSize: '0.75rem', fontWeight: 700 }}
              >
                All Absent
              </Button>
            </Grid>
          </Grid>

          {/* Quick Metrics */}
          <Grid container spacing={1.5}>
            {[
              { label: 'Total Enrolled', value: total, color: '#f8fafc' },
              { label: 'Present Today', value: presentCount, color: '#10b981' },
              { label: 'Absent Today', value: absentCount, color: '#ef4444' },
              { label: 'Late Arrival', value: lateCount, color: '#f59e0b' },
              { label: 'Attendance Rate', value: `${attendancePercentage}%`, color: '#fbbf24' },
            ].map((stat) => (
              <Grid key={stat.label} size={{ xs: 6, sm: 2.4 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: '#181f2e',
                    border: '1px solid rgba(245, 158, 11, 0.12)',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 800, color: stat.color, lineHeight: 1.1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.72rem' }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Success Banner */}
        <AlertBanner severity="success" message={saveSuccess} onClose={() => setSaveSuccess('')} />

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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1.5 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                Student Attendance Sheet ({total} Students)
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                Click Present / Late / Absent buttons to mark student attendance
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveAttendance}
              sx={{ bgcolor: '#f59e0b', color: '#000000', fontWeight: 800, '&:hover': { bgcolor: '#fbbf24' } }}
            >
              Save Attendance
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#181f2e' }}>
                  <TableCell sx={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.8rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>Roll No</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.8rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>Student Name</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.8rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>Class / Section</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.8rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>Attendance</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.8rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>Mark Status</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.8rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roster.map((student) => {
                  return (
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
                            {student.name ? student.name[0] : 'S'}
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
                        <ButtonGroup size="small">
                          <Button
                            variant={student.status === 'Present' ? 'contained' : 'outlined'}
                            onClick={() => handleStatusChange(student.rollNo, 'Present')}
                            startIcon={<CheckCircleOutlinedIcon sx={{ fontSize: '14px !important' }} />}
                            sx={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              ...(student.status === 'Present'
                                ? { bgcolor: '#10b981', color: '#ffffff', '&:hover': { bgcolor: '#059669' } }
                                : { borderColor: 'rgba(16, 185, 129, 0.35)', color: '#34d399' }),
                            }}
                          >
                            Present
                          </Button>
                          <Button
                            variant={student.status === 'Late' ? 'contained' : 'outlined'}
                            onClick={() => handleStatusChange(student.rollNo, 'Late')}
                            startIcon={<AccessTimeIcon sx={{ fontSize: '14px !important' }} />}
                            sx={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              ...(student.status === 'Late'
                                ? { bgcolor: '#f59e0b', color: '#000000', '&:hover': { bgcolor: '#d97706' } }
                                : { borderColor: 'rgba(245, 158, 11, 0.35)', color: '#fbbf24' }),
                            }}
                          >
                            Late
                          </Button>
                          <Button
                            variant={student.status === 'Absent' ? 'contained' : 'outlined'}
                            onClick={() => handleStatusChange(student.rollNo, 'Absent')}
                            startIcon={<HighlightOffIcon sx={{ fontSize: '14px !important' }} />}
                            sx={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              ...(student.status === 'Absent'
                                ? { bgcolor: '#ef4444', color: '#ffffff', '&:hover': { bgcolor: '#dc2626' } }
                                : { borderColor: 'rgba(239, 68, 68, 0.35)', color: '#f87171' }),
                            }}
                          >
                            Absent
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteStudent(student.rollNo)}
                          sx={{ color: '#64748b', '&:hover': { color: '#ef4444' } }}
                          title="Remove from sheet"
                        >
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Add Student Modal */}
        <Dialog
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: '#121722',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#ffffff',
              borderRadius: 3.5,
              p: 1,
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 800, color: '#fbbf24' }}>
            Add Student to Attendance
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px !important' }}>
            <TextField
              label="Student Full Name"
              fullWidth
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder="e.g. Ramesh Kumar / Ananya Sharma"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'rgba(245, 158, 11, 0.3)' },
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
              }}
            />
            <TextField
              label="Roll Number (Optional)"
              fullWidth
              value={newRollNo}
              onChange={(e) => setNewRollNo(e.target.value)}
              placeholder={`Default: ${String(roster.length + 1).padStart(2, '0')}`}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'rgba(245, 158, 11, 0.3)' },
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
              }}
            />
            <TextField
              label="Grade / Section"
              fullWidth
              value={newGrade}
              onChange={(e) => setNewGrade(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'rgba(245, 158, 11, 0.3)' },
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenAddModal(false)} sx={{ color: '#94a3b8' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAddStudent}
              sx={{
                bgcolor: '#fbbf24',
                color: '#0a0d14',
                fontWeight: 800,
                '&:hover': { bgcolor: '#f59e0b' },
              }}
            >
              Add to Attendance
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </TeacherDashboardLayout>
  );
};

export default TeacherAttendancePage;
