import React from 'react';
import { Box, Typography, Paper, Grid, Avatar, Chip, Divider } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ParentDashboardLayout from '../../layouts/ParentDashboardLayout.jsx';
import { DEMO_PARENT } from '../../data/parentDemo.js';
import { getEffectiveParent, getUserInitials } from '../../utils/authStorage.js';

const InfoRow = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
    <Box sx={{ color: '#fbbf24', mr: 2, display: 'flex', alignItems: 'center' }}>{icon}</Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, color: '#f8fafc' }}>{value}</Typography>
    </Box>
  </Box>
);

const ParentProfilePage = () => {
  const parent = getEffectiveParent(DEMO_PARENT);
  const initials = getUserInitials(parent.name);
  const child = parent.linkedStudent || DEMO_PARENT.linkedStudent;

  return (
    <ParentDashboardLayout title="Parent Profile">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1000, mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>Parent Profile</Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Guardian account and linked student</Typography>
          </Box>
          <Chip
            label={parent.isRealUser ? 'ACTIVE GUARDIAN ACCOUNT' : 'PARENT ID'}
            size="small"
            sx={{
              ml: 'auto',
              bgcolor: parent.isRealUser ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              color: parent.isRealUser ? '#10b981' : '#fbbf24',
              border: parent.isRealUser ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
              fontWeight: 800,
              fontSize: '0.65rem',
            }}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper sx={{ borderRadius: 3.5, border: '1px solid rgba(245, 158, 11, 0.2)', p: 3, textAlign: 'center', bgcolor: '#121722' }}>
              <Avatar sx={{ width: 90, height: 90, background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)', color: '#000', fontSize: '2rem', fontWeight: 800, mx: 'auto', mb: 2 }}>
                {initials}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc' }}>{parent.name}</Typography>
              <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 600 }}>{parent.relationship}</Typography>
              <Box sx={{ mt: 2 }}>
                <Chip label={`ID: ${parent.id}`} size="small" sx={{ bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontWeight: 800 }} />
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 8 }}>
            <Paper sx={{ borderRadius: 3.5, border: '1px solid rgba(245, 158, 11, 0.2)', p: 3, bgcolor: '#121722', mb: 2.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f8fafc', mb: 1 }}>Contact</Typography>
              <InfoRow icon={<EmailOutlinedIcon />} label="Email" value={parent.email} />
              <Divider sx={{ borderColor: 'rgba(245, 158, 11, 0.12)' }} />
              <InfoRow icon={<PhoneOutlinedIcon />} label="Phone" value={parent.phone} />
              <Divider sx={{ borderColor: 'rgba(245, 158, 11, 0.12)' }} />
              <InfoRow icon={<HomeOutlinedIcon />} label="Address" value={parent.address} />
              <Divider sx={{ borderColor: 'rgba(245, 158, 11, 0.12)' }} />
              <InfoRow icon={<FamilyRestroomOutlinedIcon />} label="Joined" value={parent.joinedDate} />
            </Paper>

            <Paper sx={{ borderRadius: 3.5, border: '1px solid rgba(245, 158, 11, 0.2)', p: 3, bgcolor: '#121722' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f8fafc', mb: 1 }}>Linked Student Details</Typography>
              <InfoRow icon={<BadgeOutlinedIcon />} label="Student Name" value={child.name} />
              <Divider sx={{ borderColor: 'rgba(245, 158, 11, 0.12)' }} />
              <InfoRow icon={<SchoolOutlinedIcon />} label="Admission ID" value={child.admissionNumber} />
              <Divider sx={{ borderColor: 'rgba(245, 158, 11, 0.12)' }} />
              <InfoRow icon={<SchoolOutlinedIcon />} label="Class & Grade" value={`${child.grade} · ${child.section || 'Sec A'}`} />
              <Divider sx={{ borderColor: 'rgba(245, 158, 11, 0.12)' }} />
              <InfoRow icon={<SchoolOutlinedIcon />} label="Class Teacher" value={child.classTeacher || 'Faculty Teacher'} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ParentDashboardLayout>
  );
};

export default ParentProfilePage;
