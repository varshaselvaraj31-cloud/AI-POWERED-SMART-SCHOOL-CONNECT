import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import DashboardLayout from '../../layouts/DashboardLayout.jsx';
import { STUDENT_TODOS } from '../../data/todoDemo.js';

const StudentTodoPage = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('student_todos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return STUDENT_TODOS;
      }
    }
    return STUDENT_TODOS;
  });

  const [filter, setFilter] = useState('All');
  const [openModal, setOpenModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  const saveTodos = (updated) => {
    setTodos(updated);
    localStorage.setItem('student_todos', JSON.stringify(updated));
  };

  const toggleTodo = (id) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, status: t.status === 'Done' ? 'Pending' : 'Done' } : t
    );
    saveTodos(updated);
  };

  const deleteTodo = (id) => {
    const updated = todos.filter((t) => t.id !== id);
    saveTodos(updated);
  };

  const handleAddTodo = () => {
    if (!newTitle.trim()) return;
    const item = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      detail: newDetail.trim() || 'Self-assigned Task',
      dueDate: newDueDate || new Date().toISOString().split('T')[0],
      dueTime: '06:00 PM',
      note: 'Added from Student Portal',
      status: 'Pending',
    };
    saveTodos([item, ...todos]);
    setNewTitle('');
    setNewDetail('');
    setNewDueDate('');
    setOpenModal(false);
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === 'All') return true;
    return t.status === filter;
  });

  const doneCount = todos.filter((t) => t.status === 'Done').length;
  const progressPercent = todos.length > 0 ? Math.round((doneCount / todos.length) * 100) : 0;

  return (
    <DashboardLayout title="To-Do List">
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1000, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <ChecklistOutlinedIcon sx={{ color: '#fbbf24', fontSize: 32 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                Student Daily Task Tracker
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                Keep track of daily homework, science projects, and study goals.
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            sx={{
              bgcolor: '#fbbf24',
              color: '#0a0d14',
              fontWeight: 800,
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': { bgcolor: '#f59e0b' },
            }}
          >
            Add Task
          </Button>
        </Box>

        {/* Progress Card */}
        <Box
          sx={{
            p: 2.5,
            mb: 3,
            borderRadius: 3,
            bgcolor: '#121722',
            border: '1px solid rgba(245, 158, 11, 0.25)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f8fafc' }}>
              Completion Progress: {doneCount} of {todos.length} Completed
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#fbbf24' }}>
              {progressPercent}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'rgba(255,255,255,0.08)',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#fbbf24',
              },
            }}
          />
        </Box>

        {/* Filter Tabs */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          {['All', 'Pending', 'Done'].map((f) => (
            <Chip
              key={f}
              label={`${f} (${todos.filter((t) => (f === 'All' ? true : t.status === f)).length})`}
              clickable
              onClick={() => setFilter(f)}
              sx={{
                fontWeight: 700,
                bgcolor: filter === f ? '#fbbf24' : '#181f2e',
                color: filter === f ? '#0a0d14' : '#94a3b8',
                border: filter === f ? 'none' : '1px solid rgba(245, 158, 11, 0.15)',
              }}
            />
          ))}
        </Box>

        {/* Task Cards */}
        {filteredTodos.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6, color: '#94a3b8' }}>
            <Typography>No tasks found in this section.</Typography>
          </Box>
        ) : (
          filteredTodos.map((todo) => {
            const isDone = todo.status === 'Done';
            return (
              <Card
                key={todo.id}
                sx={{
                  mb: 1.5,
                  borderRadius: 3,
                  bgcolor: '#121722',
                  border: isDone ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(245, 158, 11, 0.2)',
                  transition: 'all 0.2s',
                  '&:hover': { borderColor: '#fbbf24' },
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: '16px !important' }}>
                  <Checkbox
                    checked={isDone}
                    onChange={() => toggleTodo(todo.id)}
                    sx={{
                      color: 'rgba(245, 158, 11, 0.5)',
                      '&.Mui-checked': { color: '#10b981' },
                    }}
                  />

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: isDone ? '#94a3b8' : '#f8fafc',
                        textDecoration: isDone ? 'line-through' : 'none',
                      }}
                    >
                      {todo.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 600, display: 'block' }}>
                      {todo.detail || todo.subject}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      Due {todo.dueDate} {todo.dueTime ? `· ${todo.dueTime}` : ''} {todo.note ? `· ${todo.note}` : ''}
                    </Typography>
                  </Box>

                  <Chip
                    label={todo.status}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      fontSize: '0.68rem',
                      bgcolor: isDone ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: isDone ? '#34d399' : '#fbbf24',
                      border: isDone ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                    }}
                  />

                  <IconButton size="small" onClick={() => deleteTodo(todo.id)} sx={{ color: '#64748b', '&:hover': { color: '#ef4444' } }}>
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </CardContent>
              </Card>
            );
          })
        )}

        {/* Add Modal */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { bgcolor: '#121722', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#ffffff', borderRadius: 3 } }}>
          <DialogTitle sx={{ fontWeight: 800, color: '#fbbf24' }}>Add New Task</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px !important' }}>
            <TextField
              label="Task Title (e.g. Maths Chapter 5 Exercises)"
              fullWidth
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(245, 158, 11, 0.3)' } }, '& .MuiInputLabel-root': { color: '#94a3b8' } }}
            />
            <TextField
              label="Subject / Detail (e.g. Mathematics - Sec A)"
              fullWidth
              value={newDetail}
              onChange={(e) => setNewDetail(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(245, 158, 11, 0.3)' } }, '& .MuiInputLabel-root': { color: '#94a3b8' } }}
            />
            <TextField
              label="Due Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(245, 158, 11, 0.3)' } }, '& .MuiInputLabel-root': { color: '#94a3b8' } }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenModal(false)} sx={{ color: '#94a3b8' }}>Cancel</Button>
            <Button variant="contained" onClick={handleAddTodo} sx={{ bgcolor: '#fbbf24', color: '#0a0d14', fontWeight: 800, '&:hover': { bgcolor: '#f59e0b' } }}>Save Task</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DashboardLayout>
  );
};

export default StudentTodoPage;
