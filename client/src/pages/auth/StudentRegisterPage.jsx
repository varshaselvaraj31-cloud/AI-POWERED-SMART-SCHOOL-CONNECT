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
import HowToRegIcon from '@mui/icons-material/HowToReg';

import AuthLayout from '../../layouts/AuthLayout.jsx';
import FormInput from '../../components/common/FormInput.jsx';
import AuthButton from '../../components/common/AuthButton.jsx';
import RoleTabs from '../../components/common/RoleTabs.jsx';
import AlertBanner from '../../components/common/AlertBanner.jsx';
import authService from '../../services/auth.service.js';

const GRADES = [
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11 - Science',
  'Grade 11 - Commerce',
  'Grade 11 - Arts',
  'Grade 12 - Science',
  'Grade 12 - Commerce',
  'Grade 12 - Arts',
];

export const StudentRegisterPage = () => {
  const navigate = useNavigate();

  // 1. Form Data
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    admissionNumber: '',
    grade: '',
    email: '',
    phone: '',
    parentPhone: '',
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

  // 2. Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'School ID Number is required.';
    }
    if (!formData.admissionNumber.trim()) {
      newErrors.admissionNumber = 'Student Admission ID is required.';
    }
    if (!formData.grade) {
      newErrors.grade = 'Please select your current grade/class.';
    }
    if (formData.email.trim() && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Student phone number is required.';
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.parentPhone.trim()) {
      newErrors.parentPhone = 'Parent contact phone number is required for alerts.';
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.parentPhone.replace(/[\s-]/g, ''))) {
      newErrors.parentPhone = 'Please enter a valid phone number (e.g. +1 555-0199).';
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
      newErrors.agreeTerms = 'You must agree to the academic privacy terms.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 3. Submit - Send ID Number And Phone To Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setServerSuccess('');
    if (!validate()) return;
    setLoading(true);
    try {
      await authService.registerStudent({
        name: formData.name,
        idNumber: formData.idNumber,
        admissionNumber: formData.admissionNumber,
        grade: formData.grade,
        email: formData.email,
        phone: formData.phone,
        parentPhone: formData.parentPhone,
        password: formData.password,
        role: 'student',
      });
      setServerSuccess('Student account registered successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login', {
          state: {
            role: 'student',
            identifier: formData.idNumber || formData.admissionNumber,
            message: `Registration successful! Please sign in with your Student ID: ${formData.idNumber}.`,
          },
        });
      }, 1500);
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please check your data or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Student Registration"
      subtitle="Join the AI-Powered Smart School academic intelligence network"
      badgeText="Student Portal"
    >
      <RoleTabs activeRole="student" />
      <AlertBanner severity="error" message={serverError} onClose={() => setServerError('')} />
      <AlertBanner severity="success" message={serverSuccess} onClose={() => setServerSuccess('')} />
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sophia Bennett"
              error={errors.name}
              required
              startIcon={<PersonOutlinedIcon fontSize="small" />}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="School ID Number"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="e.g. STU2026001"
              error={errors.idNumber}
              required
              startIcon={<BadgeOutlinedIcon fontSize="small" />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Admission / Roll No."
              name="admissionNumber"
              value={formData.admissionNumber}
              onChange={handleChange}
              placeholder="e.g. STU-2026-089"
              error={errors.admissionNumber}
              required
              startIcon={<BadgeOutlinedIcon fontSize="small" />}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ mb: 2.2, textAlign: 'left' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75, color: errors.grade ? '#ef4444' : '#f8fafc' }}>
                Grade / Class <Box component="span" sx={{ color: '#ef4444' }}>*</Box>
              </Typography>
              <TextField select fullWidth name="grade" value={formData.grade} onChange={handleChange} error={Boolean(errors.grade)} helperText={errors.grade}>
                <MenuItem value="" disabled>Select your grade</MenuItem>
                {GRADES.map((g) => (
                  <MenuItem key={g} value={g}>{g}</MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Student Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              error={errors.phone}
              required
              startIcon={<PhoneOutlinedIcon fontSize="small" />}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Parent / Guardian Phone"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              placeholder="+1 (555) 019-2834"
              error={errors.parentPhone}
              required
              startIcon={<PhoneOutlinedIcon fontSize="small" />}
            />
          </Grid>
        </Grid>

        <FormInput
          label="Student Academic Email (Optional)"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="sophia.bennett@smartschool.edu"
          error={errors.email}
          startIcon={<EmailOutlinedIcon fontSize="small" />}
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Minimum 6 characters" error={errors.password} required startIcon={<LockOutlinedIcon fontSize="small" />} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-type password" error={errors.confirmPassword} required startIcon={<LockOutlinedIcon fontSize="small" />} />
          </Grid>
        </Grid>

        <Box sx={{ mb: 3, textAlign: 'left' }}>
          <FormControlLabel
            control={<Checkbox name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} size="small" color="primary" />}
            label={<Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>I agree to the institutional code of conduct and academic honor code.</Typography>}
          />
          {errors.agreeTerms && (
            <Typography variant="caption" sx={{ color: '#ef4444', display: 'block', mt: 0.25 }}>{errors.agreeTerms}</Typography>
          )}
        </Box>

        <AuthButton type="submit" loading={loading} startIcon={<HowToRegIcon />} sx={{ py: 1.5, fontSize: '1rem', mb: 2.5 }}>
          Create Student Account
        </AuthButton>

        <Typography variant="body2" sx={{ textAlign: 'center', color: '#94a3b8' }}>
          Already have an account?{' '}
          <MuiLink component={Link} to="/login" sx={{ color: '#fbbf24', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: '#f59e0b' } }}>
            Sign In here
          </MuiLink>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default StudentRegisterPage;
