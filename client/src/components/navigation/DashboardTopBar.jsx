import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  Badge,
  Tooltip,
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { DEMO_STUDENT } from '../../data/studentDemo.js';

/**
 * DashboardTopBar – Top navigation bar with Gold & Black theme.
 */
const DashboardTopBar = ({
  onMobileMenuToggle,
  sidebarWidth = 240,
  title = 'Dashboard',
  userName = null,
  portalSubtitle = 'AI-POWERED SMART SCHOOL CONNECT',
}) => {
  const displayName = userName || DEMO_STUDENT.name;
  const initials = displayName
    .split(' ')
    .filter((n) => !n.includes('.'))
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'U';

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        ml: { md: `${sidebarWidth}px` },
        width: { md: `calc(100% - ${sidebarWidth}px)` },
        bgcolor: '#10141e', // Dark Onyx Topbar
        borderBottom: '1px solid rgba(245, 158, 11, 0.18)',
        color: '#f8fafc',
        transition: 'width 0.25s ease, margin 0.25s ease',
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 }, minHeight: '64px !important' }}>
        {/* Mobile Menu Toggle */}
        <IconButton
          edge="start"
          onClick={onMobileMenuToggle}
          sx={{ mr: 1.5, display: { md: 'none' }, color: '#fbbf24' }}
        >
          <MenuIcon />
        </IconButton>

        {/* Page Title */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: '#f8fafc', fontSize: { xs: '1rem', sm: '1.15rem' } }}
          >
            {title}
          </Typography>
          <Typography variant="caption" sx={{ color: '#d97706', display: { xs: 'none', sm: 'block' }, fontWeight: 600 }}>
            {portalSubtitle}
          </Typography>
        </Box>

        {/* Demo Badge */}
        <Chip
          label="DEMO MODE"
          size="small"
          sx={{
            bgcolor: 'rgba(245, 158, 11, 0.15)',
            color: '#fbbf24',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            fontWeight: 800,
            fontSize: '0.65rem',
            mr: 2,
            display: { xs: 'none', sm: 'flex' },
          }}
        />

        {/* Notification Bell */}
        <Tooltip title="Notifications">
          <IconButton sx={{ color: '#fbbf24', mr: 1 }}>
            <Badge badgeContent={3} color="primary">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* User Avatar */}
        <Tooltip title={displayName}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
              color: '#000000',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              border: '2px solid rgba(245, 158, 11, 0.4)',
            }}
          >
            {initials}
          </Avatar>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardTopBar;
