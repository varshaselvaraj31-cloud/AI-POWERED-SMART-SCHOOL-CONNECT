import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
  LinearProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

import TeacherDashboardLayout from '../../layouts/TeacherDashboardLayout.jsx';
import AlertBanner from '../../components/common/AlertBanner.jsx';
import { DEMO_PENDING_ASSIGNMENTS, DEMO_TEACHER_CLASSES } from '../../data/teacherDemo.js';

export const TeacherAssignmentsPage = () => {
  const [assignments, setAssignments] = useState(DEMO_PENDING_ASSIGNMENTS);
  const [openModal, setOpenModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [newAsgn, setNewAsgn] = useState({
    title: '',
    class: 'Grade 11 - Science (Sec A)',
    dueDate: '',
    totalMarks: '100',
    description: '',
  });

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!newAsgn.title || !newAsgn.dueDate) return;

    const created = {
      id: Date.now(),
      title: newAsgn.title,
      class: newAsgn.class,
      dueDate: newAsgn.dueDate,
      submittedCount: 0,
      totalCount: 42,
      pendingGrading: 0,
    };

    setAssignments([created, ...assignments]);
    setOpenModal(false);
    setNewAsgn({ title: '', class: 'Grade 11 - Science (Sec A)', dueDate: '', totalMarks: '100', description: '' });
    setAlertMsg(`New assignment "${created.title}" successfully created and broadcasted!`);
  };

  return (
    <TeacherDashboardLayout title="Assignments & Grading">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
        {/* Header Bar */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 3 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>
              Academic Assignments & Grading
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Create coursework, track submissions, and evaluate performance
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            sx={{ bgcolor: '#f59e0b', color: '#000000', fontWeight: 800, '&:hover': { bgcolor: '#fbbf24' } }}
          >
            Create New Assignment
          </Button>
        </Box>

        <AlertBanner severity="success" message={alertMsg} onClose={() => setAlertMsg('')} />

        {/* Assignments List */}
        <Stack spacing={2.5}>
          {assignments.map((asgn) => {
            const pct = asgn.totalCount > 0 ? Math.round((asgn.submittedCount / asgn.totalCount) * 100) : 0;
            return (
              <Paper
                key={asgn.id}
                sx={{
                  p: 3,
                  borderRadius: 3.5,
                  bgcolor: '#121722',
                  border: '1px solid rgba(245, 158, 11, 0.18)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                      <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                        <AssignmentOutlinedIcon />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                          {asgn.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 600 }}>
                          {asgn.class} · Due Date: {asgn.dueDate}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>Submissions Received</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#fbbf24' }}>
                        {asgn.submittedCount} / {asgn.totalCount} ({pct}%)
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={pct}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: '#181f2e',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          bgcolor: pct === 100 ? '#10b981' : '#f59e0b',
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 2 }} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                    <Chip
                      icon={asgn.pendingGrading === 0 ? <CheckCircleOutlinedIcon sx={{ fontSize: '14px !important' }} /> : undefined}
                      label={asgn.pendingGrading > 0 ? `${asgn.pendingGrading} to grade` : 'Completed'}
                      size="small"
                      sx={{
                        bgcolor: asgn.pendingGrading > 0 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        color: asgn.pendingGrading > 0 ? '#fbbf24' : '#34d399',
                        border: asgn.pendingGrading > 0 ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                        fontWeight: 700,
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </Stack>

        {/* Modal: Create Assignment */}
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: '#121722',
              borderRadius: 3.5,
              border: '1px solid rgba(245, 158, 11, 0.3)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9)',
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 800, color: '#f8fafc', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>
            Create New Assignment
          </DialogTitle>
          <DialogContent sx={{ pt: '20px !important' }}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Assignment Title"
                placeholder="e.g. Thermodynamics Problem Set"
                value={newAsgn.title}
                onChange={(e) => setNewAsgn({ ...newAsgn, title: e.target.value })}
                required
              />

              <TextField
                select
                fullWidth
                label="Target Class"
                value={newAsgn.class}
                onChange={(e) => setNewAsgn({ ...newAsgn, class: e.target.value })}
              >
                {DEMO_TEACHER_CLASSES.map((c) => (
                  <MenuItem key={c.id} value={`${c.name} (${c.section})`}>
                    {c.name} ({c.section})
                  </MenuItem>
                ))}
              </TextField>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    type="date"
                    fullWidth
                    label="Due Date"
                    value={newAsgn.dueDate}
                    onChange={(e) => setNewAsgn({ ...newAsgn, dueDate: e.target.value })}
                    slotProps={{ inputLabel: { shrink: true } }}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    type="number"
                    fullWidth
                    label="Maximum Marks"
                    value={newAsgn.totalMarks}
                    onChange={(e) => setNewAsgn({ ...newAsgn, totalMarks: e.target.value })}
                  />
                </Grid>
              </Grid>

              <TextField
                multiline
                rows={3}
                fullWidth
                label="Instructions / Description"
                placeholder="Details of the assignment tasks, submission format..."
                value={newAsgn.description}
                onChange={(e) => setNewAsgn({ ...newAsgn, description: e.target.value })}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(245, 158, 11, 0.15)' }}>
            <Button onClick={() => setOpenModal(false)} sx={{ color: '#94a3b8' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCreateAssignment}
              sx={{ bgcolor: '#f59e0b', color: '#000000', fontWeight: 800, '&:hover': { bgcolor: '#fbbf24' } }}
            >
              Publish Assignment
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </TeacherDashboardLayout>
  );
};

export default TeacherAssignmentsPage;
