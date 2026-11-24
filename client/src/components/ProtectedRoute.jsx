import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('school_token');

    let user = null;

    try {
        user = JSON.parse(
            localStorage.getItem('school_user')
        );
    } catch {
        user = null;
    }

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
    ) {
        const routes = {
            student: '/student/dashboard',
            teacher: '/teacher/dashboard',
            parent: '/parent/dashboard',
            admin: '/admin/dashboard',
        };

        return (
            <Navigate
                to={routes[user.role] || '/login'}
                replace
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;