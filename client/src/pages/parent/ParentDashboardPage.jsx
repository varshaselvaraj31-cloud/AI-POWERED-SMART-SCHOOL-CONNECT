
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Stack,
  Avatar,
  LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';

import ParentDashboardLayout from '../../layouts/ParentDashboardLayout.jsx';
import StatCard from '../../components/dashboard/StatCard.jsx';
import {
    DEMO_PARENT,
    DEMO_PARENT_STATS,
    DEMO_AI_PARENT_ALERTS,
    DEMO_CHILD_SUBJECTS,
    DEMO_CHILD_TODAY,
    DEMO_CHILD_ASSIGNMENTS,
    DEMO_PARENT_NOTICES,
} from '../../data/parentDemo.js';
import { getEffectiveParent } from '../../utils/authStorage.js';

const paperSx = {
    p: 3,
    borderRadius: 3.5,
    bgcolor: '#121722',
    border: '1px solid rgba(245, 158, 11, 0.18)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    height: '100%',
};

const statusColor = {
    pending: '#fbbf24',
    overdue: '#f87171',
    submitted: '#34d399',
};

export const ParentDashboardPage = () => {
    const navigate = useNavigate();
    const parent = getEffectiveParent(DEMO_PARENT);
    const child = parent.linkedStudent || DEMO_PARENT.linkedStudent;
    const openWork = DEMO_CHILD_ASSIGNMENTS.filter((item) => item.status !== 'submitted').slice(0, 4);

    return (
        <ParentDashboardLayout title="Parent Dashboard">
            <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: 'auto' }}>
                <Paper
                    sx={{
                        p: { xs: 2.5, sm: 3.5 },
                        mb: 3,
                        borderRadius: 3.5,
                        background: 'linear-gradient(135deg, #10141e 0%, #181f2e 50%, #0d1117 100%)',
                        border: '1px solid rgba(245, 158, 11, 0.25)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 15px rgba(245, 158, 11, 0.1)',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', md: 'center' },
                        gap: 2,
                    }}
                >
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75, flexWrap: 'wrap' }}>
                            <Chip
                                label="PARENT PORTAL"
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(245, 158, 11, 0.15)',
                                    color: '#fbbf24',
                                    border: '1px solid rgba(245, 158, 11, 0.3)',
                                    fontWeight: 800,
                                    fontSize: '0.68rem',
                                }}
                            />
                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                                Parent ID: {parent.id}
                            </Typography>
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#ffffff', mb: 0.5, fontSize: { xs: '1.5rem', sm: '1.9rem' } }}>
                            Welcome back, {parent.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                            Monitoring {child.name} · {child.grade} · Roll {child.rollNumber} · Class teacher {child.classTeacher}
                        </Typography>
                    </Box>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                        <Button
                            variant="contained"
                            startIcon={<EventAvailableOutlinedIcon />}
                            onClick={() => navigate('/parent/attendance')}
                            sx={{ bgcolor: '#f59e0b', color: '#000000', fontWeight: 800, '&:hover': { bgcolor: '#fbbf24' } }}
                        >
                            View Attendance
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<InsightsOutlinedIcon />}
                            onClick={() => navigate('/parent/academics')}
                            sx={{
                                borderColor: 'rgba(245, 158, 11, 0.4)',
                                color: '#fbbf24',
                                fontWeight: 700,
                                '&:hover': { borderColor: '#fbbf24', bgcolor: 'rgba(245, 158, 11, 0.1)' },
                            }}
                        >
                            Academic Report
                        </Button>
                    </Stack>
                </Paper>

                <Grid container spacing={2.5} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <StatCard
                            title={DEMO_PARENT_STATS.attendanceRate.label}
                            value={DEMO_PARENT_STATS.attendanceRate.value}
                            subtitle={DEMO_PARENT_STATS.attendanceRate.subtitle}
                            icon={<EventAvailableOutlinedIcon />}
                            trend={DEMO_PARENT_STATS.attendanceRate.trend}
                            trendPositive={DEMO_PARENT_STATS.attendanceRate.trendPositive}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <StatCard
                            title={DEMO_PARENT_STATS.overallGPA.label}
                            value={DEMO_PARENT_STATS.overallGPA.value}
                            subtitle={DEMO_PARENT_STATS.overallGPA.subtitle}
                            icon={<InsightsOutlinedIcon />}
                            trend={DEMO_PARENT_STATS.overallGPA.trend}
                            trendPositive={DEMO_PARENT_STATS.overallGPA.trendPositive}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <StatCard
                            title={DEMO_PARENT_STATS.pendingHomework.label}
                            value={DEMO_PARENT_STATS.pendingHomework.value}
                            subtitle={DEMO_PARENT_STATS.pendingHomework.subtitle}
                            icon={<AssignmentOutlinedIcon />}
                            trend={DEMO_PARENT_STATS.pendingHomework.trend}
                            trendPositive={DEMO_PARENT_STATS.pendingHomework.trendPositive}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <StatCard
                            title={DEMO_PARENT_STATS.aiAlertsCount.label}
                            value={DEMO_PARENT_STATS.aiAlertsCount.value}
                            subtitle={DEMO_PARENT_STATS.aiAlertsCount.subtitle}
                            icon={<AutoAwesomeOutlinedIcon />}
                            trend={DEMO_PARENT_STATS.aiAlertsCount.trend}
                            trendPositive={DEMO_PARENT_STATS.aiAlertsCount.trendPositive}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2.5} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 12, lg: 6 }}>
                        <Paper sx={paperSx}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                                        AI Smart Alerts
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                                        Attendance and academic signals for {child.name}
                                    </Typography>
                                </Box>
                                <Chip
                                    label="DEMO DATA"
                                    size="small"
                                    sx={{ bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 800, fontSize: '0.65rem' }}
                                />
                            </Box>
                            <Stack spacing={1.5}>
                                {DEMO_AI_PARENT_ALERTS.map((alert) => {
                                    const warning = alert.severity === 'warning';
                                    return (
                                        <Box
                                            key={alert.id}
                                            sx={{
                                                p: 2,
                                                borderRadius: 2.5,
                                                bgcolor: '#181f2e',
                                                border: `1px solid ${warning ? 'rgba(251, 191, 36, 0.35)' : 'rgba(52, 211, 153, 0.3)'}`,
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                                                <Avatar
                                                    sx={{
                                                        width: 36,
                                                        height: 36,
                                                        bgcolor: warning ? 'rgba(251, 191, 36, 0.15)' : 'rgba(52, 211, 153, 0.12)',
                                                        color: warning ? '#fbbf24' : '#34d399',
                                                    }}
                                                >
                                                    {warning ? <WarningAmberOutlinedIcon fontSize="small" /> : <CheckCircleOutlinedIcon fontSize="small" />}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                                                        {alert.title}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5, fontSize: '0.82rem' }}>
                                                        {alert.message}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: '#d97706', display: 'block', mt: 0.75 }}>
                                                        {alert.timestamp}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>
                        <Paper sx={paperSx}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                                        Today&apos;s Classes
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                                        {child.name}&apos;s Wednesday schedule
                                    </Typography>
                                </Box>
                                <Button
                                    size="small"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => navigate('/parent/timetable')}
                                    sx={{ color: '#fbbf24', fontWeight: 700 }}
                                >
                                    Full week
                                </Button>
                            </Box>
                            <Stack spacing={1.25}>
                                {DEMO_CHILD_TODAY.map((session) => (
                                    <Box
                                        key={`${session.time}-${session.subject}`}
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 2,
                                            bgcolor: '#181f2e',
                                            border: '1px solid rgba(245, 158, 11, 0.12)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            gap: 1,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                                                {session.subject}
                                            </Typography>
                                            <Stack direction="row" spacing={1.5} sx={{ mt: 0.4 }}>
                                                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 0.4 }}>
                                                    <AccessTimeOutlinedIcon sx={{ fontSize: 14 }} /> {session.time}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 0.4 }}>
                                                    <RoomOutlinedIcon sx={{ fontSize: 14 }} /> {session.room}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                        <Chip
                                            label={session.status}
                                            size="small"
                                            sx={{
                                                bgcolor: 'rgba(245, 158, 11, 0.12)',
                                                color: '#fbbf24',
                                                fontWeight: 700,
                                                fontSize: '0.68rem',
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid container spacing={2.5}>
                    <Grid size={{ xs: 12, lg: 7 }}>
                        <Paper sx={paperSx}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                                    Subject Performance
                                </Typography>
                                <Button size="small" endIcon={<ArrowForwardIcon />} onClick={() => navigate('/parent/academics')} sx={{ color: '#fbbf24', fontWeight: 700 }}>
                                    Details
                                </Button>
                            </Box>
                            <Stack spacing={1.75}>
                                {DEMO_CHILD_SUBJECTS.map((subject) => (
                                    <Box key={subject.subject}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                                                {subject.subject}
                                                <Typography component="span" variant="caption" sx={{ color: '#94a3b8', ml: 1 }}>
                                                    {subject.teacher}
                                                </Typography>
                                            </Typography>
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: subject.trend.startsWith('-') ? '#f87171' : '#34d399' }}>
                                                {subject.marks}/{subject.maxMarks} · {subject.grade} · {subject.trend}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={subject.marks}
                                            sx={{
                                                height: 7,
                                                borderRadius: 4,
                                                bgcolor: '#181f2e',
                                                '& .MuiLinearProgress-bar': { borderRadius: 4, bgcolor: '#f59e0b' },
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, lg: 5 }}>
                        <Paper sx={{ ...paperSx, mb: 2.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                                    Open Assignments
                                </Typography>
                                <Button size="small" onClick={() => navigate('/parent/assignments')} sx={{ color: '#fbbf24', fontWeight: 700 }}>
                                    All
                                </Button>
                            </Box>
                            <Stack spacing={1.25}>
                                {openWork.map((item) => (
                                    <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                                        <Box>
                                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#f8fafc' }}>{item.title}</Typography>
                                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>{item.subject} · Due {item.dueDate}</Typography>
                                        </Box>
                                        <Chip
                                            label={item.status}
                                            size="small"
                                            sx={{ bgcolor: 'transparent', color: statusColor[item.status], border: `1px solid ${statusColor[item.status]}`, fontWeight: 700, textTransform: 'capitalize', height: 24 }}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>

                        <Paper sx={paperSx}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc', mb: 1.5 }}>
                                Latest Notices
                            </Typography>
                            <Stack spacing={1.25}>
                                {DEMO_PARENT_NOTICES.slice(0, 2).map((notice) => (
                                    <Box key={notice.id}>
                                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#f8fafc' }}>{notice.title}</Typography>
                                        <Typography variant="caption" sx={{ color: '#d97706' }}>{notice.category} · {notice.date}</Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </ParentDashboardLayout>
    );
};

export default ParentDashboardPage;
