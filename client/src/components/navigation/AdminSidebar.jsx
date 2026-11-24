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
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { getEffectiveAdmin, getUserInitials } from '../../utils/authStorage.js';

export const ADMIN_SIDEBAR_WIDTH = 250;
export const ADMIN_SIDEBAR_COLLAPSED_WIDTH = 72;

const ADMIN_NAV_ITEMS = [
  {
    label: 'Overview & Stats',
    tab: 0,
    path: '/admin/dashboard',
    icon: <DashboardOutlinedIcon />,
  },
  {
    label: 'Broadcast Assignment',
    tab: 0,
    path: '/admin/dashboard?tab=assignments',
    icon: <AssignmentOutlinedIcon />,
  },
  {
    label: 'Student Directory',
    tab: 1,
    path: '/admin/dashboard?tab=students',
    icon: <SchoolOutlinedIcon />,
  },
  {
    label: 'Teacher Directory',
    tab: 2,
    path: '/admin/dashboard?tab=teachers',
    icon: <MenuBookOutlinedIcon />,
  },
  {
    label: 'Parent Directory',
    tab: 3,
    path: '/admin/dashboard?tab=parents',
    icon: <FamilyRestroomOutlinedIcon />,
  },
  {
    label: 'Broadcast History',
    tab: 4,
    path: '/admin/dashboard?tab=broadcasts',
    icon: <CampaignOutlinedIcon />,
  },
];

export const AdminSidebar = ({
  mobileOpen,
  onMobileClose,
  collapsed,
  onToggleCollapse,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const admin = getEffectiveAdmin();
  const initials = getUserInitials(admin.name);

  const isActive = (itemPath) => {
    const current = location.pathname + location.search;
    if (itemPath === '/admin/dashboard' && (!location.search || location.search === '?tab=assignments')) {
      return current === '/admin/dashboard' || current === '/admin/dashboard?tab=assignments';
    }
    return current === itemPath;
  };

  const handleLogout = () => {
    localStorage.removeItem('school_token');
    localStorage.removeItem('school_user');
    navigate('/login');
  };

  const sidebarContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#090c13',
        color: '#f8fafc',
        overflow: 'hidden',
        borderRight: '1px solid rgba(245, 158, 11, 0.25)',
      }}
    >
      {/* Brand Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: '1px solid rgba(245, 158, 11, 0.15)',
        }}
      >
        {!collapsed && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.3px', lineHeight: 1.2 }}
            >
              Smart School{' '}
              <Box component="span" sx={{ color: '#fbbf24' }}>
                Connect
              </Box>
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: '#d97706', fontSize: '0.68rem', letterSpacing: '0.08em', fontWeight: 800 }}
            >
              MASTER OWNER PORTAL
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
            <AdminPanelSettingsOutlinedIcon sx={{ color: '#fbbf24' }} />
          ) : (
            <ChevronLeftIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      {/* Admin Profile Badge */}
      {!collapsed && (
        <Box
          sx={{
            px: 2,
            py: 1.75,
            mx: 1.5,
            mt: 1.5,
            borderRadius: 2.5,
            bgcolor: '#121722',
            border: '1px solid rgba(245, 158, 11, 0.3)',
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
              fontSize: '0.85rem',
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
              {admin.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#10b981', fontSize: '0.72rem', fontWeight: 700 }}>
              ● SUPER ADMIN (OWNER)
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
          Management Hub
        </Typography>
      )}

      {/* Nav List */}
      <List sx={{ flex: 1, px: 1, py: 0.5, overflowY: 'auto' }}>
        {ADMIN_NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <Tooltip key={item.path} title={collapsed ? item.label : ''} placement="right" arrow>
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

      <Divider sx={{ borderColor: 'rgba(245, 158, 11, 0.15)', mx: 2 }} />

      {/* Logout */}
      <List sx={{ px: 1, py: 1 }}>
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
                  primary="Sign Out"
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
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: ADMIN_SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            border: 'none',
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: collapsed ? ADMIN_SIDEBAR_COLLAPSED_WIDTH : ADMIN_SIDEBAR_WIDTH,
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

export default AdminSidebar;
