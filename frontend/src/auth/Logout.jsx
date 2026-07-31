import React from 'react'
import { Navigate } from 'react-router';

function Logout() {
    const token = localStorage.getItem("token");
    if (token) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
    }
   return <Navigate to="/" replace />;
}

export default Logout