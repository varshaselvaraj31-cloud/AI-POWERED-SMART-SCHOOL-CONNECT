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
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';

import AuthLayout from '../../layouts/AuthLayout.jsx';
import FormInput from '../../components/common/FormInput.jsx';
import AuthButton from '../../components/common/AuthButton.jsx';
import RoleTabs from '../../components/common/RoleTabs.jsx';
import AlertBanner from '../../components/common/AlertBanner.jsx';
import authService from '../../services/auth.service.js';

const RELATIONSHIPS = [
  'Mother',
  'Father',
  'Legal Guardian',
  'Other Family Member',
];

export const ParentRegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    studentAdmissionNumber: '',
    relationship: '',
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
      newErrors.name = 'Parent/Guardian full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.studentAdmissionNumber.trim()) {
      newErrors.studentAdmissionNumber = "Student's Admission ID is required to link records.";
    }

    if (!formData.relationship) {
      newErrors.relationship = 'Please select your relationship to the student.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Emergency contact phone number is required.';
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
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
      newErrors.agreeTerms = 'You must confirm parental consent and notification preferences.';
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
      await authService.registerParent({
        name: formData.name,
        studentAdmissionNumber: formData.studentAdmissionNumber,
        relationship: formData.relationship,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        role: 'parent',
      });

      setServerSuccess('Parent account registered successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login', {
          state: {
            role: 'parent',
            identifier: formData.email || formData.phone,
            message: `Parent registration successful! Please sign in with your Email: ${formData.email}.`,
          },
        });
      }, 1500);
    } catch (err) {
      setServerError(
        err.message || 'Registration failed. Please check the student admission ID or try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Parent Registration"
      subtitle="Track your child's attendance, grades, and receive AI-driven notifications"
      badgeText="Parent Portal"
    >
      <RoleTabs activeRole="parent" />

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
              label="Parent / Guardian Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Eleanor Vance"
              error={errors.name}
              required
              startIcon={<PersonOutlinedIcon fontSize="small" />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Student's Admission No."
              name="studentAdmissionNumber"
              value={formData.studentAdmissionNumber}
              onChange={handleChange}
              placeholder="e.g. STU-2026-089"
              error={errors.studentAdmissionNumber}
              required
              startIcon={<BadgeOutlinedIcon fontSize="small" />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ mb: 2.2, textAlign: 'left' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75, color: errors.relationship ? '#ef4444' : '#f8fafc' }}>
                Relationship <Box component="span" sx={{ color: '#ef4444' }}>*</Box>
              </Typography>
              <TextField
                select
                fullWidth
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                error={Boolean(errors.relationship)}
                helperText={errors.relationship}
              >
                <MenuItem value="" disabled>Select relationship</MenuItem>
                {RELATIONSHIPS.map((r) => (
                  <MenuItem key={r} value={r}>{r}</MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Mobile Phone for Alerts"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 789-0123"
              error={errors.phone}
              required
              startIcon={<PhoneOutlinedIcon fontSize="small" />}
            />
          </Grid>
        </Grid>

        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="eleanor.vance@example.com"
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
                I authorize Smart School Connect to deliver academic progress updates and instant attendance alerts.
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
          startIcon={<EscalatorWarningIcon />}
          sx={{ py: 1.5, fontSize: '1rem', mb: 2.5 }}
        >
          Register as Parent
        </AuthButton>

        <Typography variant="body2" sx={{ textAlign: 'center', color: '#94a3b8' }}>
          Already have a parent account?{' '}
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

export default ParentRegisterPage;
