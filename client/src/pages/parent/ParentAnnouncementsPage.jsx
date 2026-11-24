import React from 'react';
import { Box, Typography, Paper, Chip, Stack } from '@mui/material';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ParentDashboardLayout from '../../layouts/ParentDashboardLayout.jsx';
import { DEMO_PARENT_NOTICES } from '../../data/parentDemo.js';

const ParentAnnouncementsPage = () => (
  <ParentDashboardLayout title="Notices">
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 900, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <CampaignOutlinedIcon sx={{ color: '#fbbf24', fontSize: 28 }} />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>Parent Notices</Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>Meetings, report cards, and school events</Typography>
        </Box>
        <Chip label="DEMO DATA" size="small" sx={{ ml: 'auto', bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 800, fontSize: '0.65rem' }} />
      </Box>

      <Stack spacing={2}>
        {DEMO_PARENT_NOTICES.map((notice) => (
          <Paper key={notice.id} sx={{ p: 2.5, borderRadius: 3.5, bgcolor: '#121722', border: '1px solid rgba(245, 158, 11, 0.18)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f8fafc' }}>{notice.title}</Typography>
              <Chip label={notice.category} size="small" sx={{ bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontWeight: 700 }} />
            </Box>
            <Typography variant="body2" sx={{ color: '#cbd5e1', mb: 1 }}>{notice.body}</Typography>
            <Typography variant="caption" sx={{ color: '#d97706' }}>{notice.date}</Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  </ParentDashboardLayout>
);

export default ParentAnnouncementsPage;
