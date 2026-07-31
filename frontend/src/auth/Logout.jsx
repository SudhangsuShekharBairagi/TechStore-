import React from 'react'
import { Navigate } from 'react-router';

function Logout() {
    const token = localStorage.getItem("token");
    if (token) {
        localStorage.removeItem("token");
    }
   return <Navigate to="/" replace />;
}

export default Logout