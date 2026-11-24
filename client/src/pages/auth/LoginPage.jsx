import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Link as MuiLink,
  Divider,
  Stack,
  Button,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import AuthLayout from '../../layouts/AuthLayout.jsx';
import FormInput from '../../components/common/FormInput.jsx';
import AuthButton from '../../components/common/AuthButton.jsx';
import AlertBanner from '../../components/common/AlertBanner.jsx';
import authService from '../../services/auth.service.js';

// Configuration per institutional role
const ROLE_CONFIG = {
  student: {
    role: 'student',
    title: 'Student Portal Sign In',
    label: 'Student ID Number',
    placeholder: 'Enter Student ID (e.g. STU2026001 or Admission No)',
    icon: <SchoolOutlinedIcon fontSize="small" />,
    helperText: 'Use your Student ID Number or Admission Number.',
    requiredError: 'Student ID Number is required',
  },
  teacher: {
    role: 'teacher',
    title: 'Faculty Portal Sign In',
    label: 'Teacher / Employee ID',
    placeholder: 'Enter Employee ID or School Email (e.g. TEA2026001)',
    icon: <MenuBookOutlinedIcon fontSize="small" />,
    helperText: 'Use your Employee ID (TEA...) or registered faculty email.',
    requiredError: 'Teacher / Employee ID or Email is required',
  },
  parent: {
    role: 'parent',
    title: 'Parent Portal Sign In',
    label: 'Parent Email Address',
    placeholder: 'Enter your registered Email (e.g. parent@example.com)',
    icon: <EmailOutlinedIcon fontSize="small" />,
    helperText: 'Use your registered parent email or linked mobile number.',
    requiredError: 'Parent Email Address is required',
  },
  admin: {
    role: 'admin',
    title: 'Master Admin & Owner Portal',
    label: 'Master Admin / Owner ID or Email',
    placeholder: 'Enter Master ID (e.g. ADMIN2026 or admin@smartschool.edu)',
    icon: <AdminPanelSettingsOutlinedIcon fontSize="small" />,
    helperText: 'Master Institutional Access: Full monitoring, broadcast & management.',
    requiredError: 'Master Admin / Owner ID or Email is required',
  },
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Read state passed from registration redirect if available
  const initialRole =
    location.state?.role && ROLE_CONFIG[location.state.role]
      ? location.state.role
      : 'student';
  const initialIdentifier = location.state?.identifier || '';
  const initialMessage = location.state?.message || '';

  const [selectedRole, setSelectedRole] = useState(initialRole);

  // Form Data - User Input
  const [formData, setFormData] = useState({
    identifier: initialIdentifier,
    password: '',
    rememberMe: false,
  });

  // Error And Loading
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState(initialMessage);

  const currentRoleConfig = ROLE_CONFIG[selectedRole] || ROLE_CONFIG.student;

  // Handle Role Tab Change
  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrors((prev) => ({ ...prev, identifier: '' }));
  };

  // Input Change - Update Form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  // Validate Input
  const validate = () => {
    const newErrors = {};
    if (!formData.identifier.trim()) {
      newErrors.identifier = currentRoleConfig.requiredError;
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setServerSuccess('');
    if (!validate()) return;
    setLoading(true);

    try {
      // Send Identifier and Password To Backend
      const response = await authService.login({
        idNumber: formData.identifier.trim(),
        password: formData.password,
      });

      // Get Token And User From Backend
      const token = response?.data?.token;
      const user = response?.data?.user;

      if (!token || !user || !user.role) {
        throw new Error('Invalid login response from server.');
      }

      // Save Token And User
      localStorage.setItem('school_token', token);
      localStorage.setItem('school_user', JSON.stringify(user));

      setServerSuccess('Login successful! Redirecting...');

      // Role Based Dashboard Redirect
      const roleRoutes = {
        student: '/student/dashboard',
        teacher: '/teacher/dashboard',
        parent: '/parent/dashboard',
        admin: '/admin/dashboard',
      };

      const dashboard = roleRoutes[user.role];
      if (!dashboard) {
        localStorage.removeItem('school_token');
        localStorage.removeItem('school_user');
        throw new Error('Invalid user role.');
      }

      navigate(dashboard, { replace: true });
    } catch (err) {
      setServerError(
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle={currentRoleConfig.title}
      badgeText="Secure Portal Sign In"
    >
      <AlertBanner severity="error" message={serverError} onClose={() => setServerError('')} />
      <AlertBanner severity="success" message={serverSuccess} onClose={() => setServerSuccess('')} />

      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* Role Selector Tabs */}
        <Box
          sx={{
            width: '100%',
            bgcolor: '#121722',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '12px',
            p: 0.6,
            mb: 2.8,
            display: 'flex',
            gap: 0.8,
          }}
        >
          {[
            { key: 'student', label: 'Student', icon: <SchoolOutlinedIcon sx={{ fontSize: 18 }} /> },
            { key: 'teacher', label: 'Teacher', icon: <MenuBookOutlinedIcon sx={{ fontSize: 18 }} /> },
            { key: 'parent', label: 'Parent', icon: <FamilyRestroomOutlinedIcon sx={{ fontSize: 18 }} /> },
            { key: 'admin', label: 'Admin (Owner)', icon: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 18 }} /> },
          ].map((item) => {
            const active = selectedRole === item.key;
            return (
              <Button
                key={item.key}
                type="button"
                fullWidth
                size="small"
                onClick={() => handleRoleChange(item.key)}
                startIcon={item.icon}
                sx={{
                  py: 1,
                  borderRadius: '9px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  color: active ? '#0A0D14' : '#94A3B8',
                  background: active
                    ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                    : 'transparent',
                  boxShadow: active ? '0 2px 10px rgba(245, 158, 11, 0.35)' : 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: active
                      ? 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)'
                      : 'rgba(245, 158, 11, 0.08)',
                    color: active ? '#0A0D14' : '#FBBF24',
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>

        {/* Dynamic Identifier Input (Student ID / Teacher ID / Parent Email) */}
        <FormInput
          label={currentRoleConfig.label}
          name="identifier"
          type={selectedRole === 'parent' ? 'email' : 'text'}
          value={formData.identifier}
          onChange={handleChange}
          placeholder={currentRoleConfig.placeholder}
          helperText={currentRoleConfig.helperText}
          error={errors.identifier}
          required
          autoComplete={selectedRole === 'parent' ? 'email' : 'username'}
          startIcon={currentRoleConfig.icon}
        />

        {/* Password Input */}
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your confidential password"
          error={errors.password}
          required
          autoComplete="current-password"
          startIcon={<LockOutlinedIcon fontSize="small" />}
        />

        {/* Remember Me And Forgot Password */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            mb: 3,
            mt: -0.5,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                size="small"
                color="primary"
              />
            }
            label={
              <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                Remember this device
              </Typography>
            }
          />
          <MuiLink
            component={Link}
            to="/forgot-password"
            variant="body2"
            sx={{
              color: '#fbbf24',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': { textDecoration: 'underline', color: '#f59e0b' },
            }}
          >
            Forgot password?
          </MuiLink>
        </Box>

        {/* Login Button */}
        <AuthButton
          type="submit"
          loading={loading}
          endIcon={<ArrowForwardIcon />}
          sx={{ py: 1.5, fontSize: '1rem', mb: 3 }}
        >
          Sign In as {currentRoleConfig.role.charAt(0).toUpperCase() + currentRoleConfig.role.slice(1)}
        </AuthButton>

        <Divider sx={{ my: 2, borderColor: 'rgba(245, 158, 11, 0.2)' }}>
          <Typography
            variant="caption"
            sx={{ color: '#d97706', px: 1, fontWeight: 700, letterSpacing: '0.05em' }}
          >
            NEW TO SMART SCHOOL CONNECT?
          </Typography>
        </Divider>

        <Typography variant="body2" sx={{ textAlign: 'center', color: '#94a3b8', mb: 2 }}>
          Select your institutional role to create an account:
        </Typography>

        {/* Register Buttons */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button
            component={Link}
            to="/register/student"
            variant="outlined"
            size="small"
            fullWidth
            startIcon={<SchoolOutlinedIcon fontSize="small" />}
            sx={{
              py: 1,
              borderColor: 'rgba(245, 158, 11, 0.35)',
              color: '#fbbf24',
              fontWeight: 700,
              '&:hover': { borderColor: '#fbbf24', bgcolor: 'rgba(245, 158, 11, 0.1)' },
            }}
          >
            Student
          </Button>
          <Button
            component={Link}
            to="/register/teacher"
            variant="outlined"
            size="small"
            fullWidth
            startIcon={<MenuBookOutlinedIcon fontSize="small" />}
            sx={{
              py: 1,
              borderColor: 'rgba(245, 158, 11, 0.35)',
              color: '#fbbf24',
              fontWeight: 700,
              '&:hover': { borderColor: '#fbbf24', bgcolor: 'rgba(245, 158, 11, 0.1)' },
            }}
          >
            Teacher
          </Button>
          <Button
            component={Link}
            to="/register/parent"
            variant="outlined"
            size="small"
            fullWidth
            startIcon={<FamilyRestroomOutlinedIcon fontSize="small" />}
            sx={{
              py: 1,
              borderColor: 'rgba(245, 158, 11, 0.35)',
              color: '#fbbf24',
              fontWeight: 700,
              '&:hover': { borderColor: '#fbbf24', bgcolor: 'rgba(245, 158, 11, 0.1)' },
            }}
          >
            Parent
          </Button>
        </Stack>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
