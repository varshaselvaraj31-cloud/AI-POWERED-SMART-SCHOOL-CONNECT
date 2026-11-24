import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';

import TeacherDashboardLayout from '../../layouts/TeacherDashboardLayout.jsx';
import AlertBanner from '../../components/common/AlertBanner.jsx';
import { DEMO_TEACHER_ANNOUNCEMENTS, DEMO_TEACHER_CLASSES } from '../../data/teacherDemo.js';

export const TeacherAnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState(DEMO_TEACHER_ANNOUNCEMENTS);
  const [openModal, setOpenModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [newNotice, setNewNotice] = useState({
    title: '',
    class: 'All Assigned Classes',
    body: '',
  });

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.body) return;

    const created = {
      id: Date.now(),
      title: newNotice.title,
      class: newNotice.class,
      date: new Date().toISOString().split('T')[0],
      body: newNotice.body,
    };

    setAnnouncements([created, ...announcements]);
    setOpenModal(false);
    setNewNotice({ title: '', class: 'All Assigned Classes', body: '' });
    setAlertMsg(`Announcement "${created.title}" successfully broadcasted to ${created.class}!`);
  };

  return (
    <TeacherDashboardLayout title="Faculty Announcements">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1100, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 3 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>
              Faculty Announcements & Circulars
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Broadcast academic notices, lab schedules, and exam guidelines
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            sx={{ bgcolor: '#f59e0b', color: '#000000', fontWeight: 800, '&:hover': { bgcolor: '#fbbf24' } }}
          >
            Post Announcement
          </Button>
        </Box>

        <AlertBanner severity="success" message={alertMsg} onClose={() => setAlertMsg('')} />

        {/* Announcements Stack */}
        <Stack spacing={2.5}>
          {announcements.map((item) => (
            <Paper
              key={item.id}
              sx={{
                p: 3,
                borderRadius: 3.5,
                bgcolor: '#121722',
                border: '1px solid rgba(245, 158, 11, 0.18)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                    <CampaignOutlinedIcon />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc', fontSize: '1.05rem' }}>
                    {item.title}
                  </Typography>
                </Box>
                <Chip
                  label={item.class}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(245, 158, 11, 0.12)',
                    color: '#fbbf24',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    fontWeight: 700,
                  }}
                />
              </Box>

              <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.6, mb: 2, pl: 0.5 }}>
                {item.body}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1.5, borderTop: '1px solid rgba(245, 158, 11, 0.1)' }}>
                <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                  Posted on {item.date} · Dr. Robert Hayes
                </Typography>
                <Chip
                  label="Active Broadcast"
                  size="small"
                  sx={{ bgcolor: 'rgba(16, 185, 129, 0.12)', color: '#34d399', fontSize: '0.68rem', height: 20 }}
                />
              </Box>
            </Paper>
          ))}
        </Stack>

        {/* Modal: Create Announcement */}
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
            Broadcast Faculty Announcement
          </DialogTitle>
          <DialogContent sx={{ pt: '20px !important' }}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Announcement Title"
                placeholder="e.g. Physics Practical Lab Guidelines for Mid-Terms"
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                required
              />

              <TextField
                select
                fullWidth
                label="Target Audience / Class"
                value={newNotice.class}
                onChange={(e) => setNewNotice({ ...newNotice, class: e.target.value })}
              >
                <MenuItem value="All Assigned Classes">All Assigned Classes</MenuItem>
                {DEMO_TEACHER_CLASSES.map((c) => (
                  <MenuItem key={c.id} value={`${c.name} (${c.section})`}>
                    {c.name} ({c.section})
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                multiline
                rows={4}
                fullWidth
                label="Announcement Message"
                placeholder="Write instructions, dates, requirements, or guidelines..."
                value={newNotice.body}
                onChange={(e) => setNewNotice({ ...newNotice, body: e.target.value })}
                required
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(245, 158, 11, 0.15)' }}>
            <Button onClick={() => setOpenModal(false)} sx={{ color: '#94a3b8' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCreateAnnouncement}
              sx={{ bgcolor: '#f59e0b', color: '#000000', fontWeight: 800, '&:hover': { bgcolor: '#fbbf24' } }}
            >
              Post Announcement
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </TeacherDashboardLayout>
  );
};

export default TeacherAnnouncementsPage;
