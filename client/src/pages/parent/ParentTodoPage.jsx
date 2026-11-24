import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import ParentDashboardLayout from "../../layouts/ParentDashboardLayout.jsx";
import TodoListPanel from "../../components/dashboard/TodoListPanel.jsx";
import { PARENT_TODOS } from "../../data/todoDemo.js";

const ParentTodoPage = () => (
    <ParentDashboardLayout title="To-Do List">
        <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 900, mx: "auto" }}>
            <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
                <ChecklistOutlinedIcon sx={{ color: "#fbbf24", fontSize: 28 }} />
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "#f8fafc" }}>
                        Parent To-Do List
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                        Three tasks for consent, fees, and the parent meeting
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
            <TodoListPanel items={PARENT_TODOS} />
        </Box>
    </ParentDashboardLayout>
);

export default ParentTodoPage;
