import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Checkbox, Chip, Button } from "@mui/material";

const FILTERS = ["All", "Pending", "Done"];

const TodoListPanel = ({ items }) => {
    const [todos, setTodos] = useState(items);
    const [filter, setFilter] = useState("All");

    const toggleTodo = (id) => {
        setTodos((current) =>
            current.map((todo) =>
                todo.id === id
                    ? { ...todo, status: todo.status === "Done" ? "Pending" : "Done" }
                    : todo
            )
        );
    };

    const filteredTodos = todos.filter((todo) => filter === "All" || todo.status === filter);
    const doneCount = todos.filter((todo) => todo.status === "Done").length;

    return (
        <Box>
            <Typography variant="body2" sx={{ color: "#94a3b8", mb: 2 }}>
                {doneCount} / {todos.length} Done
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                {FILTERS.map((name) => (
                    <Button
                        key={name}
                        variant={filter === name ? "contained" : "outlined"}
                        onClick={() => setFilter(name)}
                        sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            ...(filter === name
                                ? { bgcolor: "#f59e0b", color: "#000", "&:hover": { bgcolor: "#d97706" } }
                                : { borderColor: "rgba(245, 158, 11, 0.4)", color: "#fbbf24" }),
                        }}
                    >
                        {name}
                    </Button>
                ))}
            </Box>

            {filteredTodos.map((todo) => (
                <Card
                    key={todo.id}
                    sx={{
                        mb: 1.5,
                        bgcolor: "#121722",
                        border: "1px solid rgba(245, 158, 11, 0.18)",
                        boxShadow: "none",
                    }}
                >
                    <CardContent sx={{ display: "flex", alignItems: "center", gap: 1, "&:last-child": { pb: 2 } }}>
                        <Checkbox
                            checked={todo.status === "Done"}
                            onChange={() => toggleTodo(todo.id)}
                            sx={{ color: "#fbbf24", "&.Mui-checked": { color: "#fbbf24" } }}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    color: "#f8fafc",
                                    textDecoration: todo.status === "Done" ? "line-through" : "none",
                                }}
                            >
                                {todo.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                                {todo.detail} · Due {todo.dueDate} {todo.dueTime}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                                {todo.note}
                            </Typography>
                        </Box>
                        <Chip
                            label={todo.status}
                            size="small"
                            sx={{
                                fontWeight: 700,
                                bgcolor: todo.status === "Done" ? "rgba(34, 197, 94, 0.15)" : "rgba(245, 158, 11, 0.15)",
                                color: todo.status === "Done" ? "#4ade80" : "#fbbf24",
                            }}
                        />
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default TodoListPanel;
