import React from 'react';
import { Box, Typography, Grid, Chip, LinearProgress, Paper, Stack } from '@mui/material';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import ParentDashboardLayout from '../../layouts/ParentDashboardLayout.jsx';
import { DEMO_CHILD_ATTENDANCE, DEMO_PARENT } from '../../data/parentDemo.js';

const cardSx = {
  bgcolor: '#121722',
  borderRadius: 3.5,
  p: 2.5,
  textAlign: 'center',
  border: '1px solid rgba(245, 158, 11, 0.18)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
};

const statusTone = {
  Present: '#34d399',
  Absent: '#f87171',
  Late: '#fbbf24',
};

const ParentAttendancePage = () => {
  const child = DEMO_PARENT.linkedStudent;
  const data = DEMO_CHILD_ATTENDANCE;

  return (
    <ParentDashboardLayout title="Child Attendance">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <EventAvailableOutlinedIcon sx={{ color: '#fbbf24', fontSize: 28 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>
              {child.name}&apos;s Attendance
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              {child.grade} · Academic Year 2026–27 · Read-only parent view
            </Typography>
          </Box>
          <Chip label="DEMO DATA" size="small" sx={{ ml: 'auto', bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 800, fontSize: '0.65rem' }} />
        </Box>

        <Grid container spacing={2.5}>
          {[
            { label: 'Overall Attendance', value: `${data.percentage}%`, color: '#fbbf24' },
            { label: 'Present Days', value: data.present, color: '#f8fafc' },
            { label: 'Absent Days', value: data.absent, color: '#f87171' },
            { label: 'Late Arrivals', value: data.late, color: '#fbbf24' },
          ].map((item) => (
            <Grid key={item.label} size={{ xs: 6, sm: 3 }}>
              <Box sx={cardSx}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: item.color }}>{item.value}</Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>{item.label}</Typography>
              </Box>
            </Grid>
          ))}

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ ...cardSx, textAlign: 'left', p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f8fafc', mb: 2 }}>
                Monthly Breakdown
              </Typography>
              <Stack spacing={1.75}>
                {data.months.map((month) => (
                  <Box key={month.month}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#f8fafc' }}>{month.month}</Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                        {month.present} present · {month.absent} absent · {month.percentage}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={month.percentage}
                      sx={{ height: 7, borderRadius: 4, bgcolor: '#181f2e', '& .MuiLinearProgress-bar': { borderRadius: 4, bgcolor: month.percentage < 75 ? '#f87171' : '#f59e0b' } }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ ...cardSx, textAlign: 'left', p: 3, mb: 2.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f8fafc', mb: 2 }}>
                Subject-wise Attendance
              </Typography>
              {data.subjects.map((item) => (
                <Box key={item.subject} sx={{ mb: 1.75 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#f8fafc' }}>{item.subject}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: item.pct < 85 ? '#fbbf24' : '#34d399' }}>{item.pct}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={item.pct}
                    sx={{ height: 7, borderRadius: 4, bgcolor: '#181f2e', '& .MuiLinearProgress-bar': { borderRadius: 4, bgcolor: '#f59e0b' } }}
                  />
                </Box>
              ))}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Paper sx={{ ...cardSx, textAlign: 'left', p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f8fafc', mb: 2 }}>
                Recent Attendance Log
              </Typography>
              <Stack spacing={1.25}>
                {data.recent.map((row) => (
                  <Box
                    key={`${row.date}-${row.subject}`}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 1,
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: '#181f2e',
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#f8fafc' }}>{row.date} · {row.subject}</Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>{row.note}</Typography>
                    </Box>
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{ color: statusTone[row.status], border: `1px solid ${statusTone[row.status]}`, bgcolor: 'transparent', fontWeight: 700 }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ParentDashboardLayout>
  );
};

export default ParentAttendancePage;
