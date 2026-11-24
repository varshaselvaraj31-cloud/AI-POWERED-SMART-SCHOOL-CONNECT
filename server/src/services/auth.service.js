import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { User, Student, Teacher, Parent } from "../models/index.js";
import { ApiError } from "../utils/apiError.js";

// Helper: Generate JWT Token
const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
};

// Helper: Safe User Payload
const formatUserPayload = (user, profile = null) => ({
  id: user._id,
  name: user.name,
  idNumber: user.idNumber,
  email: user.email,
  role: user.role,
  phone: user.phone,
  avatar: user.avatar,
  isActive: user.isActive,
  createdAt: user.createdAt,
  ...(profile && { profile }),
});

// Helper: Check Required Fields
const requireFields = (fields, body) => {
  const missing = fields.filter((f) => !body[f] || String(body[f]).trim() === "");
  if (missing.length > 0) {
    throw new ApiError(400, `Missing required fields: ${missing.join(", ")}`);
  }
};

// 1. Register Student
export const registerStudent = async (data) => {
  const { name, idNumber, password, admissionNumber, grade, parentPhone, phone, email } = data;

  requireFields(["name", "idNumber", "password", "admissionNumber", "grade", "parentPhone", "phone"], data);

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long.");
  }

  const existingUser = await User.findOne({ idNumber: idNumber.trim().toUpperCase() });
  if (existingUser) {
    throw new ApiError(409, "An account with this ID Number already exists. Please log in.");
  }

  if (email && email.trim()) {
    const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingEmail) {
      throw new ApiError(409, `An account with email "${email.trim()}" already exists. Please use a different email or log in.`);
    }
  }

  const existingAdmission = await Student.findOne({
    admissionNumber: admissionNumber.trim().toUpperCase(),
  });
  if (existingAdmission) {
    throw new ApiError(409, "A student profile with this Admission Number already exists.");
  }

  const user = await User.create({
    name: name.trim(),
    idNumber: idNumber.trim().toUpperCase(),
    email: email ? email.toLowerCase().trim() : undefined,
    password,
    role: "student",
    phone: phone.trim(),
    profileModel: "Student",
  });

  const studentProfile = await Student.create({
    user: user._id,
    admissionNumber: admissionNumber.trim().toUpperCase(),
    grade: grade.trim(),
    parentPhone: parentPhone.trim(),
  });

  user.profileRef = studentProfile._id;
  await User.findByIdAndUpdate(user._id, { profileRef: studentProfile._id });

  const token = generateToken(user._id, user.role);
  return { token, user: formatUserPayload(user, studentProfile) };
};

// 2. Register Teacher
export const registerTeacher = async (data) => {
  const { name, password, employeeId, department, phone, email } = data;
  const idNumber = (data.idNumber || employeeId || '').trim().toUpperCase();

  requireFields(["name", "password", "employeeId", "department", "phone"], data);

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long.");
  }

  const existingUser = await User.findOne({ idNumber });
  if (existingUser) {
    throw new ApiError(409, "An account with this Employee / ID Number already exists. Please log in.");
  }

  if (email && email.trim()) {
    const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingEmail) {
      throw new ApiError(409, `An account with email "${email.trim()}" already exists. Please use a different email or log in.`);
    }
  }

  const existingEmployee = await Teacher.findOne({
    employeeId: employeeId.trim().toUpperCase(),
  });
  if (existingEmployee) {
    throw new ApiError(409, "A teacher profile with this Employee ID already exists.");
  }

  const user = await User.create({
    name: name.trim(),
    idNumber,
    email: email ? email.toLowerCase().trim() : undefined,
    password,
    role: "teacher",
    phone: phone.trim(),
    profileModel: "Teacher",
  });

  const teacherProfile = await Teacher.create({
    user: user._id,
    employeeId: employeeId.trim().toUpperCase(),
    department: department.trim(),
  });

  user.profileRef = teacherProfile._id;
  await User.findByIdAndUpdate(user._id, { profileRef: teacherProfile._id });

  const token = generateToken(user._id, user.role);
  return { token, user: formatUserPayload(user, teacherProfile) };
};

