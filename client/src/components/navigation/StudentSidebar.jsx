import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  Tooltip,
  IconButton,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { DEMO_STUDENT } from '../../data/studentDemo.js';
import { getEffectiveStudent, getUserInitials } from '../../utils/authStorage.js';

export const SIDEBAR_WIDTH = 240;
export const SIDEBAR_COLLAPSED_WIDTH = 72;

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    path: '/student/dashboard',
    icon: <DashboardOutlinedIcon />,
  },
  {
    label: 'My Attendance',
    path: '/student/attendance',
    icon: <EventAvailableOutlinedIcon />,
  },
  {
    label: 'Assignments',
    path: '/student/assignments',
    icon: <AssignmentOutlinedIcon />,
  },
  {
    label: 'Timetable',
    path: '/student/timetable',
    icon: <CalendarMonthOutlinedIcon />,
  },
  {
    label: 'Academic Performance',
    path: '/student/performance',
    icon: <BarChartOutlinedIcon />,
  },
  {
    label: 'Announcements',
    path: '/student/announcements',
    icon: <CampaignOutlinedIcon />,
  },
  {
    label: 'To-Do List',
    path: '/student/todo',
    icon: <ChecklistOutlinedIcon />,
  },
];

const BOTTOM_ITEMS = [
  {
    label: 'My Profile',
    path: '/student/profile',
    icon: <AccountCircleOutlinedIcon />,
  },
];

/**
 * StudentSidebar – Persistent left sidebar for the Student Dashboard.
 * Supports a collapsed mode on desktop and a drawer on mobile.
 * Uses React Router for active route detection.
 */
const StudentSidebar = ({ mobileOpen, onMobileClose, collapsed, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('school_token');
    localStorage.removeItem('school_user');
    navigate('/login');
  };

  const student = getEffectiveStudent(DEMO_STUDENT);
  const initials = getUserInitials(student.name);

  const sidebarContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#090c13', // Deep Black Sidebar
        color: '#f8fafc',
        overflow: 'hidden',
        borderRight: '1px solid rgba(245, 158, 11, 0.18)',
      }}
    >
      {/* Logo Header */}
      <Box
        sx={{
          px: collapsed ? 1.5 : 2.5,
          py: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: '1px solid rgba(245, 158, 11, 0.15)',
          minHeight: 72,
        }}
      >
        {!collapsed && (
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}
            >
              Smart School{' '}
              <Box component="span" sx={{ color: '#fbbf24' }}>
                Connect
              </Box>
            </Typography>
            <Typography variant="caption" sx={{ color: '#d97706', fontSize: '0.68rem', letterSpacing: '0.06em', fontWeight: 700 }}>
              STUDENT PORTAL
            </Typography>
          </Box>
        )}
        <IconButton
          size="small"
          onClick={onToggleCollapse}
          sx={{
            color: '#fbbf24',
            '&:hover': { color: '#ffffff', bgcolor: 'rgba(245, 158, 11, 0.15)' },
          }}
        >
          {collapsed ? (
            <Box sx={{ fontSize: 20, fontWeight: 800, color: '#fbbf24' }}>S</Box>
          ) : (
            <ChevronLeftIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      {/* Student Mini Profile */}
      {!collapsed && (
        <Box
          sx={{
            px: 2.5,
            py: 2,
            mx: 1.5,
            mt: 1.5,
            borderRadius: 2.5,
            bgcolor: '#121722',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Avatar
            sx={{
              width: 38,
              height: 38,
              background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
              color: '#000000',
              fontSize: '0.9rem',
              fontWeight: 800,
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
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
              {student.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#d97706', fontSize: '0.72rem', fontWeight: 600 }}>
              {student.grade}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Nav Label */}
      {!collapsed && (
        <Typography
          variant="caption"
          sx={{
            px: 3,
            pt: 2.5,
            pb: 0.75,
            color: '#94a3b8',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontSize: '0.68rem',
          }}
        >
          Navigation
        </Typography>
      )}

      {/* Main Nav Items */}
      <List sx={{ flex: 1, px: 1, py: 0.5 }}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <Tooltip
              key={item.path}
              title={collapsed ? item.label : ''}
              placement="right"
              arrow
            >
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                    onMobileClose?.();
                  }}
                  sx={{
                    borderRadius: 2,
                    px: collapsed ? 1.5 : 2,
                    py: 1,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    background: active
                      ? 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)'
                      : 'transparent',
                    color: active ? '#000000' : '#cbd5e1',
                    boxShadow: active ? '0 4px 15px rgba(245, 158, 11, 0.35)' : 'none',
                    '&:hover': {
                      background: active
                        ? 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)'
                        : 'rgba(245, 158, 11, 0.1)',
                      color: active ? '#000000' : '#fbbf24',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed ? 'auto' : 36,
                      color: active ? '#000000' : '#94a3b8',
                      '& .MuiSvgIcon-root': { fontSize: 20 },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && (
                    <ListItemText
                      primary={item.label}
                      slotProps={{
                        primary: {
                          sx: { fontSize: '0.875rem', fontWeight: active ? 800 : 500 },
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          );
        })}
      </List>

      {/* Divider & Bottom Items */}
      <Divider sx={{ borderColor: 'rgba(245, 158, 11, 0.15)', mx: 2 }} />

      <List sx={{ px: 1, py: 1 }}>
        {BOTTOM_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <Tooltip
              key={item.path}
              title={collapsed ? item.label : ''}
              placement="right"
              arrow
            >
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                    onMobileClose?.();
                  }}
                  sx={{
                    borderRadius: 2,
                    px: collapsed ? 1.5 : 2,
                    py: 1,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    color: active ? '#000000' : '#cbd5e1',
                    background: active
                      ? 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)'
                      : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(245, 158, 11, 0.1)',
                      color: '#fbbf24',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed ? 'auto' : 36,
                      color: active ? '#000000' : 'inherit',
                      '& .MuiSvgIcon-root': { fontSize: 20 },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && (
                    <ListItemText
                      primary={item.label}
                      slotProps={{ primary: { sx: { fontSize: '0.875rem', fontWeight: active ? 800 : 500 } } }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          );
        })}

        {/* Logout */}
        <Tooltip title={collapsed ? 'Logout' : ''} placement="right" arrow>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                px: collapsed ? 1.5 : 2,
                py: 1,
                justifyContent: collapsed ? 'center' : 'flex-start',
                color: '#94a3b8',
                '&:hover': { bgcolor: '#7f1d1d20', color: '#f87171' },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed ? 'auto' : 36,
                  color: 'inherit',
                  '& .MuiSvgIcon-root': { fontSize: 20 },
                }}
              >
                <LogoutOutlinedIcon />
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary="Logout"
                  slotProps={{ primary: { sx: { fontSize: '0.875rem', fontWeight: 500 } } }}
                />
              )}
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            border: 'none',
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Desktop Persistent Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            border: 'none',
            transition: 'width 0.25s ease',
            overflowX: 'hidden',
          },
        }}
        open
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default StudentSidebar;
