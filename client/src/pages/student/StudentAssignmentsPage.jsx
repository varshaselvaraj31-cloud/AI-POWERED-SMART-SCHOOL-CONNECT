import React, { useState } from 'react';
import {
  Box, Typography, Chip, Stack
} from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DashboardLayout from '../../layouts/DashboardLayout.jsx';
import AssignmentsCard from '../../components/dashboard/AssignmentsCard.jsx';
import { DEMO_ASSIGNMENTS } from '../../data/studentDemo.js';

const StudentAssignmentsPage = () => {
  const [tab, setTab] = useState('all');

  const counts = {
    all: DEMO_ASSIGNMENTS.length,
    pending: DEMO_ASSIGNMENTS.filter(a => a.status === 'pending').length,
    overdue: DEMO_ASSIGNMENTS.filter(a => a.status === 'overdue').length,
    submitted: DEMO_ASSIGNMENTS.filter(a => a.status === 'submitted').length,
  };

  return (
    <DashboardLayout title="Assignments">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>

        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <AssignmentOutlinedIcon sx={{ color: '#fbbf24', fontSize: 28 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>Assignments</Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>All pending, submitted, and overdue tasks</Typography>
          </Box>
          <Chip label="DEMO DATA" size="small" sx={{ ml: 'auto', bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 800, fontSize: '0.65rem' }} />
        </Box>

        {/* Stat chips row */}
        <Stack direction="row" spacing={1.5} sx={{ mb: 3, flexWrap: 'wrap' }}>
          {[
            { label: `All (${counts.all})`, value: 'all', color: '#475569', bg: '#f1f5f9' },
            { label: `Pending (${counts.pending})`, value: 'pending', color: '#d97706', bg: '#fef3c7' },
            { label: `Overdue (${counts.overdue})`, value: 'overdue', color: '#dc2626', bg: '#fee2e2' },
            { label: `Submitted (${counts.submitted})`, value: 'submitted', color: '#059669', bg: '#d1fae5' },
          ].map((item) => (
            <Chip
              key={item.value}
              label={item.label}
              clickable
              onClick={() => setTab(item.value)}
              sx={{
                fontWeight: 700,
                bgcolor: tab === item.value ? item.color : item.bg,
                color: tab === item.value ? '#ffffff' : item.color,
                border: `1px solid ${item.color}40`,
              }}
            />
          ))}
        </Stack>

        <AssignmentsCard limit={50} filterStatus={tab} />
      </Box>
    </DashboardLayout>
  );
};

export default StudentAssignmentsPage;