// 3. Register Parent
export const registerParent = async (data) => {
  const { name, password, studentAdmissionNumber, relationship, phone, email } = data;
  const idNumber = (data.idNumber || phone || email || `PAR-${studentAdmissionNumber}`).trim().toUpperCase();

  requireFields(["name", "password", "studentAdmissionNumber", "relationship", "phone"], data);

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long.");
  }

  const existingUser = await User.findOne({ idNumber });
  if (existingUser) {
    throw new ApiError(409, "An account with this phone or ID already exists. Please log in.");
  }

  if (email && email.trim()) {
    const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingEmail) {
      throw new ApiError(409, `An account with email "${email.trim()}" already exists. Please use a different email or log in.`);
    }
  }

  // 3. Register Parent
  // Note: If linkedStudent exists in DB, link it; otherwise allow registration with the provided admission number/name
  let linkedStudent = await Student.findOne({
    admissionNumber: studentAdmissionNumber.trim().toUpperCase(),
  }).populate('user', 'name');

  const user = await User.create({
    name: name.trim(),
    idNumber,
    email: email ? email.toLowerCase().trim() : undefined,
    password,
    role: "parent",
    phone: phone.trim(),
    profileModel: "Parent",
  });

  const parentProfile = await Parent.create({
    user: user._id,
    studentAdmissionNumber: studentAdmissionNumber.trim().toUpperCase(),
    relationship: relationship.trim(),
    linkedStudent: linkedStudent ? linkedStudent._id : null,
  });

  user.profileRef = parentProfile._id;
  await User.findByIdAndUpdate(user._id, { profileRef: parentProfile._id });

  const token = generateToken(user._id, user.role);

  const profilePayload = {
    ...parentProfile.toObject(),
    studentAdmissionNumber: studentAdmissionNumber.trim().toUpperCase(),
    studentName: linkedStudent?.user?.name || studentAdmissionNumber.trim().toUpperCase(),
  };

  return { token, user: formatUserPayload(user, profilePayload) };
};

// 4. Login - ID Number / Admission Number / Email Login
export const loginUser = async (data) => {
  const identifier = (data.idNumber || data.identifier || data.email || "").trim();
  const { password } = data;

  if (!identifier || !password) {
    throw new ApiError(400, "Both ID Number and password are required to log in.");
  }

  const upperId = identifier.toUpperCase();
  const lowerId = identifier.toLowerCase();

  // 1. Check User by ID Number, Email, or Phone
  let user = await User.findOne({
    $or: [
      { idNumber: upperId },
      { email: lowerId },
      { phone: identifier },
    ],
  }).select("+password");

  // 2. If not found, check if a student used their Admission / Roll No
  if (!user) {
    const student = await Student.findOne({ admissionNumber: upperId });
    if (student && student.user) {
      user = await User.findById(student.user).select("+password");
    }
  }

  // 3. If not found, check if a teacher used their Employee ID
  if (!user) {
    const teacher = await Teacher.findOne({ employeeId: upperId });
    if (teacher && teacher.user) {
      user = await User.findById(teacher.user).select("+password");
    }
  }

  if (!user) {
    throw new ApiError(401, "Invalid credentials. Please check your ID Number and password.");
  }

  if (!user.isActive) {
    throw new ApiError(403, "This account has been deactivated. Please contact school administration.");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials. Please check your ID Number and password.");
  }

  // Update lastLoginAt without re-saving whole doc
  await User.findByIdAndUpdate(user._id, { lastLoginAt: new Date() });

  // Populate profile details
  let profile = null;
  if (user.role === 'student') {
    profile = await Student.findOne({ user: user._id });
  } else if (user.role === 'teacher') {
    profile = await Teacher.findOne({ user: user._id });
  } else if (user.role === 'parent') {
    const parentDoc = await Parent.findOne({ user: user._id }).populate({
      path: 'linkedStudent',
      populate: { path: 'user', select: 'name' }
    });
    if (parentDoc) {
      profile = {
        ...parentDoc.toObject(),
        studentName: parentDoc.linkedStudent?.user?.name || parentDoc.studentAdmissionNumber,
        studentAdmissionNumber: parentDoc.studentAdmissionNumber,
      };
    }
  }

  const token = generateToken(user._id, user.role);
  return { token, user: formatUserPayload(user, profile) };
};

// 5. Get Current User
export const getMe = async (userId) => {
  const user = await User.findById(userId).populate("profileRef");
  if (!user) {
    throw new ApiError(404, "User profile not found.");
  }
  return formatUserPayload(user, user.profileRef);
};

// 6. Forgot Password
export const forgotPassword = async (idNumber) => {
  if (!idNumber || !idNumber.trim()) {
    throw new ApiError(400, "ID Number is required to initiate password reset.");
  }

  const user = await User.findOne({ idNumber: idNumber.trim().toUpperCase() });

  if (!user) {
    return {
      message: "If an account with this ID exists, password reset instructions have been sent.",
    };
  }

  return {
    message: "If an account with this ID exists, password reset instructions have been sent.",
  };
};

export default {
  registerStudent,
  registerTeacher,
  registerParent,
  loginUser,
  getMe,
  forgotPassword,
};
