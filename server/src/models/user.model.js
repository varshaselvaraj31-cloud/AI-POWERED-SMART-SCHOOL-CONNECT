import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    // 1. School ID Number - Login Key
    idNumber: {
      type: String,
      required: [true, "School ID Number is required"],
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    // 2. Email - Now Optional
    email: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "teacher", "student", "parent"],
        message: "Role must be one of: admin, teacher, student, parent",
      },
      default: "student",
      index: true,
    },
    // 3. Phone - Now Required
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    profileRef: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "profileModel",
      default: null,
    },
    profileModel: {
      type: String,
      enum: ["Student", "Teacher", "Parent"],
      default: null,
    },
    passwordResetToken: {
      type: String,
      default: null,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      default: null,
      select: false,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Hash Password Before Save
userSchema.pre("save", async function (next) {
  // Only hash password if it was modified (or is new)
  if (!this.isModified("password") || !this.password) return next();
  // Protect against double hashing if already a bcrypt hash
  if (this.password.startsWith("$2a$") || this.password.startsWith("$2b$")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
export default User;
