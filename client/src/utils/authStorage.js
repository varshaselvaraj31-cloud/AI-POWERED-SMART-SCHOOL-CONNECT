/**
 * Helper to retrieve currently authenticated user from localStorage.
 */
export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('school_user');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch {
    // Graceful fallback if localStorage is corrupted or inaccessible
  }
  return null;
};

/**
 * Returns initials from a user's full name.
 * e.g. "Sophia Bennett" -> "SB", "Dr. Robert Vance" -> "RV"
 */
export const getUserInitials = (fullName = '') => {
  if (!fullName) return 'U';
  return fullName
    .split(' ')
    .filter((n) => !n.includes('.'))
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'U';
};

/**
 * Merges authenticated student details with fallback demo values.
 */
export const getEffectiveStudent = (demoStudent) => {
  const user = getStoredUser();
  if (user && user.role === 'student') {
    return {
      ...demoStudent,
      name: user.name || demoStudent.name,
      id: user.idNumber || demoStudent.id,
      admissionNumber: user.profile?.admissionNumber || user.idNumber || demoStudent.admissionNumber,
      grade: user.profile?.grade || demoStudent.grade,
      email: user.email || demoStudent.email,
      phone: user.phone || demoStudent.phone,
      parentPhone: user.profile?.parentPhone || demoStudent.parentPhone,
      isRealUser: true,
    };
  }
  return {
    ...demoStudent,
    isRealUser: false,
  };
};

/**
 * Merges authenticated teacher details with fallback demo values.
 */
export const getEffectiveTeacher = (demoTeacher) => {
  const user = getStoredUser();
  if (user && user.role === 'teacher') {
    return {
      ...demoTeacher,
      name: user.name || demoTeacher.name,
      id: user.idNumber || user.profile?.employeeId || demoTeacher.id,
      employeeId: user.profile?.employeeId || user.idNumber || demoTeacher.employeeId,
      department: user.profile?.department || demoTeacher.department,
      email: user.email || demoTeacher.email,
      phone: user.phone || demoTeacher.phone,
      isRealUser: true,
    };
  }
  return {
    ...demoTeacher,
    isRealUser: false,
  };
};

/**
 * Merges authenticated parent details with fallback demo values.
 */
export const getEffectiveParent = (demoParent = {}) => {
  const user = getStoredUser();
  if (user && user.role === 'parent') {
    const fallbackStudent = demoParent.linkedStudent || {};
    const linkedStudentName =
      user.profile?.studentName ||
      user.profile?.linkedStudentName ||
      user.profile?.studentAdmissionNumber ||
      user.linkedStudentName ||
      user.studentAdmissionNumber ||
      fallbackStudent.name ||
      'Linked Student';

    const admissionNum =
      user.profile?.studentAdmissionNumber ||
      user.studentAdmissionNumber ||
      fallbackStudent.admissionNumber ||
      'STU-2026-089';

    return {
      ...demoParent,
      name: user.name || demoParent.name || 'Parent',
      id: user.idNumber || demoParent.id || 'PAR-2026-089',
      email: user.email || demoParent.email || '',
      phone: user.phone || demoParent.phone || '',
      relationship: user.profile?.relationship || demoParent.relationship || 'Guardian',
      linkedStudent: {
        ...fallbackStudent,
        name: linkedStudentName,
        admissionNumber: admissionNum,
        grade: fallbackStudent.grade || 'Grade 11 - Science',
        section: fallbackStudent.section || 'Section A',
      },
      isRealUser: true,
    };
  }
  return {
    ...demoParent,
    isRealUser: false,
  };
};

/**
 * Returns authenticated Master Admin (School Owner) details.
 */
export const getEffectiveAdmin = () => {
  const user = getStoredUser();
  if (user && user.role === 'admin') {
    return {
      name: user.name || 'School Principal (Master Admin)',
      id: user.idNumber || 'ADMIN2026',
      email: user.email || 'admin@smartschool.edu',
      phone: user.phone || '+1 555-0100',
      role: 'admin',
      isRealUser: true,
    };
  }
  return {
    name: 'School Principal (Master Admin)',
    id: 'ADMIN2026',
    email: 'admin@smartschool.edu',
    phone: '+1 555-0100',
    role: 'admin',
    isRealUser: false,
  };
};

export default {
  getStoredUser,
  getUserInitials,
  getEffectiveStudent,
  getEffectiveTeacher,
  getEffectiveParent,
  getEffectiveAdmin,
};
