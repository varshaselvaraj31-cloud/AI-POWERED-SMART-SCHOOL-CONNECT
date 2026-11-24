import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import { DEMO_ASSIGNMENTS } from '../../data/studentDemo.js';
import assignmentService from '../../services/assignment.service.js';

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    color: '#fbbf24',
    bg: 'rgba(245, 158, 11, 0.12)',
    border: '1px solid rgba(245, 158, 11, 0.25)',
    icon: <AssignmentOutlinedIcon sx={{ fontSize: 15 }} />,
  },
  submitted: {
    label: 'Submitted',
    color: '#34d399',
    bg: 'rgba(16, 185, 129, 0.12)',
    border: '1px solid rgba(16, 185, 129, 0.25)',
    icon: <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 15 }} />,
  },
  overdue: {
    label: 'Overdue',
    color: '#f87171',
    bg: 'rgba(239, 68, 68, 0.12)',
    border: '1px solid rgba(239, 68, 68, 0.25)',
    icon: <AssignmentLateOutlinedIcon sx={{ fontSize: 15 }} />,
  },
};

const PRIORITY_COLOR = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981',
};

/**
 * AssignmentsCard – Displays live broadcasted assignments from Owner/Admin
 * with seamless fallback to curriculum demo assignments.
 */
const AssignmentsCard = ({ limit = 6, filterStatus = 'all' }) => {
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
            dueDate: item.dueDate,
            status: item.status || 'pending',
            priority: item.priority || 'high',
            authorRole: item.authorRole || 'Owner (Admin)',
            isLiveBroadcast: true,
          }));
          setLiveAssignments(mapped);
          setIsLive(true);
        }
      } catch (err) {
        console.warn('Using demo assignments fallback:', err);
      }
    };
    fetchLive();
    return () => {
      mounted = false;
    };
  }, []);

  // Merge live broadcasts at the top
  const combined = [...liveAssignments, ...DEMO_ASSIGNMENTS];
  const filtered = filterStatus === 'all'
    ? combined
    : combined.filter((a) => a.status === filterStatus);
  const displayedAssignments = filtered.slice(0, limit);

  const formatDueDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Box
      sx={{
        bgcolor: '#121722',
        borderRadius: 3.5,
        border: '1px solid rgba(245, 158, 11, 0.18)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        height: '100%',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(245, 158, 11, 0.12)',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f8fafc' }}>
          Recent Assignments
        </Typography>
        <Chip
          label={isLive ? 'LIVE ATLAS CONNECTED' : 'CURRICULUM SYNC'}
          size="small"
          sx={{
            bgcolor: isLive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            color: isLive ? '#34d399' : '#fbbf24',
            border: isLive ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
            fontWeight: 800,
            fontSize: '0.65rem',
          }}
        />
      </Box>

      {/* Assignment List */}
      <Stack divider={<Box sx={{ borderTop: '1px solid rgba(245, 158, 11, 0.08)' }} />}>
        {displayedAssignments.map((assignment) => {
          const statusCfg = STATUS_CONFIG[assignment.status] || STATUS_CONFIG.pending;
          return (
            <Box
              key={assignment.id}
              sx={{
                px: 3,
                py: 1.75,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: assignment.isLiveBroadcast ? 'rgba(245, 158, 11, 0.04)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.08)' },
                cursor: 'default',
              }}
            >
              {/* Priority Dot */}
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: PRIORITY_COLOR[assignment.priority] || '#f59e0b',
                  flexShrink: 0,
                }}
              />

              {/* Title + Subject */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: '#f8fafc',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {assignment.title}
                  </Typography>
                  {assignment.isLiveBroadcast && (
                    <Chip
                      icon={<CampaignOutlinedIcon sx={{ fontSize: '13px !important', color: '#fbbf24' }} />}
                      label="ADMIN BROADCAST"
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
                <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 600 }}>
                  {assignment.subject}
                </Typography>
              </Box>

              {/* Due Date */}
              <Typography variant="caption" sx={{ color: '#94a3b8', flexShrink: 0 }}>
                Due {formatDueDate(assignment.dueDate)}
              </Typography>

              {/* Status Badge */}
              <Chip
                icon={statusCfg.icon}
                label={statusCfg.label}
                size="small"
                sx={{
                  bgcolor: statusCfg.bg,
                  color: statusCfg.color,
                  border: statusCfg.border,
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  height: 22,
                  flexShrink: 0,
                  '& .MuiChip-icon': { color: statusCfg.color, fontSize: '14px !important' },
                }}
              />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default AssignmentsCard;
