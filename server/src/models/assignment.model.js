import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Assignment title is required'],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    targetGrade: {
      type: String,
      required: [true, 'Target grade is required'],
      default: 'All Grades',
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    instructions: {
      type: String,
      default: '',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'high',
    },
    status: {
      type: String,
      enum: ['pending', 'submitted', 'overdue'],
      default: 'pending',
    },
    authorRole: {
      type: String,
      default: 'Owner (Admin)',
    },
    authorId: {
      type: String,
      default: 'ADMIN2026',
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment;
