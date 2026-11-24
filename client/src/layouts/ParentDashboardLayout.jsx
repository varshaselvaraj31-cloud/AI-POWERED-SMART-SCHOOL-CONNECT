import React, { useState } from 'react';
import { Box } from '@mui/material';
import ParentSidebar, {
  PARENT_SIDEBAR_WIDTH,
  PARENT_SIDEBAR_COLLAPSED_WIDTH,
} from '../components/navigation/ParentSidebar.jsx';
import DashboardTopBar from '../components/navigation/DashboardTopBar.jsx';
import AIChatbox from '../components/ai/AIChatbox.jsx';
import { getEffectiveParent } from '../utils/authStorage.js';
import { DEMO_PARENT } from '../data/parentDemo.js';

export const ParentDashboardLayout = ({ children, title = 'Parent Dashboard' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const parent = getEffectiveParent(DEMO_PARENT);
  const sidebarWidth = collapsed ? PARENT_SIDEBAR_COLLAPSED_WIDTH : PARENT_SIDEBAR_WIDTH;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0a0d14' }}>
      <ParentSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />

      <DashboardTopBar
        onMobileMenuToggle={() => setMobileOpen(true)}
        sidebarWidth={sidebarWidth}
        title={title}
        userName={parent.name}
        portalSubtitle="PARENT & CHILD MONITORING PORTAL"
      />

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

export default ParentDashboardLayout;
