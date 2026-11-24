import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Link as MuiLink,
  FormControlLabel,
  Checkbox,
  MenuItem,
  TextField,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CoPresentIcon from '@mui/icons-material/CoPresent';

import AuthLayout from '../../layouts/AuthLayout.jsx';
import FormInput from '../../components/common/FormInput.jsx';
import AuthButton from '../../components/common/AuthButton.jsx';
import RoleTabs from '../../components/common/RoleTabs.jsx';
import AlertBanner from '../../components/common/AlertBanner.jsx';
import authService from '../../services/auth.service.js';

const DEPARTMENTS = [
  'Computer Science & AI',
  'Mathematics & Statistics',
  'Physics & Natural Sciences',
  'Chemistry & Biology',
  'English & Literature',
  'Social Sciences & History',
  'Physical Education & Athletics',
  'Fine Arts & Performing Arts',
];

export const TeacherRegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    department: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = 'Faculty / Employee ID is required.';
    }

    if (!formData.department) {
      newErrors.department = 'Please select your academic department.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'School faculty email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmation password is required.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must confirm institutional faculty affiliation.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setServerSuccess('');

    if (!validate()) return;

    setLoading(true);
    try {
      await authService.registerTeacher({
        name: formData.name,
        employeeId: formData.employeeId,
        department: formData.department,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        role: 'teacher',
      });

      setServerSuccess('Faculty account registered successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login', {
          state: {
            role: 'teacher',
            identifier: formData.employeeId || formData.email,
            message: `Faculty registration successful! Please sign in with your Employee ID: ${formData.employeeId}.`,
          },
        });
      }, 1500);
    } catch (err) {
      setServerError(
        err.message || 'Registration failed. Please check your data or try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Teacher Registration"
      subtitle="Access AI-driven grading, attendance tracking, and student insights"
      badgeText="Faculty Portal"
    >
      <RoleTabs activeRole="teacher" />

      <AlertBanner
        severity="error"
        message={serverError}
        onClose={() => setServerError('')}
      />
      <AlertBanner
        severity="success"
        message={serverSuccess}
        onClose={() => setServerSuccess('')}
      />

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Faculty Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Dr. Robert Hayes"
              error={errors.name}
              required
              startIcon={<PersonOutlinedIcon fontSize="small" />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Employee / Faculty ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="e.g. FAC-2026-102"
              error={errors.employeeId}
              required
              startIcon={<BadgeOutlinedIcon fontSize="small" />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ mb: 2.2, textAlign: 'left' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75, color: errors.department ? '#ef4444' : '#f8fafc' }}>
                Academic Department <Box component="span" sx={{ color: '#ef4444' }}>*</Box>
              </Typography>
              <TextField
                select
                fullWidth
                name="department"
                value={formData.department}
                onChange={handleChange}
                error={Boolean(errors.department)}
                helperText={errors.department}
              >
                <MenuItem value="" disabled>Select department</MenuItem>
                {DEPARTMENTS.map((d) => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Contact Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 345-6789"
              error={errors.phone}
              required
              startIcon={<PhoneOutlinedIcon fontSize="small" />}
            />
          </Grid>
        </Grid>

        <FormInput
          label="Institutional Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="robert.hayes@smartschool.edu"
          error={errors.email}
          required
          startIcon={<EmailOutlinedIcon fontSize="small" />}
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              error={errors.password}
              required
              startIcon={<LockOutlinedIcon fontSize="small" />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-type password"
              error={errors.confirmPassword}
              required
              startIcon={<LockOutlinedIcon fontSize="small" />}
            />
          </Grid>
        </Grid>

        <Box sx={{ mb: 3, textAlign: 'left' }}>
          <FormControlLabel
            control={
              <Checkbox
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                size="small"
                color="primary"
              />
            }
            label={
              <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                I verify that I am an authorized faculty member and agree to student data privacy guidelines.
              </Typography>
            }
          />
          {errors.agreeTerms && (
            <Typography variant="caption" sx={{ color: '#ef4444', display: 'block', mt: 0.25 }}>
              {errors.agreeTerms}
            </Typography>
          )}
        </Box>

        <AuthButton
          type="submit"
          loading={loading}
          startIcon={<CoPresentIcon />}
          sx={{ py: 1.5, fontSize: '1rem', mb: 2.5 }}
        >
          Register as Faculty
        </AuthButton>

        <Typography variant="body2" sx={{ textAlign: 'center', color: '#94a3b8' }}>
          Already have a faculty account?{' '}
          <MuiLink
            component={Link}
            to="/login"
            sx={{
              color: '#fbbf24',
              fontWeight: 700,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline', color: '#f59e0b' },
            }}
          >
            Sign In here
          </MuiLink>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default TeacherRegisterPage;
