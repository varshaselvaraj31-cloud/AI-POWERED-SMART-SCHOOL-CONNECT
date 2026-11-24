import React, { useState } from 'react';
import { Box } from '@mui/material';
import TeacherSidebar, {
  TEACHER_SIDEBAR_WIDTH,
  TEACHER_SIDEBAR_COLLAPSED_WIDTH,
} from '../components/navigation/TeacherSidebar.jsx';
import DashboardTopBar from '../components/navigation/DashboardTopBar.jsx';
import AIChatbox from '../components/ai/AIChatbox.jsx';
import { getEffectiveTeacher } from '../utils/authStorage.js';
import { DEMO_TEACHER } from '../data/teacherDemo.js';

/**
 * TeacherDashboardLayout – Shell layout with Luxury Gold & Black styling for Faculty.
 */
export const TeacherDashboardLayout = ({ children, title = 'Faculty Dashboard' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const teacher = getEffectiveTeacher(DEMO_TEACHER);
  const sidebarWidth = collapsed ? TEACHER_SIDEBAR_COLLAPSED_WIDTH : TEACHER_SIDEBAR_WIDTH;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0a0d14' }}>
      {/* Teacher Sidebar */}
      <TeacherSidebar
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
        userName={teacher.name}
        portalSubtitle="FACULTY & ACADEMIC PORTAL"
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

export default TeacherDashboardLayout;
