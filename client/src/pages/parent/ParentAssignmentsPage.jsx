import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ParentDashboardLayout from '../../layouts/ParentDashboardLayout.jsx';
import { DEMO_CHILD_ASSIGNMENTS, DEMO_PARENT } from '../../data/parentDemo.js';
import { getEffectiveParent } from '../../utils/authStorage.js';
import assignmentService from '../../services/assignment.service.js';

const statusColor = {
  pending: '#fbbf24',
  overdue: '#f87171',
  submitted: '#34d399',
};

const ParentAssignmentsPage = () => {
  const parent = getEffectiveParent(DEMO_PARENT);
  const child = parent.linkedStudent || DEMO_PARENT.linkedStudent;
  const [liveAssignments, setLiveAssignments] = useState([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchLive = async () => {
      try {
        const data = await assignmentService.getAssignments();
        if (mounted && Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item) => ({
            id: item._id,
            title: item.title,
            subject: item.subject,
            teacher: item.authorRole || 'Owner (Admin)',
            dueDate: new Date(item.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: item.status || 'pending',
            isLiveBroadcast: true,
          }));
          setLiveAssignments(mapped);
          setIsLive(true);
        }
      } catch (err) {
        console.warn('Parent view fallback to demo assignments:', err);
      }
    };
    fetchLive();
    return () => {
      mounted = false;
    };
  }, []);

  const allAssignments = [...liveAssignments, ...DEMO_CHILD_ASSIGNMENTS];

  return (
    <ParentDashboardLayout title="Assignments">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1100, mx: 'auto' }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <AssignmentOutlinedIcon sx={{ color: '#fbbf24', fontSize: 28 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>
              Homework & Broadcast Tracker
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              {child.name}&apos;s pending, overdue, and owner-broadcasted school tasks
            </Typography>
          </Box>
          <Chip
            label={isLive ? 'LIVE ATLAS CONNECTED' : 'CURRICULUM SYNC'}
            size="small"
            sx={{
              ml: 'auto',
              bgcolor: isLive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              color: isLive ? '#34d399' : '#fbbf24',
              border: isLive ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
              fontWeight: 800,
              fontSize: '0.65rem',
            }}
          />
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 3.5, bgcolor: '#121722', border: '1px solid rgba(245, 158, 11, 0.18)' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Assignment', 'Subject', 'Dispatched By', 'Due', 'Status'].map((head) => (
                  <TableCell key={head} sx={{ color: '#d97706', fontWeight: 800, borderColor: 'rgba(245, 158, 11, 0.12)' }}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allAssignments.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    bgcolor: row.isLiveBroadcast ? 'rgba(245, 158, 11, 0.05)' : 'transparent',
                    '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.08)' },
                  }}
                >
                  <TableCell sx={{ color: '#f8fafc', fontWeight: 700, borderColor: 'rgba(245, 158, 11, 0.08)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {row.title}
                      {row.isLiveBroadcast && (
                        <Chip
                          icon={<CampaignOutlinedIcon sx={{ fontSize: '13px !important', color: '#fbbf24' }} />}
                          label="ADMIN"
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: '0.6rem',
                            fontWeight: 800,
                            bgcolor: 'rgba(245, 158, 11, 0.2)',
                            color: '#fbbf24',
                            border: '1px solid rgba(245, 158, 11, 0.35)',
                          }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#94a3b8', borderColor: 'rgba(245, 158, 11, 0.08)' }}>{row.subject}</TableCell>
                  <TableCell sx={{ color: row.isLiveBroadcast ? '#fbbf24' : '#94a3b8', fontWeight: row.isLiveBroadcast ? 700 : 400, borderColor: 'rgba(245, 158, 11, 0.08)' }}>
                    {row.teacher}
                  </TableCell>
                  <TableCell sx={{ color: '#f8fafc', borderColor: 'rgba(245, 158, 11, 0.08)' }}>{row.dueDate}</TableCell>
                  <TableCell sx={{ borderColor: 'rgba(245, 158, 11, 0.08)' }}>
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{
                        textTransform: 'capitalize',
                        color: statusColor[row.status] || '#fbbf24',
                        bgcolor: `${statusColor[row.status] || '#fbbf24'}20`,
                        border: `1px solid ${statusColor[row.status] || '#fbbf24'}40`,
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
      </Box>
    </ParentDashboardLayout>
  );
};

export default ParentAssignmentsPage;
