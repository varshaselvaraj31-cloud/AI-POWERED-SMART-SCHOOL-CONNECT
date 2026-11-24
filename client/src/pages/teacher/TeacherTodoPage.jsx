import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import TeacherDashboardLayout from "../../layouts/TeacherDashboardLayout.jsx";
import TodoListPanel from "../../components/dashboard/TodoListPanel.jsx";
import { TEACHER_TODOS } from "../../data/todoDemo.js";

const TeacherTodoPage = () => (
    <TeacherDashboardLayout title="To-Do List">
        <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 900, mx: "auto" }}>
            <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
                <ChecklistOutlinedIcon sx={{ color: "#fbbf24", fontSize: 28 }} />
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "#f8fafc" }}>
                        Faculty To-Do List
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                        Three tasks for grading, attendance, and class prep
                    </Typography>
                </Box>
                <Chip
                    label="3 TASKS"
                    size="small"
                    sx={{
                        ml: "auto",
                        bgcolor: "rgba(245, 158, 11, 0.15)",
                        color: "#fbbf24",
                        border: "1px solid rgba(245, 158, 11, 0.3)",
                        fontWeight: 800,
                        fontSize: "0.65rem",
                    }}
                />
            </Box>
            <TodoListPanel items={TEACHER_TODOS} />
        </Box>
    </TeacherDashboardLayout>
);

export default TeacherTodoPage;
