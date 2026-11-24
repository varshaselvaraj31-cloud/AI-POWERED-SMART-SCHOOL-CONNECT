import React, { useState } from 'react';
import { Box } from '@mui/material';
import AdminSidebar, {
  ADMIN_SIDEBAR_WIDTH,
  ADMIN_SIDEBAR_COLLAPSED_WIDTH,
} from '../components/navigation/AdminSidebar.jsx';
import DashboardTopBar from '../components/navigation/DashboardTopBar.jsx';
import AIChatbox from '../components/ai/AIChatbox.jsx';
import { getEffectiveAdmin } from '../utils/authStorage.js';

/**
 * AdminDashboardLayout – Shell layout with Luxury Gold & Black styling for School Owner/Principal.
 */
export const AdminDashboardLayout = ({ children, title = 'Master Control Center' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const admin = getEffectiveAdmin();
  const sidebarWidth = collapsed ? ADMIN_SIDEBAR_COLLAPSED_WIDTH : ADMIN_SIDEBAR_WIDTH;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0a0d14' }}>
      {/* Admin Sidebar */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />

      {/* Top App Bar */}
      <DashboardTopBar
        onMobileMenuToggle={() => setMobileOpen(true)}
        sidebarWidth={sidebarWidth}
        title={title}
        userName={admin.name}
        portalSubtitle="INSTITUTIONAL OWNER & MANAGEMENT SUITE"
      />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: `${sidebarWidth}px` },
          mt: '64px',
          transition: 'margin 0.25s ease',
          minHeight: 'calc(100vh - 64px)',
          overflow: 'auto',
          bgcolor: '#0a0d14',
        }}
      >
        {children}
      </Box>

      {/* Floating Smart School AI Assistant */}
      <AIChatbox />
    </Box>
  );
};

export default AdminDashboardLayout;
