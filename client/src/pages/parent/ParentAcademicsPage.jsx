import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from '@mui/material';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import ParentDashboardLayout from '../../layouts/ParentDashboardLayout.jsx';
import { DEMO_CHILD_SUBJECTS, DEMO_PARENT, DEMO_PARENT_STATS } from '../../data/parentDemo.js';

const ParentAcademicsPage = () => {
  const child = DEMO_PARENT.linkedStudent;

  return (
    <ParentDashboardLayout title="Academics">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1100, mx: 'auto' }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <InsightsOutlinedIcon sx={{ color: '#fbbf24', fontSize: 28 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>Academic Report</Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              {child.name} · {child.grade} · {DEMO_PARENT_STATS.overallGPA.subtitle}
            </Typography>
          </Box>
          <Chip label="DEMO DATA" size="small" sx={{ ml: 'auto', bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 800, fontSize: '0.65rem' }} />
        </Box>

        <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
          {[
            { label: 'GPA', value: DEMO_PARENT_STATS.overallGPA.value },
            { label: 'Class Rank', value: '#7' },
            { label: 'Strongest Subject', value: 'Computer Sc.' },
            { label: 'Needs Attention', value: 'Chemistry' },
          ].map((item) => (
            <Grid key={item.label} size={{ xs: 6, md: 3 }}>
              <Paper sx={{ p: 2.5, borderRadius: 3.5, bgcolor: '#121722', border: '1px solid rgba(245, 158, 11, 0.18)', textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#fbbf24' }}>{item.value}</Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>{item.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <TableContainer component={Paper} sx={{ borderRadius: 3.5, bgcolor: '#121722', border: '1px solid rgba(245, 158, 11, 0.18)' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Subject', 'Teacher', 'Marks', 'Grade', 'Trend'].map((head) => (
                  <TableCell key={head} sx={{ color: '#d97706', fontWeight: 800, borderColor: 'rgba(245, 158, 11, 0.12)' }}>{head}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {DEMO_CHILD_SUBJECTS.map((row) => (
                <TableRow key={row.subject}>
                  <TableCell sx={{ color: '#f8fafc', fontWeight: 700, borderColor: 'rgba(245, 158, 11, 0.08)' }}>{row.subject}</TableCell>
                  <TableCell sx={{ color: '#94a3b8', borderColor: 'rgba(245, 158, 11, 0.08)' }}>{row.teacher}</TableCell>
                  <TableCell sx={{ color: '#f8fafc', borderColor: 'rgba(245, 158, 11, 0.08)' }}>{row.marks} / {row.maxMarks}</TableCell>
                  <TableCell sx={{ color: '#fbbf24', fontWeight: 800, borderColor: 'rgba(245, 158, 11, 0.08)' }}>{row.grade}</TableCell>
                  <TableCell sx={{ color: row.trend.startsWith('-') ? '#f87171' : '#34d399', fontWeight: 700, borderColor: 'rgba(245, 158, 11, 0.08)' }}>{row.trend}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ParentDashboardLayout>
  );
};

export default ParentAcademicsPage;
