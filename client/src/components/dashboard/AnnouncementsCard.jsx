import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, Stack, Collapse, IconButton } from '@mui/material';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { DEMO_ANNOUNCEMENTS } from '../../data/studentDemo.js';
import assignmentService from '../../services/assignment.service.js';

const CATEGORY_CONFIG = {
  Exam: { color: '#f87171', bg: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.25)' },
  Event: { color: '#fbbf24', bg: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.25)' },
  General: { color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.12)', border: '1px solid rgba(148, 163, 184, 0.25)' },
  Sports: { color: '#34d399', bg: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)' },
  Broadcast: { color: '#fbbf24', bg: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)' },
};

/**
 * AnnouncementsCard – Displays recent school announcements and live Admin broadcasts.
 */
const AnnouncementsCard = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [liveBroadcasts, setLiveBroadcasts] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchBroadcasts = async () => {
      try {
        const data = await assignmentService.getAssignments();
        if (mounted && Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item) => ({
            id: `broadcast-${item._id}`,
            title: `[NEW ASSIGNMENT] ${item.title}`,
            category: 'Broadcast',
            date: new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            content: `Subject: ${item.subject} | Grade: ${item.targetGrade} | Due: ${new Date(item.dueDate).toLocaleDateString()}. Please check the assignments section and submit on time.`,
            isLive: true,
          }));
          setLiveBroadcasts(mapped);
        }
      } catch (err) {
        // Fallback
      }
    };
    fetchBroadcasts();
    return () => {
      mounted = false;
    };
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const formatDate = (dateStr) => {
    return dateStr;
  };

  const allAnnouncements = [...liveBroadcasts, ...DEMO_ANNOUNCEMENTS];

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CampaignOutlinedIcon sx={{ fontSize: 20, color: '#fbbf24' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f8fafc' }}>
            School Announcements
          </Typography>
        </Box>
        <Chip
          label={liveBroadcasts.length > 0 ? `${liveBroadcasts.length} LIVE BROADCAST` : 'CURRICULUM SYNC'}
          size="small"
          sx={{
            bgcolor: liveBroadcasts.length > 0 ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.15)',
            color: '#fbbf24',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            fontWeight: 800,
            fontSize: '0.65rem',
          }}
        />
      </Box>

      {/* Announcements List */}
      <Stack divider={<Box sx={{ borderTop: '1px solid rgba(245, 158, 11, 0.08)' }} />}>
        {allAnnouncements.slice(0, 5).map((announcement) => {
          const catCfg = CATEGORY_CONFIG[announcement.category] || CATEGORY_CONFIG.General;
          const isExpanded = expandedId === announcement.id;

          return (
            <Box
              key={announcement.id}
              sx={{
                px: 3,
                py: 2,
                cursor: 'pointer',
                bgcolor: announcement.isLive ? 'rgba(245, 158, 11, 0.05)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.08)' },
                transition: 'background-color 0.15s',
              }}
              onClick={() => toggleExpand(announcement.id)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 0 }}>
                  <Chip
                    label={announcement.category}
                    size="small"
                    sx={{
                      bgcolor: catCfg.bg,
                      color: catCfg.color,
                      border: catCfg.border,
                      fontWeight: 700,
                      fontSize: '0.68rem',
                      height: 22,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: '#f8fafc',
                      whiteSpace: isExpanded ? 'normal' : 'nowrap',
                      overflow: isExpanded ? 'visible' : 'hidden',
                      textOverflow: isExpanded ? 'clip' : 'ellipsis',
                    }}
                  >
                    {announcement.title}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    {formatDate(announcement.date)}
                  </Typography>
                  <IconButton size="small" sx={{ p: 0.25, color: '#fbbf24' }}>
                    {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                  </IconButton>
                </Box>
              </Box>

              <Collapse in={isExpanded}>
                <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px dashed rgba(245, 158, 11, 0.15)' }}>
                  <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.85rem' }}>
                    {announcement.content}
                  </Typography>
                </Box>
              </Collapse>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default AnnouncementsCard;
